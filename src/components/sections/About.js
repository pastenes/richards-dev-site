import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Jumplinks from '../common/Jumplinks';
import BlockContent from '../common/BlockContent';

export default function About() {
  const data = useStaticQuery(graphql`
  query aboutQuery {
    sanityAbout {
      _rawContent(resolveReferences: {maxDepth: 5})
      tags {
        value
      }
    }
  }
  `);
  const about = data.sanityAbout;
  const tags = about.tags.map(tag => tag.value);

  return (
    <>
      <Jumplinks />
      <section id='about' className="relative">
        <div className="container max-w-4xl h-full">
          <h2 className="text-3xl text-right text-light">About Me</h2>
          <p className="text-light text-right">And the tech I use</p>
          <div className="flex flex-col justify-between items-center h-full lg:flex-row">
            <div className="text-muted py-14 basis-1/2">
              <BlockContent blocks={about._rawContent} />
            </div>
            <div className="basis-1/2 lg:basis-1/4">
              <h3 className='text-light mb-6'>A few technologies I'm familiar with:</h3>
              <ul className='text-green text-tiny font-fira-code grid grid-cols-2'>
                {tags.map(tag => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
