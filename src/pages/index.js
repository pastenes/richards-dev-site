import React from 'react'
import Layout from '../components/Layout'
// import Seo from '../components/Seo'
// import { Helmet } from 'react-helmet'
import Header from '../components/Header'

const Page = () => {
  return (
    <Layout>
      {/* <Seo description={pageData.seo.metaDesc} title={pageData.seo.title} canonical={pageData.seo.canonical}/> */}
      {/* <Helmet bodyAttributes={{ class: `page ${bodyTag}` }} /> */}
      <Header />
    </Layout>
  )
}
export default Page