import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import BlockContent from '../common/BlockContent';

export default function Work() {
  const data = useStaticQuery(graphql`
    query workQuery {
      allSanityProject(sort: {orderRank: ASC}) {
        nodes {
          id
          title
          orderRank
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
    <section id='work'>
      <div className="container">
        <h2 className="text-3xl text-right text-light">Work</h2>
        <p className="text-light text-right">Some thigs I've built</p>

        {projects.map((project, index) => {
          let side = index % 2 === 0 ? true : false;
          return (  
            <div className={`flex flex-col items-center h-600 my-24 first-of-type:mt-8 relative lg:my-48 lg:h-auto ${side ? 'lg:flex-row' : 'lg:flex-row-reverse'}`} key={project.id}>
              <div className="w-full h-full lg:w-1/2">
                <a href={project.projectUrl} target="_blank" rel="noreferrer">
                  <GatsbyImage
                    image={project.screenshot.asset.gatsbyImageData}
                    alt={project.screenshot.alt}
                    layout="constrained"
                    width={1000}
                    loading="lazy"
                    className="h-full grayscale hover:grayscale-0 brightness-75 hover:brightness-100 transition ease-in-out duration-250"
                  />
                </a>
              </div>
              <div className="h-full w-full px-6 flex flex-col justify-center bg-dark bg-opacity-75 border-light border-2 border-opacity-50 z-10 absolute lg:w-1/2 lg:relative lg:h-auto lg:bg-dark/0 lg:p-0 lg:block lg:border-0">
                <h3 className={`text-light text-left ${side ? 'lg:text-right' : 'lg:text-left'} mb-0 lg:mb-4`}>{project.title}</h3>
                <div className={`bg-transparent lg:bg-dark ${side ? 'lg:-ml-20 mr-0' : 'lg:-mr-20 ml-0'} lg:drop-shadow-lg`}>
                  <div className={`text-muted px-0 lg:px-8 py-6 text-left ${side ? 'lg:text-right' : 'lg:text-left'}`}>
                    <BlockContent blocks={project._rawDescription} />
                  </div>
                </div>
                <ul className={`text-light font-fira-code flex flex-wrap justify-start ${side ? 'lg:justify-end' :'lg:justify-start'}`}>
                  {project.tags.map(tag => (
                    <li 
                      className={`text-green text-tiny mt-2 pr-4 ${side ? 'lg:justify-end lg:pl-4 lg:pr-0' :'lg:justify-start lg:pr-4 lg:pl-0'}`} 
                      key={tag.label}>{tag.label}</li>
                  ))}
                </ul>
              </div>
            </div>
          )})}

      </div>
    </section>
  );
}
