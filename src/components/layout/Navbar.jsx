import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Search, Monitor, Heart } from 'lucide-react';
import SearchOverlay from '../ui/SearchOverlay';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cmd/Ctrl+K opens search
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
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en');
  };

  const navItem = (to, label) => (
    <NavLink to={to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
      {label}
    </NavLink>
  );

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <NavLink to="/" className="logo">
            <Monitor className="logo-icon" size={22} />
            <span>OS Museum</span>
          </NavLink>

          <div className="nav-links">
            {navItem('/', t('nav.home'))}
            {navItem('/timeline', t('nav.timeline'))}
            {navItem('/library', t('nav.os_library'))}
            {navItem('/compare', t('nav.compare'))}
            {navItem('/gallery', t('nav.gallery'))}
            {navItem('/museum', t('nav.museum'))}
            {navItem('/about', t('nav.about'))}
          </div>

          <div className="nav-controls">
            <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label={t('nav.search')}>
              <Search size={19} />
            </button>
            <NavLink to="/favorites" className="icon-btn" aria-label={t('nav.favorites')}>
              <Heart size={19} />
            </NavLink>
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button className="lang-btn" onClick={toggleLanguage}>
              {i18n.language}
            </button>
          </div>
        </div>
      </nav>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Navbar;
