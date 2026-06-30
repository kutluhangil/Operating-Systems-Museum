import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { getOSById } from '../data/osData';
import OSCard from '../components/ui/OSCard';
import './Favorites.css';

const Favorites = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const favoriteOS = favorites.map(getOSById).filter(Boolean);

  return (
    <div className="favorites-page container">
      <div className="page-header">
        <motion.h1 className="page-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {t('favorites.title')}
        </motion.h1>
        <p className="page-subtitle">{t('favorites.subtitle')}</p>
      </div>

      {favoriteOS.length === 0 ? (
        <div className="favorites-empty">
          <div className="favorites-empty-icon">
            <Heart size={64} />
          </div>
          <h2>{t('favorites.empty')}</h2>
          <p>{t('favorites.empty_desc')}</p>
        </div>
      ) : (
        <div className="os-grid">
          {favoriteOS.map((os, i) => (
            <motion.div
              key={os.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <OSCard os={os} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
