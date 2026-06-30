import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { osData } from '../data/osData';

const CATS = ['All', 'Desktop', 'Mobile', 'DOS', 'Server', 'Experimental'];

const Gallery = () => {
  const { t } = useTranslation();
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);

  const items = cat === 'All' ? osData : osData.filter(o => o.category === cat);
  const sel = selected ? osData.find(o => o.id === selected) : null;

  return (
    <div style={{ padding: 'var(--s6) 0 var(--s7)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'var(--s5)', maxWidth: 640 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-hi)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>{t('gallery.subtitle')}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 16 }}>{t('gallery.title')}</h1>
          <p style={{ color: 'var(--t2)', lineHeight: 1.65, marginBottom: 'var(--s4)' }}>{t('gallery.description')}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CATS.map(c => (
              <button key={c} className={`lib-tab${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>
                {c === 'All' ? t('library.filter_all') : c}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery masonry-ish grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {items.map((os, i) => (
            <motion.div
              key={os.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.03, 0.6) }}
              style={{
                background: 'var(--surf-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r3)',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'border-color var(--dur-med), transform var(--dur-med)',
              }}
              onClick={() => setSelected(os.id)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hi)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
              {/* Color bar */}
              <div style={{ height: 3, background: os.color || 'var(--accent)' }} />
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, background: 'var(--surf-3)', borderRadius: 'var(--r2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                  {os.icon ? <img src={os.icon} alt={os.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: 24 }}>💾</span>}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', marginBottom: 4, letterSpacing: '-0.02em' }}>{os.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--t3)', fontFamily: 'var(--font-mono)' }}>{os.releaseYear}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {sel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,12,0.85)', backdropFilter: 'blur(20px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.25 }}
              style={{ background: 'var(--surf-2)', border: '1px solid var(--border-hi)', borderRadius: 'var(--r4)', maxWidth: 500, width: '100%', overflow: 'hidden' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top color stripe */}
              <div style={{ height: 4, background: sel.color || 'var(--accent)' }} />
              <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
                  <div style={{ width: 72, height: 72, background: 'var(--surf-3)', borderRadius: 'var(--r3)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 14, flexShrink: 0 }}>
                    {sel.icon ? <img src={sel.icon} alt={sel.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: 32 }}>💾</span>}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6 }}>{sel.name}</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span className="badge badge-neutral">{sel.releaseYear}</span>
                      <span className="badge badge-neutral">{sel.category}</span>
                      <span className="badge badge-neutral">{sel.status}</span>
                    </div>
                  </div>
                </div>
                <p style={{ color: 'var(--t2)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 24 }}>{sel.description}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link to={`/os/${sel.id}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setSelected(null)}>
                    {t('gallery.view_details')}
                  </Link>
                  <button className="btn btn-ghost" onClick={() => setSelected(null)} style={{ padding: '10px 16px' }}>✕</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
