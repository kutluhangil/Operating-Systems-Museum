import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layers, Code, MessageSquare } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'linear-gradient(180deg, var(--surf-1) 0%, var(--ink) 100%)',
      padding: '64px 0 32px',
      position: 'relative',
      zIndex: 1,
      marginTop: 'auto'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '48px' }}>
        <div style={{ maxWidth: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div className="hover-glow" style={{ width: 32, height: 32, background: 'var(--grad-premium)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px var(--glow-a)' }}>
              <Layers size={16} color="#fff" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, var(--t1), var(--t3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OS Museum</span>
          </div>
          <p style={{ color: 'var(--t2)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {t('about.mission').slice(0, 100)}…
          </p>
        </div>
        <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: 'var(--t1)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Explore</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[['/', t('nav.home')], ['/timeline', t('nav.timeline')], ['/library', t('nav.os_library')], ['/compare', t('nav.compare')]].map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'var(--t2)', fontSize: '0.9rem', transition: 'color var(--dur-fast) var(--ease)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent-hi)'}
                  onMouseLeave={e => e.target.style.color = 'var(--t2)'}>{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p style={{ color: 'var(--t1)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Museum</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[['/gallery', t('nav.gallery')], ['/museum', t('nav.museum')], ['/favorites', t('nav.favorites')], ['/about', t('nav.about')]].map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'var(--t2)', fontSize: '0.9rem', transition: 'color var(--dur-fast) var(--ease)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent-hi)'}
                  onMouseLeave={e => e.target.style.color = 'var(--t2)'}>{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: '64px', paddingTop: '24px', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <p style={{ color: 'var(--t3)', fontSize: '0.85rem' }}>© {new Date().getFullYear()} OS Museum. Built with React & Framer Motion.</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--t3)', display: 'flex', transition: 'color var(--dur-fast)' }} onMouseEnter={e => e.target.style.color = 'var(--t1)'} onMouseLeave={e => e.target.style.color = 'var(--t3)'}>
            <Code size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: 'var(--t3)', display: 'flex', transition: 'color var(--dur-fast)' }} onMouseEnter={e => e.target.style.color = 'var(--t1)'} onMouseLeave={e => e.target.style.color = 'var(--t3)'}>
            <MessageSquare size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
