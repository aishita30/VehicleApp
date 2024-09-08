// components/FallingShapes.js
import { RigidBody } from '@react-three/rapier';
import { useState, useEffect } from 'react';

const randomShape = () => {
  const shapes = ['box', 'sphere', 'cone'];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

export default function FallingShapes() {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((shapes) => [
        ...shapes,
        {
          key: Date.now(),
          type: randomShape(),
          position: [Math.random() * 10 - 5, 10, Math.random() * 10 - 5],
          mass: Math.random() * 5 + 1,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return shapes.map(({ key, type, position, mass }) => (
    <RigidBody key={key} mass={mass} colliders={type}>
      <mesh position={position}>
        {type === 'box' && <boxBufferGeometry args={[1, 1, 1]} />}
        {type === 'sphere' && <sphereBufferGeometry args={[0.5, 16, 16]} />}
        {type === 'cone' && <coneBufferGeometry args={[0.5, 1, 16]} />}
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  ));
}
