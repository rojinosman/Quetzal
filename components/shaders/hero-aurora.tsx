"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  
  varying vec2 vUv;
  
  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }
  
  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.12;
    
    // Create multiple flowing aurora layers
    vec3 p1 = vec3(uv.x * 1.5, uv.y * 2.0, time * 0.4);
    float noise1 = fbm(p1);
    
    vec3 p2 = vec3(uv.x * 2.5 + 50.0, uv.y * 1.5, time * 0.6);
    float noise2 = fbm(p2);
    
    vec3 p3 = vec3(uv.x * 4.0 + 100.0, uv.y * 3.0, time * 0.8);
    float noise3 = fbm(p3);
    
    // Aurora wave patterns
    float wave1 = sin(uv.x * 3.0 + time + noise1 * 2.0) * 0.5 + 0.5;
    float wave2 = sin(uv.x * 5.0 - time * 0.7 + noise2 * 3.0) * 0.5 + 0.5;
    float wave3 = sin(uv.x * 2.0 + time * 1.2 + noise3 * 2.5) * 0.5 + 0.5;
    
    // Vertical aurora bands
    float band1 = smoothstep(0.3, 0.7, uv.y + wave1 * 0.3 + noise1 * 0.2);
    float band2 = smoothstep(0.2, 0.8, uv.y + wave2 * 0.25 + noise2 * 0.15);
    float band3 = smoothstep(0.4, 0.9, uv.y + wave3 * 0.2 + noise3 * 0.1);
    
    // Color cycling - smooth transitions between colors
    float colorCycle = time * 0.3;
    float colorPhase1 = sin(colorCycle) * 0.5 + 0.5;
    float colorPhase2 = sin(colorCycle + 2.094) * 0.5 + 0.5;
    float colorPhase3 = sin(colorCycle + 4.189) * 0.5 + 0.5;
    
    // Mix aurora colors with cycling
    vec3 auroraColor1 = mix(uColor2, uColor3, colorPhase1);
    vec3 auroraColor2 = mix(uColor3, uColor4, colorPhase2);
    vec3 auroraColor3 = mix(uColor4, uColor2, colorPhase3);
    
    // Combine aurora layers
    vec3 aurora = vec3(0.0);
    aurora += auroraColor1 * band1 * wave1 * 0.6;
    aurora += auroraColor2 * band2 * wave2 * 0.5;
    aurora += auroraColor3 * band3 * wave3 * 0.4;
    
    // Add shimmer effect
    float shimmer = snoise(vec3(uv * 15.0, time * 3.0)) * 0.05;
    aurora += shimmer * auroraColor1;
    
    // Base dark background with subtle gradient
    vec3 background = mix(uColor1 * 0.8, uColor1, uv.y);
    
    // Add subtle horizontal glow
    float horizontalGlow = exp(-pow((uv.y - 0.5) * 2.0, 2.0) * 2.0);
    background += auroraColor1 * horizontalGlow * 0.1;
    
    // Combine background and aurora
    vec3 finalColor = background + aurora * 0.8;
    
    // Add vignette
    float vignette = 1.0 - length((uv - 0.5) * 1.2) * 0.4;
    finalColor *= vignette;
    
    // Subtle grain for texture
    float grain = snoise(vec3(uv * 500.0, time * 10.0)) * 0.015;
    finalColor += grain;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function HeroAuroraMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#080810") }, // Deep dark
      uColor2: { value: new THREE.Color("#0891b2") }, // Cyan primary
      uColor3: { value: new THREE.Color("#06b6d4") }, // Brighter cyan
      uColor4: { value: new THREE.Color("#0ea5e9") }, // Sky blue
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[16, 9, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function HeroAurora() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true }}>
        <HeroAuroraMesh />
      </Canvas>
    </div>
  );
}
