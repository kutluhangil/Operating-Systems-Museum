import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchOS } from '../../data/osData';
import './SearchOverlay.css';

const SearchOverlay = ({ onClose }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const results = query.trim().length > 1 ? searchOS(query) : [];
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="search-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="search-box">
        <div className="search-input-row">
          <Search className="search-icon" size={22} />
          <input
            ref={inputRef}
            className="search-input-global"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-close-btn" onClick={onClose}>ESC</button>
        </div>
        <div className="search-results">
          {query.trim().length > 1 && results.length === 0 && (
            <div className="search-empty">
              <X size={32} style={{ marginBottom: 8, opacity: 0.4 }} />
              <div>{t('search.no_results')} "{query}"</div>
            </div>
          )}
          {results.map(os => (
            <Link
              key={os.id}
              to={`/os/${os.id}`}
              className="search-result-item"
              onClick={onClose}
            >
              <div className="search-result-icon">
                {os.icon && <img src={os.icon} alt={os.name} />}
              </div>
              <div>
                <div className="search-result-name">{os.name}</div>
                <div className="search-result-meta">{os.developer} · {os.releaseYear} · {os.category}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
