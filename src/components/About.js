import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import BlockContent from './BlockContent';
import TagsCloud from './TagsCloud';


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
  const isSSR = typeof window === "undefined";
  const ClientSideOnlyLazy = React.lazy(() =>
    import("./TagsCloud")
  )
  return (
    <section className="bg-darker h-screen w-screen">
      <div className="container max-w-4xl h-full pb-36">
        <h2 className="text-3xl text-right text-light">About Me</h2>
        {/* <p className="text-light text-right">Some thigs I've built</p> */}
        <div className="flex flex-row justify-between items-center h-full">
          <div className="text-muted py-14 basis-1/2">
            <BlockContent blocks={about._rawContent} />
          </div>
          {!isSSR && (
            <React.Suspense fallback={<div />}>
              <ClientSideOnlyLazy tags={tags}/>
            </React.Suspense>
          )}
        </div>
      </div>
    </section>
  );
}
