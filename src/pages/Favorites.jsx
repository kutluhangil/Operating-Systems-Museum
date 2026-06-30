import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { osData } from '../data/osData';
import OSCard from '../components/ui/OSCard';

const Favorites = () => {
  const { t } = useTranslation();
  const { favorites, clear } = useFavorites();
  const items = favorites.map(id => osData.find(o => o.id === id)).filter(Boolean);

  return (
    <div style={{ padding: 'var(--s6) 0 var(--s7)' }} className="container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 'var(--s5)' }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--rose)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
            <Heart size={12} style={{ display: 'inline', marginRight: 6 }} />
            {t('favorites.subtitle')}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1 }}>
            {t('favorites.title')}
          </h1>
        </div>
        {items.length > 0 && (
          <button onClick={clear} className="btn btn-ghost" style={{ border: '1px solid rgba(244,63,94,0.25)', color: 'var(--rose)', marginTop: 8 }}>
            {t('favorites.clear_all')}
          </button>
        )}
      </div>

      {items.length > 0 ? (
        <motion.div className="os-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {items.map((os, i) => (
            <motion.div key={os.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <OSCard os={os} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div style={{ textAlign: 'center', padding: '100px 24px', color: 'var(--t3)' }}>
          <Heart size={48} style={{ marginBottom: 24, opacity: 0.2 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginBottom: 12 }}>{t('favorites.empty_title')}</h2>
          <p style={{ color: 'var(--t2)', marginBottom: 32 }}>{t('favorites.empty_desc')}</p>
          <Link to="/library" className="btn btn-primary">
            {t('favorites.empty_cta')} <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
