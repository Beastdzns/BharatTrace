// src/components/GLBViewer.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const GLBViewer = () => {
  const glb = useGLTF("/model.glb"); // Change the path if needed

  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 50 }}
      style={{ width: "100%", height: "500px" }} // Adjust size as needed
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} />
      <primitive object={glb.scene} scale={1.5} />
      <OrbitControls />
    </Canvas>
  );
};

export default GLBViewer;
