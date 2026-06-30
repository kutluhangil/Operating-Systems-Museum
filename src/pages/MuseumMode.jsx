import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { osData } from '../data/osData';
import { X, Keyboard, ChevronLeft, ChevronRight, Monitor, ArrowRight } from 'lucide-react';

const OPEN_SOURCE = ['ubuntu', 'debian', 'fedora', 'reactos', 'haiku', 'freedos'];

const Museum = () => {
  const { t } = useTranslation();
  const available = osData.filter(o => OPEN_SOURCE.includes(o.id));
  const [active, setActive] = useState(null);
  const [kiosk, setKiosk] = useState(false);

  const advance = useCallback((dir) => {
    if (!active) return;
    const idx = available.findIndex(o => o.id === active.id);
    const next = available[(idx + dir + available.length) % available.length];
    setActive(next);
  }, [active, available]);

  useEffect(() => {
    const handler = (e) => {
      if (!active) return;
      if (e.key === 'ArrowRight') advance(1);
      if (e.key === 'ArrowLeft') advance(-1);
      if (e.key === 'Escape') { setActive(null); setKiosk(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, advance]);

  return (
    <div style={{ padding: 'var(--s6) 0 var(--s7)' }} className="container">
      {/* Header */}
      <div style={{ marginBottom: 'var(--s5)', maxWidth: 640 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-hi)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
          <Monitor size={12} style={{ display: 'inline', marginRight: 6 }} />
          {t('museum.subtitle')}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 16 }}>
          {t('museum.title')}
        </h1>
        <p style={{ color: 'var(--t2)', lineHeight: 1.65, marginBottom: 24 }}>{t('museum.description')}</p>
        <Link to="/museum3d" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', fontSize: '1.05rem', background: 'var(--accent)', color: '#fff' }}>
          <span>Enter 3D Cyberspace</span> <ArrowRight size={18} />
        </Link>
      </div>

      {/* Available OS grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 'var(--s5)' }}>
        {available.map((os, i) => (
          <motion.div
            key={os.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActive(os)}
            style={{
              background: 'var(--surf-2)', border: '1px solid var(--border)', borderRadius: 'var(--r3)',
              padding: 24, cursor: 'pointer',
              transition: 'border-color var(--dur-med), transform var(--dur-med)',
              textDecoration: 'none'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hi)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, background: 'var(--surf-3)', borderRadius: 'var(--r2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                {os.icon ? <img src={os.icon} alt={os.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: 22 }}>💾</span>}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>{os.name}</div>
                <span className="badge badge-active">Open Source</span>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--t3)', lineHeight: 1.5 }}>
              {os.description.slice(0, 90)}…
            </p>
          </motion.div>
        ))}
      </div>

      {/* Keyboard hint */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--t3)', fontSize: '0.8rem', padding: '14px 20px', background: 'var(--surf-2)', border: '1px solid var(--border)', borderRadius: 'var(--r2)', width: 'fit-content' }}>
        <Keyboard size={14} />
        {t('museum.keyboard_hint')}
        <kbd style={{ fontFamily: 'var(--font-mono)', background: 'var(--surf-3)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', fontSize: '0.72rem' }}>← →</kbd>
        <kbd style={{ fontFamily: 'var(--font-mono)', background: 'var(--surf-3)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', fontSize: '0.72rem' }}>ESC</kbd>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(6,6,10,0.92)', backdropFilter: 'blur(20px)', zIndex: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 24 }}
          >
            {/* Top bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', maxWidth: 860 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.03em', fontSize: '1.1rem', flex: 1 }}>{active.name}</div>
              <button onClick={() => advance(-1)} className="btn btn-ghost" style={{ padding: '8px 12px' }}><ChevronLeft size={18} /></button>
              <button onClick={() => advance(1)}  className="btn btn-ghost" style={{ padding: '8px 12px' }}><ChevronRight size={18} /></button>
              <button onClick={() => { setActive(null); setKiosk(false); }} className="btn btn-ghost" style={{ padding: '8px 12px' }}><X size={18} /></button>
            </div>

            {/* CRT Frame */}
            <div style={{
              width: '100%', maxWidth: 860, height: 500,
              background: '#000', borderRadius: 'var(--r4)',
              border: `2px solid ${active.color || 'rgba(99,102,241,0.4)'}`,
              boxShadow: `0 0 60px ${active.color ? active.color + '44' : 'rgba(99,102,241,0.2)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', position: 'relative'
            }}>
              {/* Scanlines */}
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', pointerEvents: 'none', zIndex: 2 }} />
              <div style={{ textAlign: 'center', zIndex: 1, position: 'relative' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>
                  {active.icon ? <img src={active.icon} alt={active.name} style={{ width: 72, height: 72, objectFit: 'contain', filter: 'brightness(0.9)' }} /> : '💾'}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', maxWidth: 360 }}>
                  {t('museum.emulator_info')}
                </p>
                <Link to={`/os/${active.id}`} className="btn btn-primary" style={{ marginTop: 24 }}>
                  {t('detail.overview')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Museum;
