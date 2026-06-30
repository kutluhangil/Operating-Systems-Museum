import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Cpu, HardDrive, Globe, Heart, Play, Building2 } from 'lucide-react';
import { getOSById } from '../data/osData';
import { useFavorites } from '../context/FavoritesContext';
import { useTranslation } from 'react-i18next';
import './OSDetail.css';

const OPEN_SOURCE = ['ubuntu', 'debian', 'fedora', 'reactos', 'haiku', 'freedos'];
const TABS = ['overview', 'history', 'facts', 'specs', 'editions', 'boot'];

const Pill = ({ icon, label }) => (
  <div className="detail-pill">
    {icon} <span>{label}</span>
  </div>
);

const OSDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { toggle, isFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState('overview');
  const os = getOSById(id);

  if (!os) {
    return (
      <div className="detail-not-found container">
        <div style={{ fontSize: '4rem', marginBottom: 24 }}>🔍</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: 12 }}>
          {t('detail.not_found')}
        </h2>
        <p style={{ color: 'var(--t2)', marginBottom: 32 }}>{t('detail.not_found_desc')}</p>
        <Link to="/library" className="btn btn-ghost">
          <ArrowLeft size={16} /> {t('detail.back')}
        </Link>
      </div>
    );
  }

  const fav = isFavorite(os.id);
  const isOpen = OPEN_SOURCE.includes(os.id);
  const predOS  = os.predecessor ? getOSById(os.predecessor) : null;
  const succOS  = os.successor   ? getOSById(os.successor)   : null;

  // Compute a strong accent for the hero
  const heroColor = os.color || '#1e1e2a';
  const isLight   = heroColor.startsWith('#f') || heroColor.startsWith('#e');

  return (
    <div>
      {/* ── Full-Bleed Hero ── */}
      <div className="detail-hero" style={{ background: heroColor }}>
        <div className="detail-hero-bg">
          {/* radial highlight */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 60% 40%, ${heroColor}dd 0%, ${heroColor}22 100%)`,
          }} />
          <div className="detail-hero-gradient" />
        </div>

        <div className="container detail-hero-inner">
          {/* Icon */}
          <div className="detail-hero-icon">
            {os.icon
              ? <img src={os.icon} alt={os.name} />
              : <span style={{ fontSize: 48 }}>💾</span>
            }
          </div>

          {/* Text */}
          <div className="detail-hero-text">
            <Link to="/library" className="detail-back">
              <ArrowLeft size={14} /> {t('detail.back')}
            </Link>

            <h1 className="detail-title">{os.name}</h1>

            <div className="detail-pills">
              <Pill icon={<Calendar size={12} />} label={os.releaseYear} />
              <Pill icon={<Building2 size={12} />} label={os.developer} />
              <Pill icon={<Cpu size={12} />} label={os.kernel} />
              {os.fileSystem && <Pill icon={<HardDrive size={12} />} label={os.fileSystem} />}
              {os.defaultBrowser && <Pill icon={<Globe size={12} />} label={os.defaultBrowser} />}
              <Pill icon={<Tag size={12} />} label={os.status} />
            </div>

            <div className="detail-hero-actions">
              <Link to="/museum" className="btn btn-primary" style={{ background: 'rgba(255,255,255,0.95)', color: '#000' }}>
                <Play size={15} /> {t('detail.launch')}
              </Link>
              <button
                className="btn btn-ghost"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                onClick={() => toggle(os.id)}
              >
                <Heart size={15} fill={fav ? 'currentColor' : 'none'} />
                {fav ? t('os_card.remove_favorite') : t('os_card.add_favorite')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="detail-body container">
        {/* Tabs */}
        <div className="detail-tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`detail-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {t(`detail.${tab}`) || tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview */}
        <motion.div
          key={activeTab}
          className={`detail-section ${activeTab === 'overview' ? 'visible' : ''}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="detail-section-title">{t('detail.overview')}</h2>
          <p className="detail-description">{os.description}</p>
        </motion.div>

        {/* History */}
        <div className={`detail-section ${activeTab === 'history' ? 'visible' : ''}`}>
          <h2 className="detail-section-title">{t('detail.history')}</h2>
          <p className="detail-history">{os.history || t('detail.not_found_desc')}</p>
        </div>

        {/* Facts */}
        <div className={`detail-section ${activeTab === 'facts' ? 'visible' : ''}`}>
          <h2 className="detail-section-title">{t('detail.facts')}</h2>
          {os.interestingFacts && os.interestingFacts.length > 0 ? (
            <div className="detail-facts-grid">
              {os.interestingFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  className="detail-fact-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className="detail-fact-num">{String(i + 1).padStart(2, '0')}</div>
                  <p className="detail-fact-text">{fact}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--t3)' }}>{t('common.n_a')}</p>
          )}
        </div>

        {/* Specs */}
        <div className={`detail-section ${activeTab === 'specs' ? 'visible' : ''}`}>
          <h2 className="detail-section-title">{t('detail.specs')}</h2>
          <div className="detail-specs">
            {[
              [t('detail.developer'),     os.developer],
              [t('detail.release_year'),  os.releaseYear],
              [t('detail.eol'),           os.endOfLife || t('common.active')],
              [t('detail.status'),        os.status],
              [t('detail.kernel'),        os.kernel],
              [t('detail.architecture'),  os.architecture],
              [t('detail.filesystem'),    os.fileSystem || t('common.n_a')],
              [t('detail.browser'),       os.defaultBrowser || t('common.n_a')],
              ...(os.systemRequirements ? [
                [t('compare.ram'),     os.systemRequirements.ram || t('common.n_a')],
                [t('compare.cpu'),     os.systemRequirements.cpu || t('common.n_a')],
                [t('compare.storage'), os.systemRequirements.storage || t('common.n_a')],
              ] : []),
            ].map(([label, val]) => (
              <div key={label} className="detail-spec-row">
                <div className="detail-spec-label">{label}</div>
                <div className="detail-spec-value">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Editions */}
        <div className={`detail-section ${activeTab === 'editions' ? 'visible' : ''}`}>
          <h2 className="detail-section-title">{t('detail.editions')}</h2>
          {os.editions && os.editions.length > 0 ? (
            <>
              <div className="detail-editions">
                {os.editions.map(ed => <span key={ed} className="detail-edition">{ed}</span>)}
              </div>

              {(predOS || succOS) && (
                <div style={{ marginTop: 40 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 16, color: 'var(--t2)' }}>
                    {t('detail.predecessor')} / {t('detail.successor')}
                  </h3>
                  <div className="detail-related">
                    {predOS && (
                      <Link to={`/os/${predOS.id}`} className="detail-related-card">
                        <span className="detail-related-dir">← {t('detail.predecessor')}</span>
                        <span className="detail-related-name">{predOS.name}</span>
                      </Link>
                    )}
                    {succOS && (
                      <Link to={`/os/${succOS.id}`} className="detail-related-card">
                        <span className="detail-related-dir">{t('detail.successor')} →</span>
                        <span className="detail-related-name">{succOS.name}</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: 'var(--t3)' }}>{t('common.n_a')}</p>
          )}
        </div>

        {/* Boot */}
        <div className={`detail-section ${activeTab === 'boot' ? 'visible' : ''}`}>
          <h2 className="detail-section-title">{t('detail.boot')}</h2>
          <div className={`detail-boot ${isOpen ? 'detail-boot-open' : ''}`}
            style={isOpen ? {} : { background: `${heroColor}22` }}
          >
            <div className="boot-scanlines" />
            <Play size={36} style={{ color: isOpen ? 'rgba(34,197,94,0.6)' : 'rgba(255,255,255,0.2)', position: 'relative', zIndex: 1 }} />
            <p className="detail-boot-text">
              {isOpen ? t('detail.emulator_opensource') : `${t('detail.emulator_unavailable')} — ${t('detail.emulator_description')}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OSDetail;
