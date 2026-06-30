import React, { useState, useEffect, useRef } from 'react';
import './TerminalOverlay.css';

const TerminalOverlay = ({ onClose }) => {
  const [lines, setLines] = useState([
    'OS Museum DOS Terminal [Version 1.0.0]',
    '(c) 2024 OS Museum. All rights reserved.',
    ''
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let newLines = [...lines, `C:\\> ${input}`];
      
      if (cmd === 'exit') {
        onClose();
        return;
      } else if (cmd === 'help') {
        newLines.push('Available commands:');
        newLines.push('  help   - Show this message');
        newLines.push('  dir    - List files (simulation)');
        newLines.push('  ver    - Show version');
        newLines.push('  date   - Show current date');
        newLines.push('  exit   - Close terminal');
      } else if (cmd === 'dir') {
        newLines.push(' Volume in drive C is MUSEUM');
        newLines.push(' Volume Serial Number is 1337-CODE');
        newLines.push(' Directory of C:\\');
        newLines.push('');
        newLines.push('01/01/1981  12:00 AM    <DIR>          DOS');
        newLines.push('08/24/1995  00:00 AM    <DIR>          WINDOWS');
        newLines.push('09/17/1991  12:00 AM    <DIR>          LINUX');
        newLines.push('10/23/2001  12:00 AM    <DIR>          IPOD');
        newLines.push('               0 File(s)              0 bytes');
        newLines.push('               4 Dir(s)   1,024,000,000 bytes free');
      } else if (cmd === 'ver') {
        newLines.push('OS Museum DOS Terminal [Version 1.0.0]');
      } else if (cmd === 'date') {
        newLines.push(`Current date is: ${new Date().toLocaleDateString()}`);
      } else if (cmd !== '') {
        newLines.push(`Bad command or file name: ${cmd}`);
      }
      
      newLines.push('');
      setLines(newLines);
      setInput('');
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-header">
          <span>Command Prompt</span>
          <button className="terminal-close" onClick={onClose}>×</button>
        </div>
        <div className="terminal-body" onClick={() => document.getElementById('terminal-input')?.focus()}>
          {lines.map((line, i) => (
            <div key={i} className="terminal-line">{line === '' ? <br/> : line}</div>
          ))}
          <div className="terminal-input-line">
            <span>C:\&gt;</span>
            <input 
              id="terminal-input"
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalOverlay;
