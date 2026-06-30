import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './pages/Home';
import Library from './pages/Library';
import OSDetail from './pages/OSDetail';
import Timeline from './pages/Timeline';
import Compare from './pages/Compare';
import Gallery from './pages/Gallery';
import Museum from './pages/MuseumMode';
import Museum3D from './pages/Museum3D';
import About from './pages/About';
import Favorites from './pages/Favorites';
import { ThemeProvider } from './context/ThemeContext';
import { useKonamiCode } from './hooks/useKonamiCode';
import BSOD from './components/ui/BSOD';
import TerminalOverlay from './components/ui/TerminalOverlay';

function App() {
  const { success, dosSuccess, reset, resetDos } = useKonamiCode();

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          {success && <BSOD onClose={reset} />}
          {dosSuccess && <TerminalOverlay onClose={resetDos} />}
          <Layout>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/timeline"  element={<Timeline />} />
            <Route path="/library"   element={<Library />} />
            <Route path="/os/:id"    element={<OSDetail />} />
            <Route path="/compare"   element={<Compare />} />
            <Route path="/gallery"   element={<Gallery />} />
            <Route path="/museum"    element={<Museum />} />
            <Route path="/museum3d"  element={<Museum3D />} />
            <Route path="/about"     element={<About />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Layout>
      </Router>
    </FavoritesProvider>
  </ThemeProvider>
  );
}

export default App;
