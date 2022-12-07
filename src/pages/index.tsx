import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Layout from '../components/common/Layout';
import Seo from '../components/common/Seo';
import Header from '../components/sections/Header';
import About from '../components/sections/About';
import Work from '../components/sections/Work';

type DataProps = {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      metaImage: string;
    };
  };
};

const Page = ({ data: { site } }: PageProps<DataProps>) => (
  <Layout>
    <Seo
      description={site.siteMetadata.description}
      title={site.siteMetadata.title}
      canonical={site.siteMetadata.siteUrl}
    />
    <Header />
    <About />
    <Work />
  </Layout>
);

export default Page;

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
        siteUrl
        metaImage
      }
    }
  }
`;
