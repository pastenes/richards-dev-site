import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import BlockContent from './BlockContent';

export default function About() {
  const data = useStaticQuery(graphql`
    query aboutQuery {
      sanityAbout {
        _rawContent(resolveReferences: {maxDepth: 5})
      }
    }
  `);
  const about = data.sanityAbout;

  return (
    <section className="bg-darker h-screen w-screen">
      <div className="container pb-36">
        <h2 className="text-3xl text-right text-light">About Me</h2>
        {/* <p className="text-light text-right">Some thigs I've built</p> */}
        <div className="flex flex-row">
          <div className="text-muted py-14 basis-1/2">
            <BlockContent blocks={about._rawContent} />
          </div>
          <div className="basis-1/2">
            <p className='text-green font-fira-code'>Tag cloud</p>
          </div>
        </div>
      </div>
    </section>
  );
}
