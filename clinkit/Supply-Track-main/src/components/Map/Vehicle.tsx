import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { VehicleData } from '../../types/Vehicle';
import { useMapStore } from '../../store/useMapStore';

interface VehicleProps {
  data: VehicleData;
}

export function Vehicle({ data }: VehicleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const setSelectedVehicle = useMapStore((state) => state.setSelectedVehicle);
  const time = useRef(0);

  // Get color based on material type
  const getVehicleColor = (material: string) => {
    switch (material) {
      case 'Electronics':
        return '#3498db'; // Blue
      case 'Perishables':
        return '#e74c3c'; // Red
      case 'Medicine':
        return '#2ecc71'; // Green
      default:
        return '#2C5F2D'; // Default green
    }
  };

  const vehicleColor = getVehicleColor(data.material);
  const darkerShade = new THREE.Color(vehicleColor).multiplyScalar(0.8).getStyle();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.5, -2.3),
      new THREE.Vector3(3.5, 0.5, -1),
      new THREE.Vector3(3, 0.5, 0.01),
      new THREE.Vector3(2, 0.5, 1),
      new THREE.Vector3(1, 0.5, 2),
      new THREE.Vector3(0.4, 0.5, 3),
      new THREE.Vector3(-5, 0.5, 3),
      new THREE.Vector3(-5, 0.5, 0),
      new THREE.Vector3(-5, 0.5, -4),
    ], true);
  }, []);

  const pathPoints = useMemo(() => {
    return curve.getPoints(100);
  }, [curve]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      time.current = (time.current + delta * 0.03) % 1;
      const position = curve.getPointAt(time.current);
      const tangent = curve.getTangentAt(time.current).normalize();
      groupRef.current.position.copy(position);
      const angle = Math.atan2(tangent.x, tangent.z);
      groupRef.current.rotation.y = angle;
    }
  });

  return (
    <>
      <Line
        points={pathPoints}
        color={vehicleColor}
        lineWidth={2}
        dashed={true}
        dashScale={50}
        dashSize={0.5}
        gapSize={0.25}
      />

      <group
        ref={groupRef}
        onClick={() => setSelectedVehicle(data)}
        scale={[0.2, 0.2, 0.2]}
      >
        {/* Cabin with material-based color */}
        <mesh position={[0, 1, 1.5]} castShadow>
          <boxGeometry args={[2, 1.4, 1.2]} />
          <meshStandardMaterial color={vehicleColor} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Chrome trim around cabin */}
        <mesh position={[0, 0.4, 1.5]}>
          <boxGeometry args={[2.1, 0.1, 1.3]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Windshield */}
        <mesh position={[0, 1.4, 1.1]} rotation={[Math.PI * 0.1, 0, 0]}>
          <boxGeometry args={[1.8, 0.8, 0.1]} />
          <meshPhysicalMaterial 
            color="#97BFB4"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Cargo Container with material-based color */}
        <mesh position={[0, 1.3, -0.8]} castShadow>
          <boxGeometry args={[2.2, 2, 4]} />
          <meshStandardMaterial color={darkerShade} metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Logo Panel (both sides) */}
        <mesh position={[1.11, 1.3, -0.8]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[3.5, 1.5]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.2} roughness={0.8} />
        </mesh>
        <mesh position={[-1.11, 1.3, -0.8]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[3.5, 1.5]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.2} roughness={0.8} />
        </mesh>

        {/* Enhanced Wheels */}
        <EnhancedWheel position={[-1.1, 0.3, 1.5]} />
        <EnhancedWheel position={[1.1, 0.3, 1.5]} />
        <EnhancedWheel position={[-1.1, 0.3, -0.8]} />
        <EnhancedWheel position={[1.1, 0.3, -0.8]} />
        <EnhancedWheel position={[-1.1, 0.3, -2]} />
        <EnhancedWheel position={[1.1, 0.3, -2]} />

        {/* Headlights */}
        <HeadLight position={[-0.8, 0.5, 2.1]} />
        <HeadLight position={[0.8, 0.5, 2.1]} />

        {/* Chrome Grill */}
        <mesh position={[0, 0.5, 2]}>
          <boxGeometry args={[1.8, 0.6, 0.1]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Roof Spoiler with material-based color */}
        <mesh position={[0, 2.4, 1.5]} rotation={[Math.PI * 0.1, 0, 0]}>
          <boxGeometry args={[1.8, 0.1, 0.4]} />
          <meshStandardMaterial color={vehicleColor} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Side Steps */}
        <mesh position={[-1.1, 0.2, 1.5]}>
          <boxGeometry args={[0.2, 0.1, 1.2]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[1.1, 0.2, 1.5]}>
          <boxGeometry args={[0.2, 0.1, 1.2]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </>
  );
}

// Enhanced Wheel component with chrome rims
function EnhancedWheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tire */}
      <mesh rotation={[Math.PI / 2, 0, 8]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial 
          color="#1B1B1B" 
          metalness={0.1} 
          roughness={0.8}
        />
      </mesh>
      {/* Chrome Rim */}
      <mesh rotation={[Math.PI / 2, 0, 8]}>
        <cylinderGeometry args={[0.25, 0.25, 0.31, 16]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Hub Cap */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.16]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
    </group>
  );
}

// Headlight component
function HeadLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700" 
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Chrome rim around headlight */}
      <mesh position={[0, 0, 0.01]}>
        <torusGeometry args={[0.15, 0.02, 16, 32]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}