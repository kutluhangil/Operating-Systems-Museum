import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { osData } from '../data/osData';
import './Museum.css';

// Curated milestones for the Museum Mode story
const MILESTONES = [
  'ms-dos',
  'windows-95',
  'windows-xp',
  'macos-x',
  'ubuntu',
  'android',
  'ios',
  'windows-11',
];

const Museum = () => {
  const { t } = useTranslation();
  const exhibits = MILESTONES.map(id => osData.find(o => o.id === id)).filter(Boolean);

  return (
    <div className="museum-page">
      {/* Hero */}
      <section className="museum-hero">
        <div>
          <motion.h1
            className="museum-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            {t('museum.title')}
          </motion.h1>
          <motion.p
            className="museum-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {t('museum.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Exhibits */}
      <div className="museum-exhibits container">
        {exhibits.map((os, index) => (
          <motion.section
            key={os.id}
            className="museum-exhibit"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Info */}
            <div>
              <span className="exhibit-tag">⬤ {t('museum.milestone_tag')}</span>
              <div className="exhibit-year">{os.releaseYear}</div>
              <h2 className="exhibit-title">{os.name}</h2>
              <p className="exhibit-description">{os.description}</p>
              {os.interestingFacts && (
                <ul className="exhibit-facts">
                  {os.interestingFacts.slice(0, 3).map((fact, fi) => (
                    <li key={fi}>
                      <span className="fact-dot" />
                      {fact}
                    </li>
                  ))}
                </ul>
              )}
              <Link to={`/os/${os.id}`} className="btn btn-secondary" style={{ display: 'inline-flex' }}>
                {t('museum.explore_os')} <ArrowRight size={16} style={{ marginLeft: 6 }} />
              </Link>
            </div>

            {/* Visual */}
            <div className="exhibit-visual">
              <div
                className="exhibit-visual-card"
                style={{ background: os.color || '#111' }}
              >
                {os.icon && <img src={os.icon} alt={os.name} />}
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default Museum;
