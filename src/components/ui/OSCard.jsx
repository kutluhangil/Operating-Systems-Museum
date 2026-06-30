import React from 'react';
import { Link } from 'react-router-dom';
import { Info, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../context/FavoritesContext';
import './OSCard.css';

const statusClass = (s) => {
  if (!s) return '';
  const l = s.toLowerCase();
  if (l.includes('active')) return 'active';
  if (l.includes('alpha') || l.includes('beta')) return 'alpha';
  return 'disc';
};

const OSCard = ({ os }) => {
  const { t } = useTranslation();
  const { toggle, isFavorite } = useFavorites();
  const fav = isFavorite(os.id);

  return (
    <div className="os-card">
      {/* Favorite */}
      <button
        className={`os-card-fav ${fav ? 'active' : ''}`}
        onClick={() => toggle(os.id)}
        aria-label={fav ? t('os_card.remove_favorite') : t('os_card.add_favorite')}
      >
        <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
      </button>

      {/* Header */}
      <div className="os-card-header">
        <div className="os-icon-wrapper">
          {os.icon
            ? <img src={os.icon} alt={`${os.name} logo`} className="os-icon" />
            : <span style={{ fontSize: 24 }}>💻</span>
          }
        </div>
        <div style={{ flex: 1 }}>
          <h3 className="os-title">{os.name}</h3>
          <div className="os-meta">
            <span>{os.releaseYear}</span>
            <span>&bull;</span>
            <span>{os.developer}</span>
            <span className="os-category-badge">{os.category}</span>
            <span className={`os-status-badge ${statusClass(os.status)}`}>{os.status}</span>
          </div>
        </div>
      </div>

      <p className="os-description">{os.description}</p>

      <div className="os-card-actions">
        <Link to={`/os/${os.id}`} className="btn btn-secondary">
          <Info size={15} /> {t('os_card.learn_more')}
        </Link>
      </div>
    </div>
  );
};

export default OSCard;
