import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, Terminal, Info, ChevronRight, X } from 'lucide-react';
import './EasterEggs.css';

const EGGS = [
  {
    id: 'hall-of-souls',
    title: 'Hall of Tortured Souls',
    os: 'Windows 95 (Excel 95)',
    description: 'A hidden Doom-like 3D mini-game hidden inside Microsoft Excel 95, featuring the names and photos of the development team.',
    icon: '🏢',
    color: '#3b82f6',
    command: 'Scroll to row 95, select entire row, tab to column B, Help > About > Ctrl+Shift+Click Tech Support.',
  },
  {
    id: 'word-pinball',
    title: 'Word 97 Pinball',
    os: 'Windows 95/98 (Word 97)',
    description: 'Microsoft Word 97 included a fully playable Pinball game hidden deep within its About screen.',
    icon: '🎯',
    color: '#eab308',
    command: 'Type "Blue", select it, Format > Font > Bold > Blue. Type " " (space). Help > About > Ctrl+Shift+Click icon.',
  },
  {
    id: 'super-cow',
    title: 'Super Cow Powers',
    os: 'Debian / Ubuntu',
    description: 'Advanced Package Tool (APT) has a built-in easter egg that draws a cow using ASCII art when prompted.',
    icon: '🐄',
    color: '#a855f7',
    command: 'Open terminal and type: apt-get moo',
  },
  {
    id: 'macos-bsod',
    title: 'Windows BSOD Network Icon',
    os: 'macOS (OS X)',
    description: 'When viewing Windows computers on a local network in macOS, the icon used is an old CRT monitor displaying a Blue Screen of Death.',
    icon: '🖥️',
    color: '#ec4899',
    command: 'Open Finder > Network > Find a PC connected to your network.',
  },
  {
    id: 'android-flappy',
    title: 'Flappy Droid',
    os: 'Android 5.0 (Lollipop)',
    description: 'A hidden clone of the popular game Flappy Bird featuring the Android mascot, built into the Android system settings.',
    icon: '🤖',
    color: '#22c55e',
    command: 'Settings > About Phone > Tap Android Version repeatedly, then long press the logo.',
  }
];

const EasterEggs = () => {
  const [selectedEgg, setSelectedEgg] = useState(null);

  return (
    <div className="eggs-page container">
      <div className="eggs-hero">
        <div className="eggs-glitch-container">
          <Ghost size={48} className="eggs-ghost-icon" />
        </div>
        <h1 className="eggs-title">Secret Museum</h1>
        <p className="eggs-subtitle">
          Discover the hidden easter eggs left behind by developers in classic operating systems.
        </p>
      </div>

      <div className="eggs-grid">
        {EGGS.map((egg, index) => (
          <motion.div
            key={egg.id}
            className="egg-card"
            style={{ '--egg-color': egg.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedEgg(egg)}
          >
            <div className="egg-card-bg" />
            <div className="egg-icon-wrapper">
              <span className="egg-emoji">{egg.icon}</span>
            </div>
            <div className="egg-card-content">
              <span className="egg-os">{egg.os}</span>
              <h2 className="egg-card-title">{egg.title}</h2>
              <div className="egg-card-action">
                <span>Reveal Secret</span>
                <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedEgg && (
          <motion.div
            className="egg-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEgg(null)}
          >
            <motion.div
              className="egg-modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="egg-modal-close" onClick={() => setSelectedEgg(null)}>
                <X size={20} />
              </button>

              <div className="egg-modal-header" style={{ borderBottomColor: `${selectedEgg.color}44` }}>
                <div className="egg-modal-icon" style={{ background: `${selectedEgg.color}22`, color: selectedEgg.color }}>
                  <span style={{ fontSize: 32 }}>{selectedEgg.icon}</span>
                </div>
                <div>
                  <h3 className="egg-modal-title">{selectedEgg.title}</h3>
                  <span className="egg-modal-os">{selectedEgg.os}</span>
                </div>
              </div>

              <div className="egg-modal-body">
                <p className="egg-modal-desc">{selectedEgg.description}</p>
                
                <div className="egg-terminal">
                  <div className="egg-terminal-header">
                    <Terminal size={14} />
                    <span>How to trigger</span>
                  </div>
                  <div className="egg-terminal-content">
                    <span className="egg-terminal-prompt">$</span>
                    <span className="egg-terminal-cmd">{selectedEgg.command}</span>
                  </div>
                </div>

                <div className="egg-modal-info">
                  <Info size={14} />
                  <span>Some easter eggs may require specific legacy versions to work.</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EasterEggs;
