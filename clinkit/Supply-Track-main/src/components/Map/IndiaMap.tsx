import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function IndiaMap() {
  const mapRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/scene.gltf');

  // Clone the scene to avoid mutations
  const model = scene.clone();

  return (
    <primitive 
      ref={mapRef}
      object={model}
      scale={[1, 1, 1]} // Adjust scale as needed
      position={[0, 0, 0]} // Adjust position as needed
      rotation={[-Math.PI / 100, 0, 0]} // Adjust rotation as needed
    />
  );
}

// Pre-load the model
useGLTF.preload('/scene.gltf');