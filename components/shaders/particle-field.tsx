"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particleVertexShader = `
  uniform float uTime;
  uniform float uSize;
  
  attribute float aScale;
  attribute vec3 aRandomness;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Add floating animation
    float floatOffset = sin(uTime * 0.5 + aRandomness.x * 10.0) * 0.3;
    modelPosition.y += floatOffset;
    
    // Add subtle horizontal drift
    modelPosition.x += sin(uTime * 0.3 + aRandomness.y * 8.0) * 0.1;
    modelPosition.z += cos(uTime * 0.4 + aRandomness.z * 6.0) * 0.1;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale * (1.0 / -viewPosition.z);
    
    // Color based on position
    float colorMix = (position.y + 5.0) / 10.0;
    vColor = mix(vec3(0.03, 0.57, 0.7), vec3(0.1, 0.2, 0.4), colorMix);
    
    // Alpha based on distance from center
    float distFromCenter = length(position.xz) / 10.0;
    vAlpha = 1.0 - distFromCenter * 0.5;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    // Create circular particle
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    if (distanceToCenter > 0.5) discard;
    
    // Soft edge
    float alpha = 1.0 - smoothstep(0.3, 0.5, distanceToCenter);
    alpha *= vAlpha;
    
    // Add glow effect
    vec3 color = vColor + vec3(0.1) * (1.0 - distanceToCenter);
    
    gl_FragColor = vec4(color, alpha * 0.6);
  }
`;

function Particles({ count = 2000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, scales, randomness } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribute particles in a wide area
      const radius = Math.random() * 15 + 5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 12;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius - 10;
      
      scales[i] = Math.random() * 0.5 + 0.5;
      
      randomness[i3] = Math.random();
      randomness[i3 + 1] = Math.random();
      randomness[i3 + 2] = Math.random();
    }
    
    return { positions, scales, randomness };
  }, [count]);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSize: { value: 30 },
  }), []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          args={[randomness, 3]}
        />
      </bufferGeometry>

      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>

  );
}

export function ParticleField() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles count={1500} />
      </Canvas>
    </div>
  );
}
