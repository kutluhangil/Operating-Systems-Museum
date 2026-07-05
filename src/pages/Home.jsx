import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Layers, Cpu, GitCompare } from 'lucide-react';
import { osData } from '../data/osData';
import OnThisDay from '../components/ui/OnThisDay';
import './Home.css';

const ERAS = [
  { icon: '💾', name: 'DOS Era',      period: '1981–1990', category: 'DOS',         q: 'DOS' },
  { icon: '🖥️',  name: 'GUI Era',      period: '1985–1999', category: 'Desktop',     q: 'Desktop' },
  { icon: '🌐', name: 'Internet Era', period: '1995–2007', category: 'Desktop',     q: 'Desktop' },
  { icon: '📱', name: 'Mobile Era',   period: '2007–2020', category: 'Mobile',      q: 'Mobile' },
  { icon: '🔮', name: 'Modern Era',   period: '2015–Now',  category: 'Experimental',q: 'all' },
];

const FEATURED_IDS = ['windows-95', 'macos-x', 'ubuntu', 'android', 'windows-xp', 'ios', 'ms-dos'];

// Continuous hand-drawn squiggle for the hero illustration.
const SQUIGGLE_D =
  'M40,270 C40,215 110,205 130,255 C148,300 105,330 150,335 ' +
  'C205,341 200,262 168,240 C205,222 250,240 252,285 ' +
  'C254,325 210,345 245,368 C285,393 345,360 335,300 ' +
  'C328,258 300,240 330,215 C360,190 330,150 370,150 ' +
  'C420,150 435,235 415,300 C393,372 320,420 255,432 ' +
  'C205,441 250,398 300,405';

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

        <div className="hero-inner">
          {/* Left — copy + entry */}
          <div className="hero-left">
            <motion.div {...fadeUp(0)}>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Digital Museum · {totalOS}+ Operating Systems
              </div>
            </motion.div>

            <motion.h1 className="hero-title" {...fadeUp(0.1)}>
              The history of{' '}
              <span className="hero-title-gradient">computing</span>,
              <br />
              preserved.
            </motion.h1>

            <motion.p className="hero-subtitle" {...fadeUp(0.2)}>
              {t('home.subtitle')}
            </motion.p>

            <motion.div className="hero-search" {...fadeUp(0.3)}>
              <Link to="/timeline" className="hero-search-pill">
                <span className="hero-search-placeholder">
                  Walk the timeline of operating systems…
                </span>
                <span className="hero-search-btn">
                  Explore <ArrowRight size={15} />
                </span>
              </Link>
            </motion.div>

            <motion.div className="hero-chips" {...fadeUp(0.4)}>
              <Link to="/library" className="hero-chip"><Layers size={14} /> Library</Link>
              <Link to="/museum" className="hero-chip"><Cpu size={14} /> 3D Museum</Link>
              <Link to="/compare" className="hero-chip"><GitCompare size={14} /> Compare</Link>
            </motion.div>
          </div>

          {/* Right — Spider-Verse squiggle */}
          <motion.div
            className="hero-art"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.28, 0.11, 0.32, 1] }}
          >
            <div className="squiggle-halftone" />
            <svg className="squiggle" viewBox="0 0 480 500" aria-hidden="true">
              <circle className="squiggle-circle" cx="178" cy="150" r="52" />
              <path className="squiggle-ghost red" d={SQUIGGLE_D} />
              <path className="squiggle-ghost cyan" d={SQUIGGLE_D} />
              <path className="squiggle-main" d={SQUIGGLE_D} />
            </svg>
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
                  <span
                    className="featured-item-accent"
                    style={{ background: os.color || 'var(--accent)' }}
                  />
                  <div
                    className="logo-tile"
                    style={{
                      background: `${os.color || '#888'}14`,
                      borderColor: `${os.color || '#888'}2e`,
                    }}
                  >
                    {os.icon ? <img src={os.icon} alt={os.name} loading="lazy" /> : <span>💾</span>}
                  </div>
                  <div className="featured-item-meta">
                    <div className="featured-item-year mono">{os.releaseYear}</div>
                    <div className="featured-item-name">{os.name}</div>
                    <div className="featured-item-dev">{os.developer}</div>
                  </div>
                  <span className="featured-item-arrow">
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── On This Day ───────────────────────────────────────── */}
      <section className="container" style={{ marginBottom: 'var(--s6)', marginTop: 'var(--s4)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <OnThisDay />
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
                  <b>{era.q === 'all'
                    ? osData.length
                    : osData.filter(o => o.category === era.category).length}</b> systems
                  <ArrowRight size={13} className="era-card-arrow" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────── */}
      <section className="cta-wrap container">
        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="cta-glow" />
          <div className="cta-eyebrow">
            <span className="cta-eyebrow-dot" /> Begin the journey
          </div>
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
              <Cpu size={15} /> 3D Museum Mode
            </Link>
          </div>
          <div className="cta-stats">
            <span><b>{totalOS}+</b> Systems</span>
            <i />
            <span><b>{decades}</b> Decades</span>
            <i />
            <span><b>{developers}</b> Makers</span>
          </div>
        </motion.div>
      </section>

      <div style={{ height: 'var(--s5)' }} />
    </div>
  );
};

export default Home;
