/* ── Favorites context ─────────────────────────────────────────── */
import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('osm-favorites') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('osm-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggle = (id) =>
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );

  const isFavorite = (id) => favorites.includes(id);
  const clear = () => setFavorites([]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite, clear }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
