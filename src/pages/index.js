import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import Layout from '../components/Layout';
// import Seo from '../components/Seo'
// import { Helmet } from 'react-helmet'
import Header from '../components/Header';
import About from '../components/About';
import Work from '../components/Work';

const Page = () => (
  <Layout>
    {/* <Seo description={pageData.seo.metaDesc} title={pageData.seo.title} canonical={pageData.seo.canonical}/> */}
    {/* <Helmet bodyAttributes={{ class: `page ${bodyTag}` }} /> */}
    <FullPage controls={false} scrollMode="normal">
      <Slide>
        <Header />
      </Slide>
      <Slide>
        <About />
      </Slide>
      <Slide>
        <Work />
      </Slide>
    </FullPage>
  </Layout>
);
export default Page;
