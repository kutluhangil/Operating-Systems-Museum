import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { osData } from '../data/osData';
import { X } from 'lucide-react';
import { soundManager } from '../utils/SoundManager';
import CompareSlider from '../components/ui/CompareSlider';

const FIELDS = [
  ['developer', 'compare.developer'],
  ['releaseYear', 'compare.release_year'],
  ['endOfLife', 'compare.end_of_life'],
  ['status', 'compare.status'],
  ['kernel', 'compare.kernel'],
  ['architecture', 'compare.architecture'],
  ['fileSystem', 'compare.filesystem'],
  ['defaultBrowser', 'compare.browser'],
];

const SysSelect = ({ label, value, onChange, exclude }) => {
  const { t } = useTranslation();
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, fontWeight: 600 }}>
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', background: 'var(--surf-2)', border: '1px solid var(--border)', color: 'var(--t1)', borderRadius: 'var(--r2)', padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
      >
        <option value="">{t('compare.select_placeholder')}</option>
        {osData.filter(o => o.id !== exclude).map(o => (
          <option key={o.id} value={o.id}>{o.name} ({o.releaseYear})</option>
        ))}
      </select>
    </div>
  );
};

const Compare = () => {
  const { t } = useTranslation();
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const osA = osData.find(o => o.id === a);
  const osB = osData.find(o => o.id === b);

  useEffect(() => {
    if (osA && osB) {
      soundManager.playClash();
    }
  }, [a, b, osA, osB]);

  return (
    <div style={{ padding: 'var(--s6) 0 var(--s7)' }} className="container">
      {/* Header */}
      <div style={{ marginBottom: 'var(--s5)', maxWidth: 640 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-hi)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Side-by-Side</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 16 }}>{t('compare.title')}</h1>
        <p style={{ color: 'var(--t2)', lineHeight: 1.65 }}>{t('compare.description')}</p>
      </div>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 640, marginBottom: 'var(--s5)' }}>
        <SysSelect label={t('compare.system_a')} value={a} onChange={setA} exclude={b} />
        <SysSelect label={t('compare.system_b')} value={b} onChange={setB} exclude={a} />
      </div>

      <AnimatePresence mode="wait">
      {osA && osB ? (
        <motion.div key={`${a}-${b}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
          {/* Icon row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: 16, alignItems: 'center', marginBottom: 32, maxWidth: 860 }}>
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.6, duration: 0.6 }} style={{ background: 'var(--surf-2)', border: '1px solid var(--border)', borderRadius: 'var(--r3)', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 96, height: 96, background: 'var(--surf-3)', borderRadius: 'var(--r2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                {osA.icon && <img src={osA.icon} alt={osA.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.03em' }}>{osA.name}</div>
            </motion.div>
            
            <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }} style={{ textAlign: 'center', color: 'var(--accent-hi)', fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 900 }}>VS</motion.div>
            
            <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.6, duration: 0.6 }} style={{ background: 'var(--surf-2)', border: '1px solid var(--border)', borderRadius: 'var(--r3)', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 96, height: 96, background: 'var(--surf-3)', borderRadius: 'var(--r2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                {osB.icon && <img src={osB.icon} alt={osB.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.03em' }}>{osB.name}</div>
            </motion.div>
          </div>

          <CompareSlider osA={osA} osB={osB} />

          {/* Table */}
          <div style={{ maxWidth: 860, background: 'var(--surf-2)', border: '1px solid var(--border)', borderRadius: 'var(--r3)', overflow: 'hidden' }}>
            {FIELDS.map(([field, key], i) => {
              const aVal = String(osA[field] || '—');
              const bVal = String(osB[field] || '—');
              const isMatch = aVal === bVal && aVal !== '—';
              
              let highlightA = false;
              let highlightB = false;
              
              if (field === 'releaseYear' && osA.releaseYear && osB.releaseYear) {
                  if (osA.releaseYear < osB.releaseYear) highlightA = true;
                  else if (osB.releaseYear < osA.releaseYear) highlightB = true;
              }

              return (
              <motion.div 
                key={field} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.05) }}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 160px 1fr', gap: 0,
                  borderBottom: i < FIELDS.length - 1 ? '1px solid var(--border)' : 'none',
                  background: isMatch ? 'rgba(var(--accent-rgb), 0.05)' : 'transparent'
                }}>
                <div style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', borderRight: '1px solid var(--border)', color: isMatch ? 'var(--accent-hi)' : (highlightA ? 'var(--accent)' : 'var(--t1)') }}>
                  {aVal}
                  {highlightA && <span style={{marginLeft: 8, fontSize: '0.65rem', padding: '2px 6px', background: 'var(--accent-dim)', color: 'var(--accent-hi)', borderRadius: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Older</span>}
                </div>
                <div style={{ padding: '16px 20px', textAlign: 'center', fontSize: '0.78rem', fontWeight: 600, color: isMatch ? 'var(--accent-hi)' : 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isMatch ? 'rgba(var(--accent-rgb), 0.1)' : 'var(--surf-1)', borderRight: '1px solid var(--border)' }}>
                  {t(key)}
                  {isMatch && <span style={{marginLeft: 6, fontSize: '1rem'}}>🤝</span>}
                </div>
                <div style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: isMatch ? 'var(--accent-hi)' : (highlightB ? 'var(--accent)' : 'var(--t1)') }}>
                  {bVal}
                  {highlightB && <span style={{marginLeft: 8, fontSize: '0.65rem', padding: '2px 6px', background: 'var(--accent-dim)', color: 'var(--accent-hi)', borderRadius: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Older</span>}
                </div>
              </motion.div>
            )})}
          </div>
        </motion.div>
      ) : (
        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: '80px 0', textAlign: 'center', color: 'var(--t3)' }}>
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} style={{ fontSize: '3rem', marginBottom: 16 }}>⚖️</motion.div>
          <p>{t('compare.select_both')}</p>
        </motion.div>
      )}
      </AnimatePresence>

    </div>
  );
};

export default Compare;
