import React from 'react';
import Layout from '../components/common/Layout';
// import Seo from '../components/Seo'
// import { Helmet } from 'react-helmet'
import Header from '../components/sections/Header';
import About from '../components/sections/About';
import Work from '../components/sections/Work';

const Page = () => (
  <Layout>
    {/* <Seo description={pageData.seo.metaDesc} title={pageData.seo.title} canonical={pageData.seo.canonical}/> */}
    {/* <Helmet bodyAttributes={{ class: `page ${bodyTag}` }} /> */}
    <Header />
    <About />
    <Work />
  </Layout>
);
export default Page;
