import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, LayoutGrid } from 'lucide-react';
import { osData } from '../data/osData';
import OSCard from '../components/ui/OSCard';
import './Library.css';

const CATEGORIES = ['All', 'Desktop', 'Mobile', 'DOS', 'Server', 'Experimental'];
const SORTS = [
  { value: 'year-desc', label: 'Newest First' },
  { value: 'year-asc',  label: 'Oldest First' },
  { value: 'name',      label: 'Name A–Z' },
  { value: 'pop',       label: 'Popularity' },
];

const Library = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [cat, setCat]       = useState('All');
  const [sort, setSort]     = useState('year-desc');

  // honour ?cat= from URL
  useEffect(() => {
    const c = searchParams.get('cat');
    if (c && CATEGORIES.includes(c)) setCat(c);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let data = [...osData];
    if (cat !== 'All') data = data.filter(o => o.category === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(o =>
        o.name.toLowerCase().includes(q) ||
        o.developer.toLowerCase().includes(q) ||
        (o.kernel || '').toLowerCase().includes(q) ||
        String(o.releaseYear).includes(q)
      );
    }
    if (sort === 'year-desc') data.sort((a, b) => b.releaseYear - a.releaseYear);
    else if (sort === 'year-asc') data.sort((a, b) => a.releaseYear - b.releaseYear);
    else if (sort === 'name') data.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'pop') data.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    return data;
  }, [search, cat, sort]);

  return (
    <div className="library-page container">
      {/* Header */}
      <motion.div
        className="lib-header"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.28, 0.11, 0.32, 1] }}
      >
        <div className="lib-eyebrow">
          <LayoutGrid size={12} /> {t('library.subtitle')}
        </div>
        <h1 className="lib-title">{t('library.title')}</h1>
        <p className="lib-subtitle">{osData.length} operating systems catalogued in the archive.</p>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="lib-controls"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="lib-search-wrap">
          <Search className="lib-search-icon" size={15} />
          <input
            type="text"
            className="lib-search"
            placeholder={t('library.search_placeholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="lib-filter-tabs">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`lib-tab${cat === c ? ' active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c === 'All' ? t('library.filter_all') : c}
            </button>
          ))}
        </div>

        <select className="lib-sort" value={sort} onChange={e => setSort(e.target.value)}>
          {SORTS.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <span className="lib-count mono">{filtered.length} / {osData.length}</span>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={`${cat}-${sort}-${search}`}
            className="os-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((os, i) => (
              <OSCard key={os.id} os={os} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="lib-empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🔍</div>
            <p>{t('library.no_results')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;
