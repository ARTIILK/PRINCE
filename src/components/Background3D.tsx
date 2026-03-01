import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function NodeNetwork() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial color="#3b82f6" wireframe opacity={0.4} transparent />
      </mesh>
      <Sphere args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color="#0f172a"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          distort={0.3}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <NodeNetwork />
      </Canvas>
    </div>
  );
}
