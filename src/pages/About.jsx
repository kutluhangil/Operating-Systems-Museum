import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Layers, ArrowRight } from 'lucide-react';
import { osData } from '../data/osData';

const TECH = ['React 18', 'Vite', 'Framer Motion', 'react-router-dom', 'react-i18next', 'Lucide Icons', '@fontsource/syne', 'Vanilla CSS'];
const TEAM = [
  { name: 'OS Museum', role: 'Project', icon: '🏛️' },
  { name: 'React', role: 'UI Framework', icon: '⚛️' },
  { name: 'Open Source', role: 'Icons & Fonts', icon: '🔓' },
];

const About = () => {
  const { t } = useTranslation();
  const total = osData.length;

  return (
    <div style={{ padding: 'var(--s6) 0 var(--s7)' }}>
      {/* Hero */}
      <div className="container" style={{ marginBottom: 'var(--s7)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-hi)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
            {t('about.subtitle')}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 28, maxWidth: 800 }}>
            {t('about.title')}
          </h1>
          <p style={{ color: 'var(--t2)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 680, marginBottom: 40 }}>
            {t('about.mission')}
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              [total + '+', t('home.stats_os')],
              ['40+', t('home.stats_decades') + ' years'],
              ['8', t('nav.gallery') + ' categories'],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 4 }}>{n}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mission */}
      <div style={{ background: 'var(--surf-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: 'var(--s6) 0', marginBottom: 'var(--s6)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 20 }}>
                {t('about.features_title')}
              </h2>
              <p style={{ color: 'var(--t2)', lineHeight: 1.7 }}>{t('about.mission')}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                [t('nav.timeline'), t('timeline.description')],
                [t('nav.os_library'), t('library.subtitle')],
                [t('nav.compare'), t('compare.description')],
                [t('nav.museum'), t('museum.description')],
              ].map(([title, desc]) => (
                <div key={title} style={{ background: 'var(--surf-2)', border: '1px solid var(--border)', borderRadius: 'var(--r3)', padding: '16px 20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--t3)', lineHeight: 1.55 }}>{desc.slice(0, 80)}…</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tech stack */}
      <div className="container">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 24 }}>
          {t('about.tech_stack')}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 'var(--s6)' }}>
          {TECH.map(t => (
            <span key={t} style={{ background: 'var(--surf-2)', border: '1px solid var(--border)', borderRadius: 'var(--r2)', padding: '8px 16px', fontSize: '0.875rem', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(6,182,212,0.08))', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 'var(--r4)', padding: 48, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 }}>
            {t('about.cta_title')}
          </h2>
          <p style={{ color: 'var(--t2)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>{t('about.cta_desc')}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/library" className="btn btn-primary">
              {t('about.cta_explore')} <ArrowRight size={16} />
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
