require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
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
        watchMode: process.env.GATSBY_SANITY_WATCH_MODE,
      },
    },
    'gatsby-plugin-sass',
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
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
  ],
};
