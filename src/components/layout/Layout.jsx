import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ paddingTop: 'var(--navbar-h)', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;
