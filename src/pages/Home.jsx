import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Layers } from 'lucide-react';
import { osData } from '../data/osData';
import './Home.css';

const ERAS = [
  { icon: '💾', name: 'DOS Era',       period: '1981–1990', category: 'DOS',        q: 'DOS' },
  { icon: '🖥️',  name: 'GUI Era',       period: '1985–1999', category: 'Desktop',    q: 'Desktop' },
  { icon: '🌐', name: 'Internet Era',  period: '1995–2007', category: 'Desktop',    q: 'Desktop' },
  { icon: '📱', name: 'Mobile Era',    period: '2007–2020', category: 'Mobile',     q: 'Mobile' },
  { icon: '🔮', name: 'Modern Era',    period: '2015–Now',  category: 'Experimental', q: 'all' },
];

const FEATURED_IDS = ['windows-95', 'macos-x', 'ubuntu', 'android', 'windows-xp', 'ios', 'ms-dos'];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const Home = () => {
  const { t } = useTranslation();
  const featured = FEATURED_IDS.map(id => osData.find(o => o.id === id)).filter(Boolean);
  const totalOS = osData.length;
  const decades = Math.round((new Date().getFullYear() - 1981) / 10);
  const developers = [...new Set(osData.map(o => o.developer))].length;

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero">
        {/* Background */}
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div {...fade(0)}>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Digital Museum · {totalOS}+ Operating Systems
            </div>
          </motion.div>

          <motion.h1 className="hero-title" {...fade(0.1)}>
            <span className="hero-title-line">The History of</span>
            <span className="hero-title-line hero-title-accent">Computing</span>
            <span className="hero-title-line">Preserved.</span>
          </motion.h1>

          <motion.p className="hero-subtitle" {...fade(0.2)}>
            {t('home.subtitle')}
          </motion.p>

          <motion.div className="hero-cta" {...fade(0.3)}>
            <Link to="/timeline" className="btn btn-primary">
              {t('home.explore_timeline')} <ArrowRight size={16} />
            </Link>
            <Link to="/library" className="btn btn-ghost">
              {t('home.browse_systems')} <Layers size={16} />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div className="hero-stats" {...fade(0.4)}>
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

        {/* Scroll hint */}
        <div className="hero-scroll">
          <span>Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* ── Featured Horizontal Scroll ── */}
      <section className="featured-section container">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Featured Systems</span>
          <div className="section-label-line" />
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

        <div className="featured-track-wrap">
          <div className="featured-track">
            {featured.map((os, i) => (
              <motion.div
                key={os.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link to={`/os/${os.id}`} className="featured-item">
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: os.color || 'var(--accent)' }} />
                  <div className="featured-item-icon">
                    {os.icon && <img src={os.icon} alt={os.name} loading="lazy" />}
                  </div>
                  <div>
                    <div className="featured-item-year mono">{os.releaseYear}</div>
                    <div className="featured-item-name">{os.name}</div>
                    <div className="featured-item-dev">{os.developer}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Eras ── */}
      <section className="era-section container">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Browse by Era</span>
          <div className="section-label-line" />
        </div>
        <div className="era-grid">
          {ERAS.map((era, i) => (
            <motion.div
              key={era.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
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
                    : `${osData.filter(o => o.category === era.category).length} systems`
                  }
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom padding */}
      <div style={{ height: 'var(--s7)' }} />
    </div>
  );
};

export default Home;
