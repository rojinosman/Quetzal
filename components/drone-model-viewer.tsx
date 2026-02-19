"use client";

import { Suspense, useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Environment,
  ContactShadows,
  Float,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Move3D } from "lucide-react";

const MODEL_URL = "/models/drone.glb";

// Preload the default model (helps avoid a visible pop-in).
useGLTF.preload(MODEL_URL);

interface ComponentInfo {
  name: string;
  description: string;
  position: [number, number, number];
  color: string;
}

// Position as fraction of bounding box: [0,0,0]=min, [1,1,1]=max. Applied after model is loaded.
const droneComponentTemplates: Omit<ComponentInfo, "position">[] = [
  {
    name: "Flight Controller",
    description: "The brain of the drone. Processes sensor data and controls motor speeds for stable flight. Pixhawk unit.",
    color: "#0891b2",
  },
  {
    name: "Brushless Motors",
    description: "4x T-Motor U5 KV400 motors providing thrust for optimal power-to-weight ratio.",
    color: "#14b8a6",
  },
  {
    name: "Carbon Fiber Frame",
    description: "Lightweight yet extremely rigid frame. 0.75\" OD arms for agility and durability.",
    color: "#f30505ff",
  },
  {
    name: "LiPo Battery",
    description: "6S LiPo battery pack providing 22.2V nominal voltage for extended flight time.",
    color: "#f59e0b",
  },
  {
    name: "FPV Camera",
    description: "Low-latency camera with wide angle lens for immersive first-person view flying.",
    color: "#ef4444",
  },
  {
    name: "MH60 Airfoil",
    description: "Fixed-wing structures extending from the body for added lift and stability in hybrid flight.",
    color: "#94a3b8",
  },
  {
    name: "Landing Gears",
    description: "Triangular supports under the airfoils for stable ground contact and takeoff.",
    color: "#22c55e",
  },
];

// Position fractions: 0.5=center, 1=max. Based on drone model layout (fx, fy, fz).
const componentBoundsFractions: [number, number, number][] = [
  [0.55, 0.18, 0.55],  // Flight Controller - underneath center, toward front
  [0.88, 0.52, 0.88],  // Brushless Motors - front-right arm end (one motor)
  [0.5, 0.42, 0.5],    // Carbon Fiber Frame - center of cross frame
  [0.5, 0.12, 0.38],   // LiPo Battery - underneath, behind flight controller
  [0.5, 0.68, 0.92],   // FPV Camera - front top (nose area)
  [0.7, 0.35, 0.5],    // MH60 Airfoil - wing on right side
  [0.75, 0.15, 0.5],   // Landing Gears - under airfoil
];

function ComponentMarker({ 
  component, 
  isActive, 
  onClick 
}: { 
  component: ComponentInfo; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <group position={component.position}>
      {/* Invisible clickable hit zone - no visible particles, tag appears on click */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

// Loads a user-supplied CAD export (GLB/GLTF) from /public.
// Drop your file in:  public/models/drone.glb  (or update MODEL_URL)
function DroneCADModel({
  url = MODEL_URL,
  activeComponent,
  setActiveComponent,
  onBoundsComputed,
}: {
  url?: string;
  activeComponent: number | null;
  setActiveComponent: (index: number | null) => void;
  onBoundsComputed?: (data: { positions: [number, number, number][]; scale: number }) => void;
}) {
  const gltf = useGLTF(url) as unknown as { scene: THREE.Object3D };

  const model = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const [scale, setScale] = useState(1);
  const [positions, setPositions] = useState<[number, number, number][] | null>(null);

  useEffect(() => {
    model.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const modelScale = Number.isFinite(maxDim) && maxDim > 0 ? 1 / maxDim : 1;
    setScale(modelScale);

    // Each marker uses its own fraction - changing one only affects that marker
    const computed: [number, number, number][] = componentBoundsFractions.map(([fx, fy, fz]) => [
      (fx - 0.5) * maxDim,
      (fy - 0.5) * maxDim,
      (fz - 0.5) * maxDim,
    ]);
    setPositions(computed);
    onBoundsComputed?.({ positions: computed, scale: modelScale });
  }, [model, onBoundsComputed, componentBoundsFractions]);

  return (
    <group scale={scale}>
      <primitive object={model} />
      {positions &&
        droneComponentTemplates.map((template, index) => (
          <ComponentMarker
            key={template.name}
            component={{ ...template, position: positions[index] ?? [0, 0, 0] }}
            isActive={activeComponent === index}
            onClick={() => setActiveComponent(activeComponent === index ? null : index)}
          />
        ))}
    </group>
  );
}

// Procedural drone geometry - no external files needed
function ProceduralDrone() {
  const armPositions: [number, number, number][] = [
    [0.5, 0, 0.5],
    [-0.5, 0, 0.5],
    [0.5, 0, -0.5],
    [-0.5, 0, -0.5],
  ];

  return (
    <group>
      {/* Central body */}
      <mesh position={[0.1, 0.0, 0]}>
        <boxGeometry args={[0.3, 0.08, 0.3]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Flight controller on top */}
      <mesh position={[0.0, 0.0, 0]}>
        <boxGeometry args={[0.15, 0.03, 0.15]} />
        <meshStandardMaterial color="#0891b2" metalness={0.6} roughness={0.3} emissive="#0891b2" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Battery underneath */}
      <mesh position={[0.0, 0.09, 0.0]}>
        <boxGeometry args={[0.2, 0.06, 0.08]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.3} roughness={0.5} />
      </mesh>
      
      {/* FPV Camera */}
      <group position={[0, 0.1, 0.18]}>
        <mesh>
          <boxGeometry args={[0.06, 0.06, 0.04]} />
          <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh
            position={[0, 0, 0.03]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.02, 16]} />
            <meshStandardMaterial
              color="#ef4444"
              metalness={0.8}
              roughness={0.2}
              emissive="#ef4444"
              emissiveIntensity={0.3}
            />
          </mesh>

      </group>
      
      {/* Arms and motors */}
      {armPositions.map((pos, i) => (
        <group key={i}>
          {/* Arm */}
          <mesh position={[pos[0] / 2, 0.02, pos[2] / 2]} rotation={[0, Math.atan2(pos[0], pos[2]), 0]}>
            <boxGeometry args={[0.04, 0.02, 0.7]} />
            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
          </mesh>
          
          {/* Motor mount */}
          <mesh position={pos}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Motor */}
          <mesh position={[pos[0], pos[1] + 0.04, pos[2]]}>
            <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
            <meshStandardMaterial color="#14b8a6" metalness={0.9} roughness={0.1} emissive="#14b8a6" emissiveIntensity={0.2} />
          </mesh>
          
          {/* Propeller hub */}
          <mesh position={[pos[0], pos[1] + 0.07, pos[2]]}>
            <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.5} />
          </mesh>
          
          {/* Propeller blades */}
          <group position={[pos[0], pos[1] + 0.08, pos[2]]}>
            <mesh rotation={[0, 0, 0]}>
              <boxGeometry args={[0.25, 0.005, 0.02]} />
              <meshStandardMaterial color="#94a3b8" transparent opacity={0.7} metalness={0.3} roughness={0.6} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[0.25, 0.005, 0.02]} />
              <meshStandardMaterial color="#94a3b8" transparent opacity={0.7} metalness={0.3} roughness={0.6} />
            </mesh>
          </group>
          
          {/* Landing leg */}
          <mesh position={[pos[0], -0.1, pos[2]]}>
            <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={[pos[0], -0.17, pos[2]]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Set to false to re-enable drone rotation and float animation
const DRONE_STATIC_MODE = true;

// Set to false to hide axis helper when done placing markers
const AXES_VISIBLE = false;

function DroneModel({
  activeComponent,
  setActiveComponent,
  onBoundsComputed,
}: {
  activeComponent: number | null;
  setActiveComponent: (index: number | null) => void;
  onBoundsComputed?: (data: { positions: [number, number, number][]; scale: number }) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!DRONE_STATIC_MODE && groupRef.current && activeComponent === null) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={DRONE_STATIC_MODE ? 0 : 2} rotationIntensity={DRONE_STATIC_MODE ? 0 : 0.05} floatIntensity={DRONE_STATIC_MODE ? 0 : 0.2}>
      <group ref={groupRef} scale={2}>
        {AXES_VISIBLE && (
          <group position={[0, 0, 0]}>
            <axesHelper args={[0.4]} />
            <Html position={[0.45, 0, 0]} style={{ color: "#ef4444", fontSize: "12px", fontWeight: "bold", pointerEvents: "none" }}>+X</Html>
            <Html position={[0, 0.45, 0]} style={{ color: "#22c55e", fontSize: "12px", fontWeight: "bold", pointerEvents: "none" }}>+Y</Html>
            <Html position={[0, 0, 0.45]} style={{ color: "#3b82f6", fontSize: "12px", fontWeight: "bold", pointerEvents: "none" }}>+Z</Html>
          </group>
        )}
        <DroneCADModel
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          onBoundsComputed={onBoundsComputed}
        />
      </group>
    </Float>
  );
}

function CameraController() {
  return (
    <OrbitControls
      enablePan={false}
      minDistance={0.5}
      maxDistance={4}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
    />
  );
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading 3D Model...</p>
      </div>
    </Html>
  );
}

export function DroneModelViewer() {
  const [activeComponent, setActiveComponent] = useState<number | null>(null);
  const [boundsData, setBoundsData] = useState<{
    positions: [number, number, number][];
    scale: number;
  } | null>(null);
  
  const handlePrevComponent = () => {
    if (activeComponent === null) {
      setActiveComponent(droneComponentTemplates.length - 1);
    } else {
      setActiveComponent((activeComponent - 1 + droneComponentTemplates.length) % droneComponentTemplates.length);
    }
  };
  
  const handleNextComponent = () => {
    if (activeComponent === null) {
      setActiveComponent(0);
    } else {
      setActiveComponent((activeComponent + 1) % droneComponentTemplates.length);
    }
  };
  
  const handleReset = () => {
    setActiveComponent(null);
  };
  
  return (
    <div className="flex w-full h-[600px] max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm">
      {/* Drone canvas */}
      <div className="relative flex-1 min-w-0">
      <Canvas
        camera={{ position: [1.8, 1.2, 2.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0891b2" />
          <pointLight position={[5, 5, -5]} intensity={0.2} color="#14b8a6" />
          
          <DroneModel
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
            onBoundsComputed={setBoundsData}
          />
          
          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
          
          <Environment preset="city" />
          <CameraController />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Interactive 3D Model
          </h3>
          <p className="text-sm text-muted-foreground">
            Select a component or drag to rotate
          </p>
        </div>
        
        <div className="flex items-center gap-1 pointer-events-auto">
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-border">
            <Move3D className="size-3" />
            <span>Drag to rotate</span>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-auto">
        <Button variant="outline" size="icon" onClick={handlePrevComponent} className="bg-background/80 backdrop-blur-sm">
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNextComponent} className="bg-background/80 backdrop-blur-sm">
          <ChevronRight className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleReset} className="bg-background/80 backdrop-blur-sm">
          <RotateCcw className="size-4" />
        </Button>
      </div>
      </div>

      {/* Scrollable component panel */}
      <div className="w-64 border-l border-border bg-background/50 flex flex-col shrink-0">
        <h3 className="px-4 py-3 text-sm font-semibold text-foreground border-b border-border">
          Components
        </h3>
        <div className="flex-1 overflow-y-auto p-2">
          {droneComponentTemplates.map((component, index) => (
            <button
              key={component.name}
              onClick={() => setActiveComponent(activeComponent === index ? null : index)}
              className={`w-full text-left px-3 py-3 rounded-lg mb-1 transition-colors ${
                activeComponent === index
                  ? "bg-primary/15 border border-primary/50"
                  : "hover:bg-muted/50 border border-transparent"
              }`}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0 inline-block mr-2 align-middle"
                style={{ backgroundColor: component.color }}
              />
              <span className="text-sm font-medium">{component.name}</span>
              {activeComponent === index && (
                <p className="text-xs text-muted-foreground mt-1.5 ml-4 leading-snug">
                  {component.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
