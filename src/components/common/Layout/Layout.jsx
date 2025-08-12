// src/components/common/Layout/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Páginas que NÃO devem mostrar header/footer (dashboard e admin têm header próprio)
  const hideHeaderFooter = [
    '/dashboard',
    '/admin'
  ].some(path => location.pathname.startsWith(path));

  // Páginas que devem mostrar APENAS o header (sem footer)
  const headerOnly = [
    '/login',
    '/register'
  ].some(path => location.pathname.startsWith(path));

  if (hideHeaderFooter) {
    // Dashboard e admin sem header/footer (têm header próprio)
    return <>{children}</>;
  }

  if (headerOnly) {
    // Login e register com header mas sem footer
    return (
      <>
        <Header />
        <main>{children}</main>
      </>
    );
  }

  // Páginas normais com header e footer
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;