import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { osData } from '../data/osData';
import './Gallery.css';

// Build gallery items from OS data
const galleryItems = osData
  .filter(os => os.icon)
  .map(os => ({
    id: os.id,
    name: os.name,
    type: 'desktop',
    icon: os.icon,
    year: os.releaseYear,
    description: os.description,
    category: os.category,
    color: os.color || '#1a1a2e'
  }));

const Gallery = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const categories = ['all', ...new Set(galleryItems.map(i => i.category))];
  const visible = filter === 'all' ? galleryItems : galleryItems.filter(i => i.category === filter);

  return (
    <div className="gallery-page container">
      <div className="page-header">
        <motion.h1 className="page-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {t('gallery.title')}
        </motion.h1>
        <p className="page-subtitle">{t('gallery.subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="gallery-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat === 'all' ? t('gallery.filter_all') : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div className="gallery-grid" layout>
        <AnimatePresence>
          {visible.map((item, i) => (
            <motion.div
              key={item.id}
              className="gallery-item"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelected(item)}
              style={{ background: item.color }}
            >
              <div className="gallery-item-inner">
                <img src={item.icon} alt={item.name} style={{ maxWidth: '80px', maxHeight: '80px', objectFit: 'contain' }} />
              </div>
              <div className="gallery-item-overlay">
                <div className="gallery-item-name">{item.name}</div>
                <div className="gallery-item-type">{item.year} · {item.category}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={selected.icon} alt={selected.name} className="lightbox-icon" />
              <h2 className="lightbox-title">{selected.name} ({selected.year})</h2>
              <p className="lightbox-desc">{selected.description}</p>
            </motion.div>
            <button className="lightbox-close" onClick={() => setSelected(null)}>
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
