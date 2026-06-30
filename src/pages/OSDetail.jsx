import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Cpu, HardDrive, Globe, Heart, Play, ChevronRight } from 'lucide-react';
import { getOSById } from '../data/osData';
import { useFavorites } from '../context/FavoritesContext';
import { useTranslation } from 'react-i18next';
import './OSDetail.css';

const OPEN_SOURCE_IDS = ['ubuntu', 'debian', 'fedora', 'reactos', 'haiku', 'freedos'];

const MetaBadge = ({ icon, label }) => (
  <div className="meta-badge">
    {icon}
    <span>{label}</span>
  </div>
);

const OSDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { toggle, isFavorite } = useFavorites();
  const os = getOSById(id);

  if (!os) {
    return (
      <div className="detail-not-found container">
        <h2>{t('detail.not_found')}</h2>
        <p style={{ color: 'var(--text-silver)', marginTop: 12, marginBottom: 32 }}>{t('detail.not_found_desc')}</p>
        <Link to="/library" className="btn btn-primary">
          <ArrowLeft size={16} /> {t('detail.back')}
        </Link>
      </div>
    );
  }

  const fav = isFavorite(os.id);
  const isOpenSource = OPEN_SOURCE_IDS.includes(os.id);
  const predecessorOS = os.predecessor ? getOSById(os.predecessor) : null;
  const successorOS = os.successor ? getOSById(os.successor) : null;

  return (
    <motion.div
      className="os-detail-page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link to="/library" className="os-detail-back">
        <ArrowLeft size={16} /> {t('detail.back')}
      </Link>

      {/* ── Header ── */}
      <motion.div
        className="os-detail-header"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="os-detail-icon-wrapper">
          {os.icon && <img src={os.icon} alt={os.name} className="os-detail-icon" />}
        </div>
        <div className="os-detail-info">
          <h1 className="os-detail-title">{os.name}</h1>
          <div className="os-detail-meta">
            <MetaBadge icon={<Calendar size={14} />} label={`${t('detail.release_year')}: ${os.releaseYear}`} />
            <MetaBadge icon={<Tag size={14} />} label={`${t('detail.developer')}: ${os.developer}`} />
            <MetaBadge icon={<Cpu size={14} />} label={`${t('detail.kernel')}: ${os.kernel}`} />
            <MetaBadge icon={<HardDrive size={14} />} label={`${t('detail.filesystem')}: ${os.fileSystem || t('common.n_a')}`} />
            {os.defaultBrowser && (
              <MetaBadge icon={<Globe size={14} />} label={`${t('detail.browser')}: ${os.defaultBrowser}`} />
            )}
          </div>
          <p className="os-detail-description">{os.description}</p>
          <div className="os-detail-actions">
            <button className="btn btn-primary">
              <Play size={16} /> {t('detail.launch')}
            </button>
            <button
              className={`btn btn-secondary`}
              onClick={() => toggle(os.id)}
            >
              <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
              {fav ? t('os_card.remove_favorite') : t('os_card.add_favorite')}
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── History ── */}
      {os.history && (
        <div className="detail-section">
          <h2 className="detail-section-title">{t('detail.history')}</h2>
          <p className="detail-history-text">{os.history}</p>
        </div>
      )}

      {/* ── Interesting Facts ── */}
      {os.interestingFacts && os.interestingFacts.length > 0 && (
        <div className="detail-section">
          <h2 className="detail-section-title">{t('detail.facts')}</h2>
          <div className="facts-grid">
            {os.interestingFacts.map((fact, i) => (
              <motion.div
                key={i}
                className="fact-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="fact-num">{i + 1}</div>
                <p className="fact-text">{fact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── Technical Specifications ── */}
      <div className="detail-section">
        <h2 className="detail-section-title">{t('detail.specs')}</h2>
        <table className="specs-table">
          <tbody>
            <tr><td>{t('detail.developer')}</td><td>{os.developer}</td></tr>
            <tr><td>{t('detail.release_year')}</td><td>{os.releaseYear}</td></tr>
            <tr><td>{t('detail.eol')}</td><td>{os.endOfLife ?? t('common.active')}</td></tr>
            <tr><td>{t('detail.status')}</td><td>{os.status}</td></tr>
            <tr><td>{t('detail.kernel')}</td><td>{os.kernel}</td></tr>
            <tr><td>{t('detail.architecture')}</td><td>{os.architecture}</td></tr>
            <tr><td>{t('detail.filesystem')}</td><td>{os.fileSystem || t('common.n_a')}</td></tr>
            <tr><td>{t('detail.browser')}</td><td>{os.defaultBrowser || t('common.n_a')}</td></tr>
            {os.systemRequirements && (
              <>
                <tr><td>{t('compare.ram')}</td><td>{os.systemRequirements.ram || t('common.n_a')}</td></tr>
                <tr><td>{t('compare.cpu')}</td><td>{os.systemRequirements.cpu || t('common.n_a')}</td></tr>
                <tr><td>{t('compare.storage')}</td><td>{os.systemRequirements.storage || t('common.n_a')}</td></tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Editions ── */}
      {os.editions && os.editions.length > 0 && (
        <div className="detail-section">
          <h2 className="detail-section-title">{t('detail.editions')}</h2>
          <div className="editions-list">
            {os.editions.map(ed => (
              <span key={ed} className="edition-badge">{ed}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── Predecessor / Successor ── */}
      {(predecessorOS || successorOS) && (
        <div className="detail-section">
          <h2 className="detail-section-title">{t('detail.predecessor')} / {t('detail.successor')}</h2>
          <div className="related-os-links">
            {predecessorOS && (
              <Link to={`/os/${predecessorOS.id}`} className="related-os-link">
                <span className="related-label">← {t('detail.predecessor')}</span>
                <span className="related-name">{predecessorOS.name}</span>
              </Link>
            )}
            {successorOS && (
              <Link to={`/os/${successorOS.id}`} className="related-os-link">
                <span className="related-label">{t('detail.successor')} →</span>
                <span className="related-name">{successorOS.name}</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ── Boot / Launch Experience ── */}
      <div className="detail-section">
        <h2 className="detail-section-title">{t('detail.boot')}</h2>
        <div className={`boot-placeholder ${isOpenSource ? 'boot-placeholder-opensource' : ''}`}>
          <Play size={40} style={{ color: 'var(--text-silver)' }} />
          <p className="boot-text">
            {isOpenSource ? t('detail.emulator_opensource') : t('detail.emulator_unavailable') + ' — ' + t('detail.emulator_description')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OSDetail;
