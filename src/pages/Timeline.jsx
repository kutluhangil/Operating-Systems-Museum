import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ChevronRight, Activity } from 'lucide-react';
import { osData } from '../data/osData';

const CATS = ['All', 'Desktop', 'Mobile', 'DOS', 'Server', 'Experimental'];

const Timeline = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');
  const [hoveredYear, setHoveredYear] = useState(null);
  const [hoveredOS, setHoveredOS] = useState(null);

  const items = (filter === 'All' ? osData : osData.filter(o => o.category === filter))
    .sort((a, b) => a.releaseYear - b.releaseYear);

  const years = [...new Set(items.map(o => o.releaseYear))].sort((a, b) => a - b);

  return (
    <div style={{ padding: 'var(--s6) 0 var(--s7)' }}>
      {/* Header */}
      <div className="container" style={{ marginBottom: 'var(--s5)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-hi)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <Activity size={16} />
          {t('timeline.subtitle') || 'EVOLUTION TREE'}
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 16 }}
        >
          {t('timeline.title')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--t2)', maxWidth: 580, lineHeight: 1.65, marginBottom: 'var(--s4)' }}
        >
          {t('timeline.description')}
        </motion.p>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}
        >
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`lib-tab${filter === c ? ' active' : ''}`}
              style={{ position: 'relative' }}
            >
              {c === 'All' ? t('library.filter_all') : c}
            </button>
          ))}
        </motion.div>

      </div>

      {/* Timeline */}
      <div className="container" style={{ maxWidth: 800 }}>
        <AnimatePresence mode="popLayout">
          {years.map((year, yearIndex) => {
            const group = items.filter(o => o.releaseYear === year);
            const isHoveredYear = hoveredYear === year;
            
            return (
              <motion.div
                layout
                key={year}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, delay: yearIndex * 0.05 }}
                onMouseEnter={() => setHoveredYear(year)}
                onMouseLeave={() => setHoveredYear(null)}
                style={{ display: 'flex', gap: 24, marginBottom: 40 }}
              >
                {/* Year column */}
                <div style={{ width: 64, textAlign: 'right', flexShrink: 0, paddingTop: 4 }}>
                  <motion.span 
                    animate={{ color: isHoveredYear ? 'var(--accent)' : 'var(--accent-hi)' }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.3s' }}
                  >
                    {year}
                  </motion.span>
                </div>

                {/* Line + content */}
                <div style={{ display: 'flex', gap: 20, flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.div 
                      animate={{ 
                        scale: isHoveredYear ? 1.5 : 1,
                        boxShadow: isHoveredYear ? '0 0 15px var(--accent)' : '0 0 10px var(--glow-a)'
                      }}
                      style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 6, zIndex: 2 }} 
                    />
                    <motion.div 
                      animate={{ 
                        background: isHoveredYear ? 'var(--accent-hi)' : 'var(--border)' 
                      }}
                      style={{ width: 2, flex: 1, marginTop: 6, borderRadius: 2 }} 
                    />
                  </div>
                  
                  <div style={{ flex: 1, paddingBottom: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {group.map((os, osIndex) => {
                        const isHovered = hoveredOS === os.id;
                        
                        return (
                          <motion.div 
                            key={os.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (yearIndex * 0.05) + (osIndex * 0.1) }}
                            onMouseEnter={() => setHoveredOS(os.id)}
                            onMouseLeave={() => setHoveredOS(null)}
                          >
                            <Link
                              to={`/os/${os.id}?boot=true`}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                background: isHovered ? 'var(--surf-3)' : 'var(--surf-2)',
                                border: '1px solid',
                                borderColor: isHovered ? 'var(--accent)' : 'var(--border)',
                                borderRadius: 'var(--r2)',
                                padding: '16px',
                                textDecoration: 'none',
                                transition: 'background var(--dur-med), border-color var(--dur-med), transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                transform: isHovered ? 'translateX(8px) scale(1.02)' : 'none',
                                boxShadow: isHovered ? '0 10px 30px -10px var(--glow-a)' : 'none',
                                overflow: 'hidden',
                                position: 'relative'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                {/* Icon */}
                                <div style={{
                                  width: 42, height: 42, background: 'var(--surf-4)',
                                  borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  padding: 8, flexShrink: 0, overflow: 'hidden'
                                }}>
                                  {os.icon ? <img src={os.icon} alt={os.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <span>💾</span>}
                                </div>
                                {/* Text */}
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    {os.name}
                                    {isHovered && <ChevronRight size={16} color="var(--accent)" />}
                                  </div>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--t3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontWeight: 500 }}>{os.developer}</span>
                                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--border)' }} />
                                    <span className="badge badge-neutral" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>{os.category}</span>
                                  </div>
                                </div>
                                {/* Status */}
                                <span className={`badge ${os.status === 'Active' ? 'badge-success' : 'badge-neutral'}`} style={{ fontWeight: 600 }}>{os.status}</span>
                              </div>
                              
                              {/* Hover Reveal Details */}
                              <AnimatePresence>
                                {isHovered && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    style={{ overflow: 'hidden' }}
                                  >
                                    <div style={{ paddingTop: 12, borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--t2)', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                      <Info size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                                      <span style={{ lineHeight: 1.5, paddingBottom: 8 }}>
                                        {os.description?.substring(0, 100)}... Click to boot {os.name}!
                                      </span>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Timeline;
