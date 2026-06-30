import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Library from './pages/Library';
import OSDetail from './pages/OSDetail';
import Timeline from './pages/Timeline';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/library" element={<Library />} />
          <Route path="/os/:id" element={<OSDetail />} />
          <Route path="/compare" element={<div className="container" style={{paddingTop: '2rem'}}><h1>Compare (Coming Soon)</h1></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
