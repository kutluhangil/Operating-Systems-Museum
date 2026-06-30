import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { osData } from '../../data/osData';
import { Calendar, ArrowRight } from 'lucide-react';
import './OnThisDay.css';

const OnThisDay = () => {
  const [todayOS, setTodayOS] = useState(null);
  const [isExactMatch, setIsExactMatch] = useState(false);

  useEffect(() => {
    const today = new Date();
    const m = today.getMonth() + 1;
    const d = today.getDate();

    // 1. Exact match
    let matches = osData.filter(os => {
      if (!os.releaseDate) return false;
      const parts = os.releaseDate.split('-');
      return parseInt(parts[1], 10) === m && parseInt(parts[2], 10) === d;
    });

    if (matches.length > 0) {
      setTodayOS(matches[Math.floor(Math.random() * matches.length)]);
      setIsExactMatch(true);
      return;
    }

    // 2. Same month match
    matches = osData.filter(os => {
      if (!os.releaseDate) return false;
      const parts = os.releaseDate.split('-');
      return parseInt(parts[1], 10) === m;
    });

    if (matches.length > 0) {
      setTodayOS(matches[Math.floor(Math.random() * matches.length)]);
      setIsExactMatch(false);
      return;
    }

    // 3. Fallback to a random OS with a releaseDate
    const allWithDate = osData.filter(os => os.releaseDate);
    if (allWithDate.length > 0) {
      setTodayOS(allWithDate[Math.floor(Math.random() * allWithDate.length)]);
      setIsExactMatch(false);
    } else {
      setTodayOS(osData[0]);
    }
  }, []);

  if (!todayOS) return null;

  const getDayText = () => {
    if (isExactMatch) return "On This Day";
    return "This Month in History";
  };

  const formatDate = (dateString) => {
    if (!dateString) return todayOS.releaseYear;
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <motion.div 
      className="on-this-day-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        '--os-color': todayOS.color || 'var(--accent)',
      }}
    >
      <div className="otd-bg-glow"></div>
      
      <div className="otd-header">
        <div className="otd-icon-wrap">
          <Calendar size={18} />
        </div>
        <div className="otd-title">
          <h4>{getDayText()}</h4>
          <span>{formatDate(todayOS.releaseDate)}</span>
        </div>
      </div>

      <div className="otd-body">
        <div className="otd-os-icon">
          {todayOS.icon ? <img src={todayOS.icon} alt={todayOS.name} /> : <span>💾</span>}
        </div>
        <div className="otd-os-info">
          <h3>{todayOS.name}</h3>
          <p>{todayOS.description.substring(0, 100)}...</p>
        </div>
      </div>

      <Link to={`/os/${todayOS.id}`} className="otd-footer btn btn-ghost">
        Explore {todayOS.name} <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
};

export default OnThisDay;
