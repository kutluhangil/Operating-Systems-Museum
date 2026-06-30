import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, SkipBack, SkipForward, Volume2, Info } from 'lucide-react';
import './SoundGallery.css';

const SOUNDS = [
  { id: 'win95', name: 'Windows 95 Startup', os: 'Windows 95', year: 1995, duration: '0:06', src: '/sounds/win95.mp3', color: '#008080' },
  { id: 'macos9', name: 'Mac OS 9 Startup', os: 'Mac OS 9', year: 1999, duration: '0:04', src: '/sounds/macos9.mp3', color: '#555555' },
  { id: 'winxp', name: 'Windows XP Startup', os: 'Windows XP', year: 2001, duration: '0:04', src: '/sounds/xp.mp3', color: '#2b78cc' },
  { id: 'ubuntu', name: 'Ubuntu Login', os: 'Ubuntu', year: 2004, duration: '0:05', src: '/sounds/ubuntu.mp3', color: '#e95420' },
  { id: 'vista', name: 'Windows Vista Startup', os: 'Windows Vista', year: 2007, duration: '0:04', src: '/sounds/vista.mp3', color: '#1a4a80' },
];

const SoundGallery = () => {
  const { t } = useTranslation();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const track = SOUNDS[currentTrack];

  useEffect(() => {
    // We are simulating play because we don't have actual mp3 files.
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 2; // Simulate time passing
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const playTrack = (index) => {
    setCurrentTrack(index);
    setProgress(0);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % SOUNDS.length);
    setProgress(0);
    if (isPlaying) setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev === 0 ? SOUNDS.length - 1 : prev - 1));
    setProgress(0);
    if (isPlaying) setIsPlaying(true);
  };

  return (
    <div className="sound-gallery-page container">
      <div className="sound-gallery-header">
        <h1>Iconic Sound Gallery</h1>
        <p>A curated collection of the most memorable startup and shutdown sounds in OS history.</p>
      </div>

      <div className="sound-gallery-content">
        {/* Player Section */}
        <div className="player-section">
          <div className="player-card" style={{ '--track-color': track.color }}>
            <div className="player-visualizer">
              {Array.from({ length: 32 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`bar ${isPlaying ? 'playing' : ''}`}
                  style={{ 
                    animationDelay: `${Math.random() * 0.5}s`,
                    height: isPlaying ? `${20 + Math.random() * 80}%` : '10%'
                  }}
                />
              ))}
            </div>
            
            <div className="player-info">
              <h2>{track.name}</h2>
              <div className="player-meta">
                <span>{track.os}</span>
                <span className="dot">•</span>
                <span>{track.year}</span>
              </div>
            </div>

            <div className="player-progress">
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="progress-time">
                <span>0:0{(progress * 0.06).toFixed(0)}</span>
                <span>{track.duration}</span>
              </div>
            </div>

            <div className="player-controls">
              <button className="control-btn" onClick={prevTrack}><SkipBack size={24} /></button>
              <button className="control-btn play-btn" onClick={togglePlay}>
                {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: 4 }} />}
              </button>
              <button className="control-btn" onClick={nextTrack}><SkipForward size={24} /></button>
            </div>
          </div>
          
          <div className="mock-note">
            <Info size={14} />
            Note: Audio files are simulated. Place actual .mp3 files in the /public/sounds directory to enable real playback.
          </div>
        </div>

        {/* Tracklist Section */}
        <div className="tracklist-section">
          <h3 className="tracklist-title">All Sounds</h3>
          <div className="tracklist">
            {SOUNDS.map((s, idx) => (
              <div 
                key={s.id} 
                className={`track-item ${idx === currentTrack ? 'active' : ''}`}
                onClick={() => playTrack(idx)}
              >
                <div className="track-number">{idx + 1}</div>
                <div className="track-details">
                  <div className="track-name">{s.name}</div>
                  <div className="track-os">{s.os} ({s.year})</div>
                </div>
                {idx === currentTrack && isPlaying ? (
                  <div className="track-playing-icon">
                    <div className="mini-bar"></div>
                    <div className="mini-bar"></div>
                    <div className="mini-bar"></div>
                  </div>
                ) : (
                  <div className="track-duration">{s.duration}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundGallery;
