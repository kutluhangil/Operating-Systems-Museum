import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './About.css';

const TECH = ['React', 'Vite', 'Framer Motion', 'react-i18next', 'Lucide Icons', 'Vanilla CSS'];

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="about-page">
      <div className="about-hero">
        <motion.h1 className="page-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {t('about.title')}
        </motion.h1>
        <p className="page-subtitle">{t('about.subtitle')}</p>
      </div>
      <div className="about-content container">
        <motion.div className="about-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="about-section-title">{t('about.mission_title')}</h2>
          <p>{t('about.mission')}</p>
        </motion.div>
        <motion.div className="about-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="about-section-title">{t('about.built_title')}</h2>
          <div className="tech-stack">
            {TECH.map(tech => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
