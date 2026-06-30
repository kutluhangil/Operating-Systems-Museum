import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';

const ExhibitPedestal = ({ os, position, rotation, onClick, active }) => {
  const { t } = useTranslation();
  const group = useRef();
  const [hovered, setHovered] = useState(false);

  // Subtle pulsing glow based on hover or active state
  useFrame((state) => {
    if (group.current) {
      const targetScale = hovered || active ? 1.05 : 1;
      group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const baseColor = os.color || '#4f46e5';

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Pedestal Base */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1, 1, 32]} />
        <meshStandardMaterial 
          color="#1a1a24" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Glow Ring */}
      <mesh position={[0, 1.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.8, 32]} />
        <meshBasicMaterial color={baseColor} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Hologram / Card */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 2.2, 0]}>
        <group 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onClick(os);
          }}
          style={{ cursor: 'pointer' }}
        >
          {/* Glass Pane */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.5, 1.8, 0.1]} />
            <meshPhysicalMaterial 
              color="#050510"
              transmission={0.4} 
              opacity={1}
              metalness={0.5}
              roughness={0.2}
              ior={1.5}
              thickness={0.5}
              clearcoat={1}
            />
          </mesh>

          {/* Border Glow */}
          <mesh position={[0, 0, -0.06]}>
             <boxGeometry args={[2.55, 1.85, 0.02]} />
             <meshBasicMaterial color={baseColor} transparent opacity={hovered ? 0.8 : 0.3} />
          </mesh>

          {/* Icon using HTML for UI crispness */}
          <Html transform distanceFactor={1.5} position={[0, 0, 0.06]} style={{ pointerEvents: 'none' }}>
            <div style={{
              width: '320px', 
              height: '240px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              color: 'white',
              fontFamily: 'var(--font-display)',
              textAlign: 'center',
            }}>
              <div style={{ 
                width: 80, 
                height: 80, 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: 16, 
                padding: 12,
                marginBottom: 16,
                boxShadow: `0 0 30px ${baseColor}66`
              }}>
                {os.icon ? <img src={os.icon} alt={os.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : '💾'}
              </div>
              <h3 style={{ fontSize: '1.4rem', margin: '0 0 8px 0', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{os.name}</h3>
              <div style={{ fontSize: '0.9rem', color: baseColor, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {os.releaseYear}
              </div>
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
};

export default ExhibitPedestal;
