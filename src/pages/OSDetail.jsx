import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Cpu, HardDrive, Play } from 'lucide-react';
import { osData } from '../data/osData';
import { useTranslation } from 'react-i18next';
import './OSDetail.css';

const OSDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  
  const os = osData.find(o => o.id === id);

  if (!os) {
    return (
      <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
        <h2>Operating System not found</h2>
        <Link to="/library" className="btn btn-primary" style={{ marginTop: '24px' }}>
          <ArrowLeft size={16} /> Back to Library
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="os-detail-page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Link to="/library" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-silver)', marginBottom: '32px' }}>
        <ArrowLeft size={16} /> Back to Library
      </Link>

      <motion.div 
        className="os-detail-header"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="os-detail-icon-wrapper">
          {os.icon && <img src={os.icon} alt={os.name} className="os-detail-icon" />}
        </div>
        <div className="os-detail-info">
          <h1 className="os-detail-title">{os.name}</h1>
          <div className="os-detail-meta">
            <span className="meta-item"><Calendar size={16} /> {os.releaseYear}</span>
            <span className="meta-item"><Tag size={16} /> {os.developer}</span>
            <span className="meta-item"><Cpu size={16} /> {os.kernel}</span>
            <span className="meta-item"><HardDrive size={16} /> {os.architecture}</span>
          </div>
          <p className="os-detail-description">{os.description}</p>
          <div className="os-detail-actions">
            <button className="btn btn-primary">
              <Play size={18} /> Launch Experience
            </button>
          </div>
        </div>
      </motion.div>

      <div className="detail-section">
        <h2 className="detail-section-title">Boot Experience</h2>
        <div className="boot-placeholder">
          <Play size={48} style={{ color: 'var(--text-silver)', marginBottom: '16px' }} />
          <p style={{ color: 'var(--text-silver)' }}>Emulator starting...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default OSDetail;
