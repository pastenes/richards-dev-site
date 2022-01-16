import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import BlockContent from './BlockContent';

export default function Work() {
  const data = useStaticQuery(graphql`
    query workQuery {
      allSanityProject {
        nodes {
          id
          title
          projectUrl
          tags {
            label
          }
          _rawDescription(resolveReferences: {maxDepth: 5})
          screenshot {
            asset {
              gatsbyImageData(width: 1000, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
            }
            alt
          }
        }
      }
    }
  `);
  const projects = data.allSanityProject.nodes;

  return (
    <section className="bg-darker h-screen w-screen">
      <div className="container">
        <h2 className="text-3xl text-right text-light">Work</h2>
        <p className="text-light text-right">Some thigs I've built</p>

        {projects.map((project, index) => {
          let side = index % 2 === 0 ? true : false;
          return (  
            <div className={`flex flex-col items-center py-14 mt-10 relative ${side ? 'lg:flex-row' : 'lg:flex-row-reverse'}`} key={project.id}>
              <div className="w-full lg:w-1/2">
                <a href={project.projectUrl} target="_blank" rel="noreferrer">
                <GatsbyImage
                    image={project.screenshot.asset.gatsbyImageData}
                    alt={project.screenshot.alt}
                    layout="constrained"
                    width={1000}
                    loading="lazy"
                    className="grayscale hover:grayscale-0 brightness-75 hover:brightness-100 transition ease-in-out duration-250"
                  />
                </a>
              </div>
              <div className="h-full w-full p-10 flex flex-col justify-center bg-dark bg-opacity-75 z-10 absolute lg:w-1/2 lg:relative lg:h-auto lg:bg-dark/0 lg:p-0 lg:block">
                <h3 className={`text-light text-left ${side ? 'lg:text-right' : 'lg:text-left'} mb-0 lg:mb-4`}>{project.title}</h3>
                <div className={`bg-transparent lg:bg-dark ${side ? 'lg:-ml-20 mr-0' : 'lg:-mr-20 ml-0'} lg:drop-shadow-lg`}>
                  <div className={`text-muted px-0 lg:px-8 py-6 text-left ${side ? 'lg:text-right' : 'lg:text-left'}`}>
                    <BlockContent blocks={project._rawDescription} />
                  </div>
                </div>
                <ul className="text-light font-fira-code flex">
                  {project.tags.map(tag => (
                    <li className={`text-green mr-auto ${side ? 'lg:ml-auto lg:mr-0' : 'lg:mr-auto lg:ml-0'} lg:mt-4`} key={tag.label}>{tag.label}</li>
                  ))}
                </ul>
              </div>
            </div>
          )})}

      </div>
    </section>
  );
}
