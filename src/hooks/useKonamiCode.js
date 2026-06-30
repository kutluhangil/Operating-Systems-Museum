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
  const [inputSequence, setInputSequence] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      setInputSequence(prev => {
        const nextSequence = [...prev, key].slice(-KONAMI_CODE.length);
        
        if (nextSequence.join('').toLowerCase() === KONAMI_CODE.join('').toLowerCase()) {
          setSuccess(true);
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

  return { success, reset };
}
