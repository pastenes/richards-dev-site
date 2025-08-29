import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Jumplinks from "../common/Jumplinks";
import BlockContent from "../common/BlockContent";
import TechTags from "../common/TechTags";

export default function About() {
  const data = useStaticQuery(graphql`
    query aboutQuery {
      sanityAbout {
        _rawContent(resolveReferences: { maxDepth: 5 })
        tags {
          value
        }
      }
    }
  `);
  const about = data.sanityAbout;
  const tags = about.tags.map((tag) => tag.value).sort();

  return (
    <>
      <Jumplinks />
      <section id="about" className="relative">
        <div className="container h-full max-w-4xl">
          <h2 className="text-right text-3xl text-light">About Me</h2>
          <p className="text-right text-light">And the tech I use</p>
          <div className="flex h-full flex-col items-center justify-between lg:flex-row">
            <div className="basis-1/2 py-14 text-muted">
              <BlockContent blocks={about._rawContent} />
            </div>
            <TechTags tags={tags} />
          </div>
        </div>
      </section>
    </>
  );
}
