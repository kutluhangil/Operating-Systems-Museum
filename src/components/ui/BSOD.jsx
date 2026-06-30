import React, { useEffect } from 'react';
import './BSOD.css';
import { soundManager } from '../../utils/SoundManager';

const BSOD = ({ onClose }) => {
  useEffect(() => {
    // Play a harsh beep when BSOD appears
    soundManager.playBeep(400, 'sawtooth', 0.5, 0.5);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="bsod-overlay" onClick={onClose}>
      <div className="bsod-content">
        <div className="bsod-bg">Windows</div>
        <p className="bsod-text">
          A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +<br />
          00010E36. The current application will be terminated.
        </p>
        <br />
        <p className="bsod-text">
          *  Press any key to terminate the current application.<br />
          *  Press CTRL+ALT+DEL again to restart your computer. You will<br />
             lose any unsaved information in all applications.
        </p>
        <br />
        <p className="bsod-center">
          Press any key or click to continue <span className="blink">_</span>
        </p>
      </div>
    </div>
  );
};

export default BSOD;
