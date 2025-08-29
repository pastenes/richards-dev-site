import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import BlockContent from "../common/BlockContent";

export default function Work() {
  const data = useStaticQuery(graphql`
    query workQuery {
      allSanityProject(sort: { orderRank: ASC }) {
        nodes {
          id
          title
          orderRank
          projectUrl
          tags {
            label
          }
          _rawDescription(resolveReferences: { maxDepth: 5 })
          screenshot {
            asset {
              gatsbyImageData(
                width: 1000
                placeholder: DOMINANT_COLOR
                formats: [AUTO, WEBP, AVIF]
              )
            }
            alt
          }
        }
      }
    }
  `);
  const projects = data.allSanityProject.nodes;

  return (
    <section id="work">
      <div className="container">
        <h2 className="text-right text-3xl text-light">Work</h2>
        <p className="text-right text-light">Some thigs I've built</p>

        {projects.map((project, index) => {
          const side = index % 2 === 0;
          return (
            <div
              className={`relative my-24 flex h-600 flex-col items-center first-of-type:mt-8 lg:my-48 lg:h-auto ${
                side ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
              key={project.id}
            >
              <div className="h-full w-full lg:w-1/2">
                <a href={project.projectUrl} target="_blank" rel="noreferrer">
                  <GatsbyImage
                    image={project.screenshot.asset.gatsbyImageData}
                    alt={project.screenshot.alt}
                    layout="constrained"
                    width={1000}
                    loading="lazy"
                    className="duration-250 h-full brightness-75 grayscale transition ease-in-out hover:brightness-100 hover:grayscale-0"
                  />
                </a>
              </div>
              <div className="absolute z-10 flex h-full w-full flex-col justify-center border-2 border-light border-opacity-50 bg-dark bg-opacity-75 px-6 lg:relative lg:block lg:h-auto lg:w-1/2 lg:border-0 lg:bg-dark/0 lg:p-0">
                <h3
                  className={`text-left text-light ${
                    side ? "lg:text-right" : "lg:text-left"
                  } mb-0 lg:mb-4`}
                >
                  {project.title}
                </h3>
                <div
                  className={`bg-transparent lg:bg-dark ${
                    side ? "mr-0 lg:-ml-20" : "ml-0 lg:-mr-20"
                  } lg:drop-shadow-lg`}
                >
                  <div
                    className={`px-0 py-6 text-left text-muted lg:px-8 ${
                      side ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <BlockContent blocks={project._rawDescription} />
                  </div>
                </div>
                <ul
                  className={`flex flex-wrap justify-start font-fira-code text-light ${
                    side ? "lg:justify-end" : "lg:justify-start"
                  }`}
                >
                  {project.tags.map((tag) => (
                    <li
                      className={`mt-2 pr-4 text-tiny text-green ${
                        side
                          ? "lg:justify-end lg:pl-4 lg:pr-0"
                          : "lg:justify-start lg:pr-4 lg:pl-0"
                      }`}
                      key={tag.label}
                    >
                      {tag.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
