import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { osData } from '../data/osData';
import OSCard from '../components/ui/OSCard';
import './Library.css';

const CATEGORIES = ['All', 'Desktop', 'Mobile', 'DOS', 'Server', 'Experimental'];
const SORTS = [
  { value: 'year-desc', label: 'Year (Newest)' },
  { value: 'year-asc',  label: 'Year (Oldest)' },
  { value: 'name',      label: 'Name A–Z' },
  { value: 'pop',       label: 'Popularity' },
];

const Library = () => {
  const { t } = useTranslation();
  const [search, setSearch]   = useState('');
  const [cat, setCat]         = useState('All');
  const [sort, setSort]       = useState('year-desc');

  const filtered = useMemo(() => {
    let data = [...osData];
    if (cat !== 'All') data = data.filter(o => o.category === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(o =>
        o.name.toLowerCase().includes(q) ||
        o.developer.toLowerCase().includes(q) ||
        o.kernel.toLowerCase().includes(q) ||
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
      <div className="lib-header">
        <div className="lib-eyebrow">{t('library.subtitle')}</div>
        <h1 className="lib-title">{t('library.title')}</h1>
        <p className="lib-subtitle">{t('home.stats_os', { count: osData.length })}</p>
      </div>

      {/* Controls */}
      <div className="lib-controls">
        {/* Search */}
        <div className="lib-search-wrap">
          <Search className="lib-search-icon" size={16} />
          <input
            type="text"
            className="lib-search"
            placeholder={t('library.search_placeholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Category filters */}
        <div className="lib-filter-tabs">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`lib-tab ${cat === c ? 'active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c === 'All' ? t('library.filter_all') : c}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select className="lib-sort" value={sort} onChange={e => setSort(e.target.value)}>
          {SORTS.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <span className="lib-count mono">{filtered.length} systems</span>
      </div>

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
              <motion.div
                key={os.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.5), duration: 0.4 }}
              >
                <OSCard os={os} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="lib-empty">
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔎</div>
            <p>{t('library.no_results')}</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;
