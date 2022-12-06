import * as React from "react"
import { Link } from "gatsby"
import Layout from '../components/common/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <section className="relative">
        <div className="container max-w-4xl h-full">
          <h2 className="text-3xl text-right text-light">Nope</h2>
          <p className="text-light text-right">You made this up, this page doesn't exist</p>
          <div className="flex items-center h-full">
            <div className="font-mono text-green text-6xl text-center py-20 active:underline hover:underline">
              <Link to="/">&#62; go back home <span className="blink">▐</span></Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default NotFoundPage
