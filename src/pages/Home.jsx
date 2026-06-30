import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="home-hero">
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <motion.div 
          className="float-item" 
          style={{ top: '20%', left: '15%' }}
          variants={floatingVariants}
          animate="animate"
        >
          <Layers size={32} />
        </motion.div>
        <motion.div 
          className="float-item" 
          style={{ top: '60%', right: '15%' }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        >
          <Monitor size={48} />
        </motion.div>
      </div>

      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('home.title')}
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('home.subtitle')}
        </motion.p>
        
        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to="/timeline" className="btn btn-primary">
            {t('home.explore_timeline')} <ArrowRight size={18} />
          </Link>
          <Link to="/library" className="btn btn-secondary">
            {t('home.browse_systems')} <Layers size={18} />
          </Link>
          <button className="btn btn-secondary">
            {t('home.launch_experience')} <Play size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// Simple Monitor icon component since I forgot to import it from lucide-react above
const Monitor = ({size}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

export default Home;
