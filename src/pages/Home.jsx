import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Layers, Cpu } from 'lucide-react';
import { osData } from '../data/osData';
import './Home.css';

const ERAS = [
  { icon: '💾', name: 'DOS Era',      period: '1981–1990', category: 'DOS',         q: 'DOS' },
  { icon: '🖥️',  name: 'GUI Era',      period: '1985–1999', category: 'Desktop',     q: 'Desktop' },
  { icon: '🌐', name: 'Internet Era', period: '1995–2007', category: 'Desktop',     q: 'Desktop' },
  { icon: '📱', name: 'Mobile Era',   period: '2007–2020', category: 'Mobile',      q: 'Mobile' },
  { icon: '🔮', name: 'Modern Era',   period: '2015–Now',  category: 'Experimental',q: 'all' },
];

const FEATURED_IDS = ['windows-95', 'macos-x', 'ubuntu', 'android', 'windows-xp', 'ios', 'ms-dos'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.28, 0.11, 0.32, 1] },
});

const Home = () => {
  const { t } = useTranslation();
  const featured = FEATURED_IDS.map(id => osData.find(o => o.id === id)).filter(Boolean);
  const totalOS = osData.length;
  const decades = Math.round((new Date().getFullYear() - 1981) / 10);
  const developers = [...new Set(osData.map(o => o.developer))].length;

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        {/* Aurora bg */}
        <div className="hero-aurora">
          <div className="hero-aurora-1" />
          <div className="hero-aurora-2" />
          <div className="hero-aurora-3" />
        </div>
        <div className="hero-grid" />

        <div className="hero-content">
          <motion.div {...fadeUp(0)}>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Digital Museum · {totalOS}+ Operating Systems
            </div>
          </motion.div>

          <motion.h1 className="hero-title" {...fadeUp(0.1)}>
            The History of{' '}
            <br />
            <span className="hero-title-gradient">Computing</span>
            <br />
            Preserved.
          </motion.h1>

          <motion.p className="hero-subtitle" {...fadeUp(0.2)}>
            {t('home.subtitle')}
          </motion.p>

          <motion.div className="hero-cta" {...fadeUp(0.3)}>
            <Link to="/timeline" className="btn btn-primary">
              {t('home.explore_timeline')} <ArrowRight size={15} />
            </Link>
            <Link to="/library" className="btn btn-ghost">
              {t('home.browse_systems')} <Layers size={15} />
            </Link>
          </motion.div>

          <motion.div className="hero-stats" {...fadeUp(0.45)}>
            <div className="hero-stat">
              <div className="hero-stat-num">{totalOS}+</div>
              <div className="hero-stat-label">{t('home.stats_os')}</div>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat">
              <div className="hero-stat-num">{decades}</div>
              <div className="hero-stat-label">{t('home.stats_decades')}</div>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat">
              <div className="hero-stat-num">{developers}</div>
              <div className="hero-stat-label">{t('home.stats_developers')}</div>
            </div>
          </motion.div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <ChevronDown size={14} />
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────── */}
      <section className="featured-section container">
        <div className="featured-header">
          <div className="section-eyebrow">
            <Cpu size={13} /> Featured Systems
          </div>
          <motion.h2
            className="featured-title"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('home.featured_title')}
          </motion.h2>
          <p className="featured-subtitle">{t('home.featured_subtitle')}</p>
        </div>

        <div className="featured-track-wrap">
          <div className="featured-track">
            {featured.map((os, i) => (
              <motion.div
                key={os.id}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.5, type: 'spring', bounce: 0.35 }}
              >
                <Link to={`/os/${os.id}?boot=true`} className="featured-item">
                  {/* Subtle color accent at top */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: os.color || 'linear-gradient(90deg, var(--accent), var(--teal, #5ac8f5))',
                    opacity: 0.7,
                  }} />
                  <div className="featured-item-icon">
                    {os.icon ? <img src={os.icon} alt={os.name} loading="lazy" /> : <span>💾</span>}
                  </div>
                  <div className="featured-item-year mono">{os.releaseYear}</div>
                  <div className="featured-item-name">{os.name}</div>
                  <div className="featured-item-dev">{os.developer}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Eras Bento ───────────────────────────────────────── */}
      <section className="era-section container">
        <div className="era-header">
          <div className="section-eyebrow">Browse by Era</div>
          <motion.h2
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Five Decades of Innovation
          </motion.h2>
        </div>

        <div className="era-grid">
          {ERAS.map((era, i) => (
            <motion.div
              key={era.name}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, type: 'spring', bounce: 0.4 }}
            >
              <Link
                to={era.q === 'all' ? '/library' : `/library?cat=${era.q}`}
                className="era-card"
              >
                <span className="era-card-icon">{era.icon}</span>
                <span className="era-card-period mono">{era.period}</span>
                <span className="era-card-name">{era.name}</span>
                <span className="era-card-count">
                  {era.q === 'all'
                    ? `${osData.length} systems`
                    : `${osData.filter(o => o.category === era.category).length} systems`}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────── */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="cta-title">Start Exploring Now</h2>
        <p className="cta-subtitle">
          From the first command-line interfaces to modern graphical systems —
          every milestone of computing history is a click away.
        </p>
        <div className="cta-buttons">
          <Link to="/timeline" className="btn btn-primary">
            View Timeline <ArrowRight size={15} />
          </Link>
          <Link to="/museum" className="btn btn-ghost">
            3D Museum Mode
          </Link>
        </div>
      </motion.section>

      <div style={{ height: 'var(--s5)' }} />
    </div>
  );
};

export default Home;
