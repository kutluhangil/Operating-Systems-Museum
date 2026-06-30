import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Sun, Moon, Heart, Layers } from 'lucide-react';
import SearchOverlay from '../ui/SearchOverlay';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en');

  const link = (to, label) => (
    <NavLink to={to} end={to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
      {label}
    </NavLink>
  );

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          {/* Logo */}
          <NavLink to="/" className="nav-logo">
            <div className="nav-logo-mark">
              <Layers size={16} />
            </div>
            <span className="nav-logo-text">OS <span>Museum</span></span>
          </NavLink>

          {/* Center nav */}
          <div className="nav-links">
            {link('/', t('nav.home'))}
            {link('/timeline', t('nav.timeline'))}
            {link('/library', t('nav.os_library'))}
            {link('/compare', t('nav.compare'))}
            {link('/gallery', t('nav.gallery'))}
            {link('/museum', t('nav.museum'))}
            {link('/about', t('nav.about'))}
          </div>

          {/* Right actions */}
          <div className="nav-actions">
            <button className="nav-search-hint" onClick={() => setSearchOpen(true)}>
              <Search size={14} />
              <span className="nav-search-label">{t('nav.search')}</span>
              <span className="nav-kbd">⌘K</span>
            </button>

            <NavLink to="/favorites" className={({ isActive }) => `btn-icon${isActive ? ' active' : ''}`} aria-label={t('nav.favorites')}>
              <Heart size={16} />
            </NavLink>

            <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button className="nav-lang" onClick={toggleLang}>
              {i18n.language === 'en' ? 'TR' : 'EN'}
            </button>
          </div>
        </div>
      </nav>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Navbar;
