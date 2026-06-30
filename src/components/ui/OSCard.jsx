import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowUpRight, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../context/FavoritesContext';
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

  return (
    <div className="os-card card">
      {/* Color stripe */}
      <div className="os-card-stripe" style={{ background: os.color || 'var(--accent)' }} />

      <div className="os-card-body">
        {/* Top row */}
        <div className="os-card-top">
          <div className="os-card-icon">
            {os.icon
              ? <img src={os.icon} alt={os.name} loading="lazy" />
              : <span style={{ fontSize: 22 }}>💾</span>
            }
          </div>

          <div className="os-card-title-group">
            <h3 className="os-card-name">{os.name}</h3>
            <div className="os-card-meta">
              <span className="os-card-year mono">{os.releaseYear}</span>
              <span className={`badge ${statusVariant(os.status)}`}>{os.status}</span>
              <span className="badge badge-neutral">{os.category}</span>
            </div>
          </div>

          <button
            className={`os-card-fav${fav ? ' fav' : ''}`}
            onClick={() => toggle(os.id)}
            aria-label={fav ? t('os_card.remove_favorite') : t('os_card.add_favorite')}
          >
            <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Description */}
        <p className="os-card-desc">{os.description}</p>

        {/* Footer */}
        <div className="os-card-footer">
          <span className="os-card-developer">
            <Building2 size={12} />
            {os.developer}
          </span>
          <Link to={`/os/${os.id}`} className="os-card-link">
            {t('os_card.learn_more')} <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OSCard;
