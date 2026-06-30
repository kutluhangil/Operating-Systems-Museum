import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { osData } from '../data/osData';

const CATS = ['All', 'Desktop', 'Mobile', 'DOS', 'Server', 'Experimental'];

const Timeline = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');

  const items = (filter === 'All' ? osData : osData.filter(o => o.category === filter))
    .sort((a, b) => a.releaseYear - b.releaseYear);

  const years = [...new Set(items.map(o => o.releaseYear))].sort((a, b) => a - b);

  return (
    <div style={{ padding: 'var(--s6) 0 var(--s7)' }}>
      {/* Header */}
      <div className="container" style={{ marginBottom: 'var(--s5)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-hi)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
          {t('timeline.subtitle')}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 16 }}>
          {t('timeline.title')}
        </h1>
        <p style={{ color: 'var(--t2)', maxWidth: 580, lineHeight: 1.65, marginBottom: 'var(--s4)' }}>
          {t('timeline.description')}
        </p>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`lib-tab${filter === c ? ' active' : ''}`}
            >
              {c === 'All' ? t('library.filter_all') : c}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="container" style={{ maxWidth: 800 }}>
        {years.map(year => {
          const group = items.filter(o => o.releaseYear === year);
          return (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', gap: 24, marginBottom: 40 }}
            >
              {/* Year column */}
              <div style={{ width: 64, textAlign: 'right', flexShrink: 0, paddingTop: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-hi)' }}>
                  {year}
                </span>
              </div>

              {/* Line + content */}
              <div style={{ display: 'flex', gap: 20, flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 6, boxShadow: '0 0 10px var(--glow-a)' }} />
                  <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 6 }} />
                </div>
                <div style={{ flex: 1, paddingBottom: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {group.map(os => (
                      <Link
                        key={os.id}
                        to={`/os/${os.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          background: 'var(--surf-2)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--r2)',
                          padding: '12px 16px',
                          textDecoration: 'none',
                          transition: 'border-color var(--dur-med), transform var(--dur-med)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hi)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
                      >
                        {/* Icon */}
                        <div style={{
                          width: 36, height: 36, background: 'var(--surf-3)',
                          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          padding: 6, flexShrink: 0, overflow: 'hidden'
                        }}>
                          {os.icon ? <img src={os.icon} alt={os.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <span>💾</span>}
                        </div>
                        {/* Text */}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 2 }}>{os.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--t3)', display: 'flex', gap: 8 }}>
                            <span>{os.developer}</span>
                            <span>·</span>
                            <span className="badge badge-neutral" style={{ padding: '0 6px', fontSize: '0.7rem' }}>{os.category}</span>
                          </div>
                        </div>
                        {/* Status */}
                        <span className="badge badge-neutral">{os.status}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
