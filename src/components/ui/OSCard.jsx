import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './OSCard.css';

const OSCard = ({ os }) => {
  const { t } = useTranslation();

  return (
    <div className="os-card">
      <div className="os-card-header">
        <div className="os-icon-wrapper">
          {os.icon ? (
            <img src={os.icon} alt={`${os.name} logo`} className="os-icon" />
          ) : (
            <div className="os-icon" />
          )}
        </div>
        <div>
          <h3 className="os-title">{os.name}</h3>
          <div className="os-meta">
            <span>{os.releaseYear}</span>
            <span>&bull;</span>
            <span>{os.developer}</span>
            <span className="os-category-badge">{os.category}</span>
          </div>
        </div>
      </div>
      
      <p className="os-description">{os.description}</p>
      
      <div className="os-card-actions">
        <Link to={`/os/${os.id}`} className="btn btn-secondary">
          <Info size={16} /> {t('os_card.learn_more')}
        </Link>
        <button className="btn btn-primary">
          <Play size={16} /> {t('os_card.launch')}
        </button>
      </div>
    </div>
  );
};

export default OSCard;
