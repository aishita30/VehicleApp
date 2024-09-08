// components/Game.js
import { Canvas } from '@react-three/fiber';
import { RigidBody, Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import Vehicle from './Vehicle';
import FallingShapes from './FallingShapes';
import { useState, useEffect } from 'react';

export default function Game() {
  const [speed, setSpeed] = useState({ forward: false, backward: false });
  
  const handleKeyDown = (e) => {
    if (e.key === 'w') setSpeed((prev) => ({ ...prev, forward: true }));
    if (e.key === 's') setSpeed((prev) => ({ ...prev, backward: true }));
  };

  const handleKeyUp = (e) => {
    if (e.key === 'w') setSpeed((prev) => ({ ...prev, forward: false }));
    if (e.key === 's') setSpeed((prev) => ({ ...prev, backward: false }));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      
      <Vehicle speed={speed} />
      <FallingShapes />

      {/* Floor */}
      <RigidBody type="fixed">
        <mesh receiveShadow>
          <boxBufferGeometry args={[100, 1, 100]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </RigidBody>

      <OrbitControls />
    </>
  );
}
