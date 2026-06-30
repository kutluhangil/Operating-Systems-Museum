import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Search, Monitor } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <NavLink to="/" className="logo">
          <Monitor className="logo-icon" size={24} />
          <span>OS Museum</span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/timeline" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            {t('nav.timeline')}
          </NavLink>
          <NavLink to="/library" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            {t('nav.os_library')}
          </NavLink>
          <NavLink to="/compare" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            {t('nav.compare')}
          </NavLink>
        </div>

        <div className="nav-controls">
          <button className="icon-btn" aria-label={t('nav.search')}>
            <Search size={20} />
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="lang-btn" onClick={toggleLanguage}>
            {i18n.language}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
