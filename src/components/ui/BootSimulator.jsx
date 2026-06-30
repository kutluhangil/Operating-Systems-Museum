import React, { useState, useEffect } from 'react';
import './BootSimulator.css';
import { soundManager } from '../../utils/SoundManager';

const BootSimulator = ({ os, onClose }) => {
  const [step, setStep] = useState(0);

  // Determine boot style
  const isLegacy = 
    os.id.includes('dos') || 
    os.id.includes('windows-1') || 
    os.id.includes('windows-9') ||
    os.id === 'reactos' ||
    os.id === 'freedos';

  useEffect(() => {
    let timeouts = [];

    const runBootSequence = async () => {
      // Step 0: Blank screen (power on)
      setStep(0);
      
      timeouts.push(setTimeout(() => {
        // Step 1: POST / BIOS
        setStep(1);
        soundManager.playBeep(800, 'square', 0.1, 0.1);
      }, 500));

      timeouts.push(setTimeout(() => {
        // Step 2: OS Loading
        setStep(2);
        
        // Disk sounds
        const playDisk = () => soundManager.playHDDClick();
        playDisk();
        setTimeout(playDisk, 300);
        setTimeout(playDisk, 500);
        setTimeout(playDisk, 800);
        setTimeout(playDisk, 1200);
        setTimeout(playDisk, 1500);
        setTimeout(playDisk, 1800);

      }, 2500));

      timeouts.push(setTimeout(() => {
        // Step 3: Finished, close
        onClose();
      }, 5000));
    };

    runBootSequence();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onClose]);

  if (step === 0) {
    return <div className="boot-overlay boot-blank"></div>;
  }

  return (
    <div className="boot-overlay">
      {isLegacy ? (
        <div className="boot-bios">
          {step >= 1 && (
            <div className="post-text">
              <p>Phoenix BIOS 4.0 Release 6.0</p>
              <p>Copyright 1985-1995 Phoenix Technologies Ltd.</p>
              <p>All Rights Reserved</p>
              <br/>
              <p>CPU = Intel Pentium</p>
              <p>640K System RAM Passed</p>
              <p>15360K Extended RAM Passed</p>
              <br/>
            </div>
          )}
          {step >= 2 && (
            <div className="os-text">
              <p>Starting {os.name}...</p>
              <p>Loading system drivers...</p>
              <p className="typing">C:\&gt;<span className="cursor">_</span></p>
            </div>
          )}
        </div>
      ) : (
        <div className="boot-modern">
          {step >= 1 && (
            <div className="boot-logo-container">
              <img src={os.icon} alt={os.name} className="boot-logo" />
            </div>
          )}
          {step >= 2 && (
            <div className="boot-spinner">
              <div className="spinner-bar"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BootSimulator;
