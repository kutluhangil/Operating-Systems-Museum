import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layers, Code, MessageSquare, ArrowUpRight } from 'lucide-react';

const EXPLORE_LINKS = [['/', 'Home'], ['/timeline', 'Timeline'], ['/library', 'OS Library'], ['/compare', 'Compare']];
const MUSEUM_LINKS  = [['/gallery', 'Gallery'], ['/museum', '3D Museum'], ['/favorites', 'Favorites'], ['/about', 'About']];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'linear-gradient(180deg, var(--surf-1) 0%, var(--ink) 100%)',
      padding: '64px 0 40px',
      position: 'relative',
      zIndex: 1,
      marginTop: 'auto',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '48px' }}>
        {/* Brand */}
        <div style={{ maxWidth: 300 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, textDecoration: 'none' }}>
            <div style={{
              width: 30, height: 30,
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--teal, #5ac8f5) 100%)',
              borderRadius: 9,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(41,151,255,0.35)',
            }}>
              <Layers size={15} color="#fff" />
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '-0.03em',
              color: 'var(--t1)',
            }}>OS Museum</span>
          </Link>
          <p style={{ color: 'var(--t3)', fontSize: '0.85rem', lineHeight: 1.7 }}>
            A curated archive of operating systems history — from the earliest terminals to modern platforms.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: 'var(--t3)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>Explore</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {EXPLORE_LINKS.map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'var(--t2)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 120ms' }}
                  onMouseEnter={e => e.target.style.color = 'var(--t1)'}
                  onMouseLeave={e => e.target.style.color = 'var(--t2)'}
                >{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p style={{ color: 'var(--t3)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>Museum</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {MUSEUM_LINKS.map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'var(--t2)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 120ms' }}
                  onMouseEnter={e => e.target.style.color = 'var(--t1)'}
                  onMouseLeave={e => e.target.style.color = 'var(--t2)'}
                >{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container" style={{
        marginTop: '48px',
        paddingTop: '24px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <p style={{ color: 'var(--t3)', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} OS Museum · Built with React & Framer Motion
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="https://github.com" target="_blank" rel="noreferrer"
            style={{ color: 'var(--t3)', display: 'flex', transition: 'color 120ms' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--t1)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--t3)'}
          ><Code size={17} /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"
            style={{ color: 'var(--t3)', display: 'flex', transition: 'color 120ms' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--t1)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--t3)'}
          ><MessageSquare size={17} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
