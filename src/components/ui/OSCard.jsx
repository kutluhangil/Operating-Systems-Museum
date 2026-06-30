import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowUpRight, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../context/FavoritesContext';
import { motion } from 'framer-motion';
import './OSCard.css';

const statusVariant = (s = '') => {
  const l = s.toLowerCase();
  if (l.includes('active')) return 'badge-active';
  if (l.includes('alpha') || l.includes('beta')) return 'badge-alpha';
  return 'badge-disc';
};

const OSCard = ({ os }) => {
  const { t } = useTranslation();
  const { toggle, isFavorite } = useFavorites();
  const fav = isFavorite(os.id);
  const swatchColor = os.color || '#2c2c2e';

  return (
    <motion.div
      className="os-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
    >
      {/* Color swatch top area */}
      <div className="os-card-swatch">
        <div
          className="os-card-swatch-bg"
          style={{
            background: `radial-gradient(ellipse at 60% 40%, ${swatchColor} 0%, transparent 80%)`,
          }}
        />
      </div>

      {/* Floating icon */}
      <div className="os-card-icon-wrap">
        {os.icon
          ? <img src={os.icon} alt={os.name} loading="lazy" />
          : <span style={{ fontSize: 22 }}>💾</span>
        }
      </div>

      {/* Body */}
      <div className="os-card-body">
        <div className="os-card-meta-row">
          <div className="os-card-badges">
            <span className={`badge ${statusVariant(os.status)}`}>{os.status}</span>
            <span className="badge badge-neutral">{os.category}</span>
            <span className="badge badge-neutral mono">{os.releaseYear}</span>
          </div>
          <button
            className={`os-card-fav${fav ? ' fav' : ''}`}
            onClick={e => { e.preventDefault(); toggle(os.id); }}
            aria-label={fav ? t('os_card.remove_favorite') : t('os_card.add_favorite')}
          >
            <Heart size={14} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>

        <h3 className="os-card-name">{os.name}</h3>
        <p className="os-card-desc">{os.description}</p>

        <div className="os-card-footer">
          <span className="os-card-developer">
            <Building2 size={11} />
            {os.developer}
          </span>
          <Link to={`/os/${os.id}?boot=true`} className="os-card-link">
            {t('os_card.learn_more')} <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OSCard;
