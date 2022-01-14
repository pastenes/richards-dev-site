import React from 'react';

const Layout = ({ children }) => (
  <div>
    {/* <Header siteTitle={title} /> */}
    <main>{children}</main>
    {/* <Footer /> */}
  </div>
);

export default Layout;
