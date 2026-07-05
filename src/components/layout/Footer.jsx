import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Code, Terminal, Heart } from 'lucide-react';
import './Footer.css';

const EXPLORE_LINKS = [['/', 'Home'], ['/timeline', 'Timeline'], ['/library', 'OS Library'], ['/compare', 'Compare']];
const MUSEUM_LINKS  = [['/gallery', 'Gallery'], ['/sounds', 'Sound Gallery'], ['/museum', '3D Museum'], ['/favorites', 'Favorites']];
const MORE_LINKS    = [['/easter-eggs', 'Easter Eggs'], ['/about', 'About']];

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-top">
      {/* Brand */}
      <div className="footer-brand">
        <Link to="/" className="footer-brand-logo">
          <span className="footer-brand-mark">
            <Layers size={16} color="#FBFAF7" />
          </span>
          <span className="footer-brand-name">OS Museum</span>
        </Link>
        <p className="footer-brand-desc">
          A curated archive of operating systems history — from the earliest
          terminals to modern platforms.
        </p>
        <div className="footer-social">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Code size={17} /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><Terminal size={17} /></a>
        </div>
      </div>

      {/* Explore */}
      <div>
        <p className="footer-col-title">Explore</p>
        <nav className="footer-col-links">
          {EXPLORE_LINKS.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
        </nav>
      </div>

      {/* Museum */}
      <div>
        <p className="footer-col-title">Museum</p>
        <nav className="footer-col-links">
          {MUSEUM_LINKS.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
        </nav>
      </div>

      {/* More */}
      <div>
        <p className="footer-col-title">More</p>
        <nav className="footer-col-links">
          {MORE_LINKS.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
        </nav>
      </div>
    </div>

    <div className="container footer-bottom">
      <p className="footer-copy">© {new Date().getFullYear()} OS Museum. All systems preserved.</p>
      <span className="footer-made">Built with <Heart size={13} fill="currentColor" /> React &amp; Framer Motion</span>
    </div>
  </footer>
);

export default Footer;
