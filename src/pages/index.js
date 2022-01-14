import React from 'react'
import { FullPage, Slide } from 'react-full-page';
import Layout from '../components/Layout'
// import Seo from '../components/Seo'
// import { Helmet } from 'react-helmet'
import Header from '../components/Header'

const Page = () => {
  return (
    <Layout>
      {/* <Seo description={pageData.seo.metaDesc} title={pageData.seo.title} canonical={pageData.seo.canonical}/> */}
      {/* <Helmet bodyAttributes={{ class: `page ${bodyTag}` }} /> */}
      <FullPage controls={false} scrollMode='normal'>
        <Slide>
          <Header />
        </Slide>
      </FullPage>
    </Layout>
  )
}
export default Page