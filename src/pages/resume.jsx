import { graphql, useStaticQuery } from 'gatsby';
import React from 'react'
// import resumeFile from '../images/Re'

export default function Resume() {
  const { allFile } = useStaticQuery(graphql`
    query Resume {
    allFile(filter: {name: {eq: "Resume-Richard-Pastenes"}}) {
      nodes {
        name
        publicURL
    }
  }
}
`);

  return (
    <>
      <nav className="pdf-button text-green text-center fixed top-20 -mt-20 ml-14 lg:ml-nav z-20 bg-dark inline-flex flex-col p-3 font-fira-code">
        <a className='py-2' href={allFile.nodes[0].publicURL}>PDF</a>
      </nav>

    <div className='flex flex-col font-opensans font-light text-sm w-full h-full bg-white'>
      <header className='bg-gray flex flex-col pt-12 pb-8 items-center'>
        <h1 className='rh1 mb-0'>Richard Pastenes</h1>
        <h2 className='rh2'>Sr. Front-end Developer</h2>
        <ul className='flex gap-4 text-xs'>
          <li><span className='font-mono font-semibold'>p.</span>503.360.8735</li>
          <li><span className='font-mono font-semibold'>e.</span>richard@pastenes.com</li>
          <li><span className='font-mono font-semibold'>w.</span>richard.pastenes.dev</li>
        </ul>
      </header>
      <main className='container py-8'>
          <div className="md:grid md:gap-8 mx-6 md:grid-cols-3 md:mx-0">
          <div className="summary">
            <h3 className='rh3'>Summary</h3>
            <p className='mb-0'>I am an experienced front-end web developer with over a decade of experience. A born problem-solver, I have honed my troubleshooting skills and I’m passionate about learning and keeping up with dev related concepts and technologies. I highly respect and appreciate great design and there is nothing more rewarding to me than developing beautiful and functional web apps. I’m seeking to bring these strengths to a team developing cutting-edge web applications.</p>

            <h3 className='rh3'>Interests</h3>
            <ul>
              <li>Digital & Film Photography</li>
              <li>Outdoors & nature</li>
              <li>Rally racing</li>
              <li>Drone videography</li>
            </ul>

            <h3 className="rh3">Education</h3>
            <ul>
              <li>
                <h4 className="rh4">AAS in Web Design and Development</h4>
                <p className='mb-0'>2013</p>
                <p>Portland Community College</p>
              </li>
              <li>
                <h4 className="rh4">Bachelors in Electronic Engineering</h4>
                <p className='mb-0'>2003</p>
                <p>Technologic University of Chile</p>
              </li>
            </ul>
          </div>
          <div className="experience col-span-2">
            <h3 className="rh3">Experience</h3>
            <ul className='rexperience'>
              <li>
                <div className="flex justify-between">
                  <h4 className="rh4">Senior Technologist</h4>
                  <span className='rdate'>April 2022 - November 2022</span>
                </div>
                <h5 className="rh5">Matter Supply Co.</h5>
                <ul>
                  <li>Implemented web apps using modern technologies such as React, Next.js, GraphQl, Shopify Hydrogen, TypeScript</li>
                    <li>Provided maintenance for existing client's modern web apps</li>
                  <li>Took part on presenting and selecting the new API first CMS iof choice for the agency</li>
                  <li>Worked efficiently with a large team of PMs, Strategists & Technical Architectures, providing implementation estimates and maintaining fluid communication with the main goal of delivering a quality web application to the client within deadlines</li>
                </ul>
              </li>
              <li>
                <div className="flex justify-between">
                  <h4 className="rh4">Senior Software Developer</h4>
                  <span className='rdate'>February 2020 - April 2022</span>
                </div>
                <h5 className="rh5">ThinkShout</h5>
                <ul>
                  <li>Implemented heavily customized Drupal and WordPress sites</li>
                  <li>Introduced the concept of headless WordPress sites to the agency</li>
                  <li>Built & deployed the agency’s first Headless WordPress site with WPGraphQL, ACF, Gatsby/React & Gatsby Cloud</li>
                  <li>Provided code reviews to peers, insight on new Front-End related technologies to adopt</li>
                  <li>Collaborated on all React related projects, providing insight, code/code reviews, and implementing API’s</li>
                  <li>Worked on new site implementations as well as maintaining existing projects</li>
                </ul>
              </li>
              <li>
                <div className="flex justify-between">
                  <h4 className="rh4">Lead Web Developer</h4>
                  <span className='rdate'>August 2015 - February 2020</span>
                </div>
                <h5 className="rh5">Intuitive Digital</h5>
                <ul>
                  <li>Implemented headless WordPress sites using the WordPress REST API & GatsbyJS</li>
                  <li>Built several custom WordPress sites</li>
                  <li>Collaborated with third-party web designers</li>
                  <li>Worked with Account and Project Mangers to estimate development timelines, while collaborating with the SEO and PPC teams to ensure a seamless user experience</li>
                  <li>Analyzing code and configurations for bugs and inefficiencies</li>
                  <li>Managing and providing training to junior developers </li>
                  <li>Revamped agency-wide task management system and internal wiki</li>
                  <li>Improved client's sites maintenance processes and systems</li>
                  <li>Purchased and re-vamped web team’s staging hosting provider</li>
                  <li>Interfaced with clients to provide maintenance support</li>
                </ul>
              </li>
              <li>
                <div className="flex justify-between">
                  <h4 className="rh4">Web Developer</h4>
                  <span className='rdate'>June 2014 - August 2015</span>
                </div>
                <h5 className="rh5">Nia</h5>
                <ul>
                  <li>Implementedcustom WordPress sites</li>
                  <li>Added full responsiveness to existing legacy Drupal6 companysite</li>
                  <li>Collaborated with Sr. developer on existin Drupal site</li>
                </ul>
              </li>
              <li>
                <div className="flex justify-between">
                  <h4 className="rh4">Junior Web Developer</h4>
                  <span className='rdate'>July 2013 - March 2014</span>
                </div>
                <h5 className="rh5">Spot Color Marketing</h5>
                <ul>
                  <li>Developed custom WordPress sites</li>
                  <li>Collaborated with in-house web designer</li>
                  <li>Revamped agency client hosting services</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
          <div className="mx-6 md:mx-0">
          <h3 className="rh3">Skills</h3>
            <ul className='grid grid-cols-2 md:grid-cols-4'>
              <li>Alpine.js</li>
              <li>AWS</li>
              <li>Client Communication</li>
              <li>Command Line</li>
              <li>CSS Grid/Flexbox</li>
              <li>CSS/SASS</li>
            <li>ES6</li>
              <li>Gatsby Cloud</li>
            <li>GatsbyJS</li>
              <li>Git Flow</li>
              <li>Git/Github</li>
              <li>GraphQL</li>
            <li>JavaScript</li>
            <li>JSON</li>
              <li>MySQL/MariaDB</li>
            <li>Netlify</li>
              <li>Node</li>
              <li>PHP</li>
              <li>React</li>
            <li>Sanity.io</li>
            <li>SEO</li>
              <li>Styled Components</li>
              <li>Tailwind CSS</li>
              <li>Team Management</li>
              <li>Timber</li>
            <li>Timeline Management</li>
              <li>Vercel</li>
              <li>WordPress REST API</li>
          </ul>
        </div>
      </main>
      <footer className='bg-gray py-8'></footer>
    </div>
    </>
  )
}
