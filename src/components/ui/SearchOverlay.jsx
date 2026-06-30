import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { searchOS } from '../../data/osData';
import './SearchOverlay.css';

const SearchOverlay = ({ onClose }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const results = query.trim().length > 1 ? searchOS(query) : [];

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="search-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="search-box">
        {/* Input */}
        <div className="search-row">
          <Search className="search-row-icon" size={18} />
          <input
            ref={inputRef}
            className="search-input-global"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-esc" onClick={onClose}>ESC</button>
        </div>

        {/* Results */}
        <div className="search-results">
          {query.trim().length > 1 && results.length === 0 && (
            <div className="search-empty">
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>🔍</div>
              <div>{t('search.no_results')} "<strong>{query}</strong>"</div>
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
              <div style={{ flex: 1 }}>
                <div className="search-result-name">{os.name}</div>
                <div className="search-result-meta">{os.developer} · {os.releaseYear} · {os.category}</div>
              </div>
              <ArrowRight size={14} style={{ color: 'var(--t3)', flexShrink: 0 }} />
            </Link>
          ))}
        </div>

        {/* Footer hints */}
        <div className="search-footer">
          <span className="search-footer-hint"><kbd>↵</kbd> select</span>
          <span className="search-footer-hint"><kbd>↑↓</kbd> navigate</span>
          <span className="search-footer-hint"><kbd>ESC</kbd> close</span>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
