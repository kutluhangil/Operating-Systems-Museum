import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { osData } from '../data/osData';
import OSCard from '../components/ui/OSCard';
import './Library.css';

const Library = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOS = osData.filter(os => 
    os.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    os.developer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="library-page container">
      <div className="library-header">
        <motion.h1 
          className="library-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('nav.os_library')}
        </motion.h1>
      </div>

      <div className="library-controls">
        <input 
          type="text" 
          className="search-input" 
          placeholder={t('nav.search') + "..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <motion.div 
        className="os-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {filteredOS.map((os, index) => (
          <motion.div
            key={os.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <OSCard os={os} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Library;
