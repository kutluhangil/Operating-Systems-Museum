import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './CompareSlider.css';

const CompareSlider = ({ osA, osB }) => {
  const { t } = useTranslation();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  if (!osA || !osB) return null;

  return (
    <div className="compare-slider-wrapper">
      <div 
        className="compare-slider-container"
        ref={containerRef}
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
      >
        {/* Underlay: OS B */}
        <div className="compare-image-panel os-b" style={{ background: osB.color || 'var(--surf-2)' }}>
          <div className="compare-content">
            <img src={osB.icon} alt={osB.name} className="compare-icon blur-bg" />
            <div className="compare-title">
              <h3>{osB.name}</h3>
              <span>{osB.releaseYear}</span>
            </div>
          </div>
        </div>

        {/* Overlay: OS A */}
        <div 
          className="compare-image-panel os-a" 
          style={{ 
            background: osA.color || 'var(--surf-3)',
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
          }}
        >
          <div className="compare-content">
            <img src={osA.icon} alt={osA.name} className="compare-icon blur-bg" />
            <div className="compare-title">
              <h3>{osA.name}</h3>
              <span>{osA.releaseYear}</span>
            </div>
          </div>
        </div>

        {/* Dragger */}
        <div 
          className="compare-dragger"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="compare-dragger-line" />
          <div className="compare-dragger-handle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
              <path d="M9 18l6-6-6-6" style={{ transform: 'translateX(6px)', opacity: 0.5 }}/>
            </svg>
          </div>
        </div>
      </div>
      <div className="compare-slider-hint">
        {t('compare.drag_hint', 'Drag to compare visual evolution')}
      </div>
    </div>
  );
};

export default CompareSlider;
