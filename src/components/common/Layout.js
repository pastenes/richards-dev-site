import React from 'react';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div>
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
