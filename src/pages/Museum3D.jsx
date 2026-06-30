import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { CameraControls, Grid, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { osData } from '../data/osData';
import ExhibitPedestal from '../components/3d/ExhibitPedestal';

// Component to handle camera animation
const CameraHandler = ({ activeExhibit }) => {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (controlsRef.current) {
      if (activeExhibit) {
        // Find the angle of the exhibit
        const index = osData.findIndex(o => o.id === activeExhibit.id);
        const radius = 12;
        const angle = (index / osData.length) * Math.PI * 2;
        
        // Target position (the pedestal's center)
        const targetX = Math.cos(angle) * radius;
        const targetZ = Math.sin(angle) * radius;
        const targetY = 2.2; // Hologram height
        
        // Camera position (a bit in front of the pedestal)
        const camDist = 4;
        const camX = Math.cos(angle) * (radius - camDist);
        const camZ = Math.sin(angle) * (radius - camDist);
        const camY = targetY;

        controlsRef.current.setLookAt(
          camX, camY, camZ,
          targetX, targetY, targetZ,
          true
        );
      } else {
        // Reset to center view
        controlsRef.current.setLookAt(0, 5, 0, 0, 2, -10, true);
      }
    }
  }, [activeExhibit]);

  return <CameraControls ref={controlsRef} makeDefault minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2 + 0.1} minDistance={2} maxDistance={20} />;
};

const Museum3D = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeExhibit, setActiveExhibit] = useState(null);

  const radius = 12; // Circle radius

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1000, background: '#000' }}>
      
      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: 32, left: 32, zIndex: 10 }}>
        <button 
          onClick={() => navigate('/museum')} 
          className="btn btn-ghost" 
          style={{ padding: '12px 20px', background: 'rgba(20,20,30,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <X size={18} style={{ marginRight: 8 }} /> {t('museum.exit_3d')}
        </button>
      </div>

      {activeExhibit && (
        <div style={{ 
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 10,
          background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)', border: `1px solid ${activeExhibit.color || '#4f46e5'}`,
          padding: 32, borderRadius: 24, width: '90%', maxWidth: 600, color: 'white',
          boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 20px ${activeExhibit.color}33`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ color: activeExhibit.color, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                {activeExhibit.releaseYear} • {activeExhibit.developer}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', margin: 0 }}>{activeExhibit.name}</h2>
            </div>
            <button onClick={() => setActiveExhibit(null)} className="btn btn-ghost" style={{ padding: 8 }}>
              <X size={20} />
            </button>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 24 }}>
            {activeExhibit.description}
          </p>
          <Link to={`/os/${activeExhibit.id}`} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {t('detail.overview')} <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </Link>
        </div>
      )}

      {/* 3D Scene */}
      <Canvas shadows camera={{ position: [0, 5, 0], fov: 60 }}>
        <color attach="background" args={['#050510']} />
        <fog attach="fog" args={['#050510', 10, 30]} />

        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
        />
        <pointLight position={[0, 10, 0]} intensity={2} color="#4f46e5" distance={30} />

        {/* Environment */}
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
        
        <Grid 
          position={[0, 0, 0]} 
          args={[60, 60]} 
          cellSize={1} 
          cellThickness={1} 
          cellColor="#1e1e38" 
          sectionSize={5} 
          sectionThickness={1.5} 
          sectionColor="#4f46e5" 
          fadeDistance={30} 
          fadeStrength={1} 
        />

        <CameraHandler activeExhibit={activeExhibit} />

        {/* Pedestals in a circle */}
        {osData.map((os, i) => {
          const angle = (i / osData.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          // Rotate to face the center
          const rotation = [0, -angle - Math.PI / 2, 0];
          
          return (
            <ExhibitPedestal 
              key={os.id} 
              os={os} 
              position={[x, 0, z]} 
              rotation={rotation}
              active={activeExhibit?.id === os.id}
              onClick={(clickedOS) => setActiveExhibit(clickedOS)}
            />
          );
        })}
      </Canvas>
    </div>
  );
};

export default Museum3D;
