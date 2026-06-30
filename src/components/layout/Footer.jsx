import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layers } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--surf-1)',
      padding: '48px 0 32px',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: 28, height: 28, background: 'var(--accent)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={14} color="#fff" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.02em' }}>OS Museum</span>
          </div>
          <p style={{ color: 'var(--t3)', fontSize: '0.85rem', maxWidth: 280, lineHeight: 1.6 }}>
            {t('about.mission').slice(0, 100)}…
          </p>
        </div>
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: 'var(--t3)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Explore</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['/', t('nav.home')], ['/timeline', t('nav.timeline')], ['/library', t('nav.os_library')], ['/compare', t('nav.compare')]].map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'var(--t2)', fontSize: '0.875rem', transition: 'color 180ms' }}
                  onMouseEnter={e => e.target.style.color = 'var(--t1)'}
                  onMouseLeave={e => e.target.style.color = 'var(--t2)'}>{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p style={{ color: 'var(--t3)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Museum</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['/gallery', t('nav.gallery')], ['/museum', t('nav.museum')], ['/favorites', t('nav.favorites')], ['/about', t('nav.about')]].map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'var(--t2)', fontSize: '0.875rem', transition: 'color 180ms' }}
                  onMouseEnter={e => e.target.style.color = 'var(--t1)'}
                  onMouseLeave={e => e.target.style.color = 'var(--t2)'}>{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <p style={{ color: 'var(--t3)', fontSize: '0.8rem' }}>© {new Date().getFullYear()} OS Museum. Built with React & Framer Motion.</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--t3)', display: 'flex' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
