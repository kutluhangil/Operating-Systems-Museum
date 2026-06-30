import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { osData } from '../data/osData';
import { X } from 'lucide-react';

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

      {osA && osB ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Icon row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: 16, alignItems: 'center', marginBottom: 32, maxWidth: 860 }}>
            <div style={{ background: 'var(--surf-2)', border: '1px solid var(--border)', borderRadius: 'var(--r3)', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 72, height: 72, background: 'var(--surf-3)', borderRadius: 'var(--r2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                {osA.icon && <img src={osA.icon} alt={osA.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.03em' }}>{osA.name}</div>
            </div>
            <div style={{ textAlign: 'center', color: 'var(--t3)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700 }}>VS</div>
            <div style={{ background: 'var(--surf-2)', border: '1px solid var(--border)', borderRadius: 'var(--r3)', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 72, height: 72, background: 'var(--surf-3)', borderRadius: 'var(--r2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                {osB.icon && <img src={osB.icon} alt={osB.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.03em' }}>{osB.name}</div>
            </div>
          </div>

          {/* Table */}
          <div style={{ maxWidth: 860, background: 'var(--surf-2)', border: '1px solid var(--border)', borderRadius: 'var(--r3)', overflow: 'hidden' }}>
            {FIELDS.map(([field, key], i) => (
              <div key={field} style={{
                display: 'grid', gridTemplateColumns: '1fr 160px 1fr', gap: 0,
                borderBottom: i < FIELDS.length - 1 ? '1px solid var(--border)' : 'none'
              }}>
                <div style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', borderRight: '1px solid var(--border)', color: osA[field] !== osB[field] ? 'var(--t1)' : 'var(--t2)' }}>
                  {String(osA[field] || '—')}
                </div>
                <div style={{ padding: '14px 20px', textAlign: 'center', fontSize: '0.78rem', fontWeight: 600, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surf-1)', borderRight: '1px solid var(--border)' }}>
                  {t(key)}
                </div>
                <div style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: osA[field] !== osB[field] ? 'var(--t1)' : 'var(--t2)' }}>
                  {String(osB[field] || '—')}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--t3)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>⚖️</div>
          <p>{t('compare.select_both')}</p>
        </div>
      )}
    </div>
  );
};

export default Compare;
