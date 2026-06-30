import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { osData } from '../data/osData';
import './Timeline.css';

const Timeline = () => {
  const { t } = useTranslation();
  
  // Sort OS data by release year
  const sortedOS = [...osData].sort((a, b) => a.releaseYear - b.releaseYear);

  return (
    <div className="timeline-page container">
      <div className="timeline-header">
        <motion.h1 
          className="timeline-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('nav.timeline')}
        </motion.h1>
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>
        {sortedOS.map((os, index) => (
          <motion.div 
            className="timeline-item" 
            key={os.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="timeline-node"></div>
            <div className="timeline-content">
              <div className="timeline-year">{os.releaseYear}</div>
              <h3 className="timeline-os-name">{os.name}</h3>
              <p className="timeline-os-desc">{os.description}</p>
              <Link to={`/os/${os.id}`} style={{ display: 'inline-block', marginTop: '16px', color: 'var(--text-soft-white)', fontWeight: '500', textDecoration: 'underline' }}>
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
