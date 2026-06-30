import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { searchOS } from '../../data/osData';
import './SearchOverlay.css';

const SearchOverlay = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const results = query.trim().length > 1 ? searchOS(query) : [];

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          navigate(`/os/${results[selectedIndex].id}`);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, results, selectedIndex, navigate]);

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

          {results.map((os, index) => (
            <div
              key={os.id}
              className={`search-result-item ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => {
                navigate(`/os/${os.id}`);
                onClose();
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="search-result-icon">
                {os.icon && <img src={os.icon} alt={os.name} />}
              </div>
              <div style={{ flex: 1 }}>
                <div className="search-result-name">{os.name}</div>
                <div className="search-result-meta">{os.developer} · {os.releaseYear} · {os.category}</div>
              </div>
              <ArrowRight size={14} style={{ color: 'var(--t3)', flexShrink: 0 }} />
            </div>
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
