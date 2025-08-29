import type { GatsbyConfig } from 'gatsby';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: 'https://richard.pastenes.dev',
    title: "Richard's Dev Landing",
    description: "Richard Pastenes' personal web development website",
    metaImage: 'src/images/meta.png',
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: process.env.GATSBY_SANITY_DATASET_ID,
        token: process.env.GATSBY_SANITY_TOKEN,
        watchMode: process.env.NODE_ENV === 'development',
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-134461953-1',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/files/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'files',
        path: path.resolve('./src/files'),
      },
      __key: 'files',
    },
  ],
};

export default config;
