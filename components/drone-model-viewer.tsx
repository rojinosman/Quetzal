"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Environment,
  ContactShadows,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, Move3D } from "lucide-react";

interface ComponentInfo {
  name: string;
  description: string;
  position: [number, number, number];
  color: string;
}

const droneComponents: ComponentInfo[] = [
  {
    name: "Flight Controller",
    description: "The brain of the drone. Processes sensor data and controls motor speeds for stable flight.",
    position: [0, 0.15, 0],
    color: "#0891b2",
  },
  {
    name: "Brushless Motors",
    description: "High-efficiency motors providing thrust. 2300KV rating for optimal power-to-weight ratio.",
    position: [0.7, 0.1, 0.7],
    color: "#14b8a6",
  },
  {
    name: "Carbon Fiber Frame",
    description: "Lightweight yet extremely rigid frame. 5-inch arm span for agility and durability.",
    position: [0, 0, 0],
    color: "#64748b",
  },
  {
    name: "ESC Array",
    description: "Electronic Speed Controllers regulate power to each motor with 32-bit processing.",
    position: [-0.5, 0.05, 0.5],
    color: "#8b5cf6",
  },
  {
    name: "LiPo Battery",
    description: "4S 1500mAh battery pack providing 14.8V nominal voltage for 6-8 minutes flight time.",
    position: [0, -0.1, 0],
    color: "#f59e0b",
  },
  {
    name: "FPV Camera",
    description: "Low-latency camera with 150° wide angle lens for immersive first-person view flying.",
    position: [0, 0.2, 0.4],
    color: "#ef4444",
  },
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
  const markerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (markerRef.current) {
      markerRef.current.scale.setScalar(
        isActive ? 1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1 : 0.8
      );
    }
  });
  
  return (
    <group position={component.position}>
      <mesh ref={markerRef} onClick={onClick}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={component.color}
          emissive={component.color}
          emissiveIntensity={isActive ? 0.8 : 0.3}
          transparent
          opacity={isActive ? 1 : 0.7}
        />
      </mesh>
      {isActive && (
        <Html distanceFactor={5} position={[0, 0.25, 0]}>
          <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-3 w-56 shadow-xl">
            <Badge 
              className="mb-2" 
              style={{ backgroundColor: component.color, color: "#fff" }}
            >
              {component.name}
            </Badge>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {component.description}
            </p>
          </div>
        </Html>
      )}
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
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.3, 0.08, 0.3]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Flight controller on top */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.15, 0.03, 0.15]} />
        <meshStandardMaterial color="#0891b2" metalness={0.6} roughness={0.3} emissive="#0891b2" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Battery underneath */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.2, 0.06, 0.08]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.3} roughness={0.5} />
      </mesh>
      
      {/* FPV Camera */}
      <group position={[0, 0.1, 0.18]}>
        <mesh>
          <boxGeometry args={[0.06, 0.06, 0.04]} />
          <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <cylinderGeometry args={[0.02, 0.02, 0.02, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.2} emissive="#ef4444" emissiveIntensity={0.3} />
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

function DroneModel({ 
  activeComponent, 
  setActiveComponent 
}: { 
  activeComponent: number | null;
  setActiveComponent: (index: number | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && activeComponent === null) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={groupRef} scale={2}>
        <ProceduralDrone />
        
        {/* Component markers */}
        {droneComponents.map((component, index) => (
          <ComponentMarker
            key={component.name}
            component={component}
            isActive={activeComponent === index}
            onClick={() => setActiveComponent(activeComponent === index ? null : index)}
          />
        ))}
      </group>
    </Float>
  );
}

function CameraController({ activeComponent }: { activeComponent: number | null }) {
  const controlsRef = useRef<any>(null);
  
  useEffect(() => {
    if (activeComponent !== null && controlsRef.current) {
      const target = droneComponents[activeComponent].position;
      controlsRef.current.target.set(target[0] * 2, target[1] * 2, target[2] * 2);
    } else if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
    }
  }, [activeComponent]);
  
  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={2}
      maxDistance={8}
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
  
  const handlePrevComponent = () => {
    if (activeComponent === null) {
      setActiveComponent(droneComponents.length - 1);
    } else {
      setActiveComponent((activeComponent - 1 + droneComponents.length) % droneComponents.length);
    }
  };
  
  const handleNextComponent = () => {
    if (activeComponent === null) {
      setActiveComponent(0);
    } else {
      setActiveComponent((activeComponent + 1) % droneComponents.length);
    }
  };
  
  const handleReset = () => {
    setActiveComponent(null);
  };
  
  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm">
      <Canvas
        camera={{ position: [3, 2, 4], fov: 45 }}
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
          />
          
          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
          
          <Environment preset="city" />
          <CameraController activeComponent={activeComponent} />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Interactive 3D Model
          </h3>
          <p className="text-sm text-muted-foreground">
            Click markers or use controls to explore components
          </p>
        </div>
        
        <div className="flex items-center gap-1 pointer-events-auto">
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-border">
            <Move3D className="size-3" />
            <span>Drag to rotate</span>
          </div>
        </div>
      </div>
      
      {/* Component Navigation */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevComponent}
            className="bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextComponent}
            className="bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="bg-background/80 backdrop-blur-sm"
          >
            <RotateCcw className="size-4" />
          </Button>
        </div>
        
        {/* Component List */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-[60%] pb-1">
          {droneComponents.map((component, index) => (
            <button
              key={component.name}
              onClick={() => setActiveComponent(activeComponent === index ? null : index)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                activeComponent === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {component.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
