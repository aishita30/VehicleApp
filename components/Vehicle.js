// components/Vehicle.js
import { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

export default function Vehicle({ speed }) {
  const vehicle = useRef();

  // Handle movement with W and S keys
  useFrame((state) => {
    const { forward, backward } = speed.current;
    const direction = state.mouse;
    
    const force = forward ? 10 : backward ? -10 : 0;
    vehicle.current.applyImpulse([force * direction.x, 0, force * direction.y]);
  });

  return (
    <group ref={vehicle}>
      <RigidBody colliders="hull">
        {/* Vehicle body */}
        <mesh position={[0, 0.5, 0]}>
          <boxBufferGeometry args={[2, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>

        {/* Front wheel (sphere) */}
        <mesh position={[0, -0.5, 1]}>
          <sphereBufferGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Back wheels (cylinders) */}
        <mesh position={[-0.8, -0.5, -1]}>
          <cylinderBufferGeometry args={[0.2, 0.2, 0.5, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0.8, -0.5, -1]}>
          <cylinderBufferGeometry args={[0.2, 0.2, 0.5, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </RigidBody>
    </group>
  );
}
