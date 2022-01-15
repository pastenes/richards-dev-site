import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

export default function Work() {
  // const data = useStaticQuery(graphql``);
  // const hero = data.sanityHero;

  return (
    <section className="bg-darker h-screen w-screen">
      <div className="container">
        <h2 className="text-3xl text-right text-light">Work</h2>
        <p className="text-light text-right">Some thigs I've built</p>
        <div className="flex flex-col items-center mt-10 lg:flex-row relative">
          <div className="w-full lg:w-1/2">
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
              <StaticImage
                src="../images/work/work-2.png"
                alt="el alt"
                layout="constrained"
                width={1000}
                loading="lazy"
                className="grayscale hover:grayscale-0 transition ease-in-out duration-250"
              />
            </a>
          </div>
          <div className="h-full w-full p-10 flex flex-col justify-center bg-dark bg-opacity-75 z-10 absolute lg:w-1/2 lg:relative lg:h-auto lg:bg-dark/0 lg:p-0 lg:block">
            <h3 className="text-light text-left lg:text-right mb-4">Project name</h3>
            <div className="bg-transparent lg:bg-dark lg:-ml-20 lg:drop-shadow-lg">
              <p className="text-muted px-0 lg:px-8 py-6 text-left lg:text-right">
                Project description Aute adipisicing sint irure deserunt proident elit qui cupidatat aliquip commodo
                ipsum est. Commodo do laboris anim reprehenderit nulla magna est velit tempor. Ad minim proident non
                commodo sint cillum do id ex laborum esse nostrud.
              </p>
            </div>
            <ul className="text-light font-fira-code flex justify-evenly">
              <li>WordPress</li>
              <li>ACF</li>
              <li>Gatsby</li>
              <li>React</li>
              <li>Sass</li>
            </ul>
          </div>
          {/* Add screenshot here for each project 
        Add description, tags and link to project here */}
        </div>
      </div>
    </section>
  );
}
