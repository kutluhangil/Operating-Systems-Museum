import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { osData, getOSById } from '../data/osData';
import './Compare.css';

const ROWS = [
  ['developer', 'compare.developer'],
  ['category', 'compare.category'],
  ['kernel', 'compare.kernel'],
  ['architecture', 'compare.architecture'],
  ['fileSystem', 'compare.filesystem'],
  ['releaseYear', 'compare.release'],
  ['endOfLife', 'compare.eol'],
  ['status', 'compare.status'],
  ['defaultBrowser', 'compare.browser'],
];

const SPEC_ROWS = [
  [os => os.systemRequirements?.ram, 'compare.ram'],
  [os => os.systemRequirements?.cpu, 'compare.cpu'],
  [os => os.systemRequirements?.storage, 'compare.storage'],
];

const Compare = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState([null, null, null]);

  const setOS = (idx, id) => {
    setSelected(prev => {
      const next = [...prev];
      next[idx] = id || null;
      return next;
    });
  };

  const activeOS = selected.map(id => id ? getOSById(id) : null);
  const hasAny = activeOS.some(Boolean);

  const renderCell = (os, key) => {
    if (!os) return <td key="empty">—</td>;
    let val;
    if (typeof key === 'function') val = key(os);
    else val = os[key];
    return <td key={os.id}>{val || t('common.n_a')}</td>;
  };

  return (
    <div className="compare-page container">
      <div className="page-header">
        <motion.h1 className="page-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {t('compare.title')}
        </motion.h1>
        <p className="page-subtitle">{t('compare.subtitle')}</p>
      </div>

      {/* Selectors */}
      <div className="compare-selectors">
        {[0, 1, 2].map(idx => (
          <div className="compare-selector" key={idx}>
            <label>{t('compare.add_os')} {idx + 1}</label>
            <select
              className="compare-select"
              value={selected[idx] || ''}
              onChange={e => setOS(idx, e.target.value)}
            >
              <option value="">{t('compare.placeholder')}</option>
              {osData.map(os => (
                <option key={os.id} value={os.id}>{os.name} ({os.releaseYear})</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {hasAny ? (
        <motion.div className="compare-table-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th>{t('nav.compare')}</th>
                {activeOS.map((os, i) => (
                  <th key={i}>
                    {os ? (
                      <div className="compare-os-header">
                        <div className="compare-os-icon">
                          {os.icon && <img src={os.icon} alt={os.name} />}
                        </div>
                        <span>{os.name}</span>
                      </div>
                    ) : '—'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([key, labelKey]) => (
                <tr key={key}>
                  <td>{t(labelKey)}</td>
                  {activeOS.map((os, i) => (
                    <td key={i}>{os ? (os[key] ?? t('common.n_a')) : '—'}</td>
                  ))}
                </tr>
              ))}
              {SPEC_ROWS.map(([fn, labelKey]) => (
                <tr key={labelKey}>
                  <td>{t(labelKey)}</td>
                  {activeOS.map((os, i) => (
                    <td key={i}>{os ? (fn(os) ?? t('common.n_a')) : '—'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <div className="compare-empty">
          <p style={{ fontSize: '1.1rem' }}>{t('compare.no_selection')}</p>
        </div>
      )}
    </div>
  );
};

export default Compare;
