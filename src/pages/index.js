import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Layout from '../components/common/Layout';
import Seo from '../components/common/Seo'
import Header from '../components/sections/Header';
import About from '../components/sections/About';
import Work from '../components/sections/Work';

const Page = () => {
  const data = useStaticQuery(graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        metaImage
      }
    }
  }
`)
  const site = data.site.siteMetadata;
  return (
    <Layout>
      <Seo description={site.description} title={site.title} canonical={site.siteUrl}/>
      <Header />
      <About />
      <Work />
    </Layout>
  )
};

export default Page;
