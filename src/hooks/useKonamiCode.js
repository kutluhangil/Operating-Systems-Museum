import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export function useKonamiCode() {
  const [success, setSuccess] = useState(false);
  const [dosSuccess, setDosSuccess] = useState(false);
  const [inputSequence, setInputSequence] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture inputs if user is typing in a form field
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      const key = e.key;
      
      setInputSequence(prev => {
        // Keep a reasonable buffer length (max length of our longest code)
        const nextSequence = [...prev, key].slice(-10);
        
        const seqStr = nextSequence.join('').toLowerCase();
        
        if (seqStr.includes(KONAMI_CODE.join('').toLowerCase())) {
          setSuccess(true);
        }
        
        if (seqStr.includes('dos')) {
          setDosSuccess(true);
        }
        
        return nextSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const reset = () => {
    setSuccess(false);
    setInputSequence([]);
  };

  const resetDos = () => {
    setDosSuccess(false);
    setInputSequence([]);
  };

  return { success, dosSuccess, reset, resetDos };
}
