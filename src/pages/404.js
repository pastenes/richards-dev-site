import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/common/Layout';

const NotFoundPage = () => (
  <Layout>
    <section className="relative">
      <div className="container h-full max-w-4xl">
        <h2 className="text-right text-3xl text-light">Nope</h2>
        <p className="text-right text-light">You made this up, this page doesn't exist</p>
        <div className="flex h-full items-center">
          <div className="py-20 text-center font-mono text-6xl text-green hover:underline active:underline">
            <Link to="/">
              &#62; go back home <span className="blink">▐</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;
