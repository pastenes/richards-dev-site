import { graphql, useStaticQuery } from 'gatsby';
import React from 'react'

export default function Resume() {
  const {
    allFile, sanityResume } = useStaticQuery(graphql`
    query Resume {
      allFile(filter: {name: {eq: "Resume-Richard-Pastenes"}}) {
        nodes {
          name
          publicURL
        }
      }
      sanityResume {
        # Header section
        name
        jobTitle
        phone
        email
        portfolioUrl

        # Summary section
        summary
        interests
        education {
          _key
          degree
          school
          year
        }

        # Experience section
        experience {
          _key
          role
          employer
          start(formatString: "MMMM, YYYY")
          end(formatString: "MMMM, YYYY")
          achievment {
            _key
            achievment
          }
        }

        # Skills section
        skills {
          value
        }
      }
    }
`);

  const skills = (sanityResume.skills.map(skill => skill.value)).sort();
  console.log('%cresume.jsx line:54 skills', 'color: #007acc;', skills);
  return (
    <>
      <nav className="pdf-button text-green text-center fixed top-20 -mt-20 ml-14 lg:ml-nav z-20 bg-dark inline-flex flex-col p-3 font-fira-code">
        <a className='py-2' href={allFile.nodes[0].publicURL}>PDF</a>
      </nav>

      <div className='flex flex-col font-opensans font-light text-sm w-full h-full bg-white'>
        <header className='bg-gray flex flex-col pt-12 pb-8 items-center'>
          <h1 className='rh1 mb-0'>{sanityResume.name}</h1>
          <h2 className='rh2'>{sanityResume.jobTitle}</h2>
          <ul className='flex gap-4 text-xs'>
            <li><span className='font-mono font-semibold'>p.</span>{sanityResume.phone}</li>
            <li><span className='font-mono font-semibold'>e.</span>{sanityResume.email}</li>
            <li><span className='font-mono font-semibold'>w.</span>{sanityResume.portfolioUrl.replace(/^https?:\/\//, '')}</li>
          </ul>
        </header>
        <main className='container py-8'>
          <div className="print:grid print:gap-8 print:grid-cols-3 print:mx-0 md:grid md:gap-8 mx-6 md:grid-cols-3 md:mx-0">
            <div className="summary">
              <h3 className='rh3'>Summary</h3>
              <p className='mb-0'>{sanityResume.summary}</p>

              <h3 className='rh3'>Interests</h3>
              <ul>
                {sanityResume.interests.map(interest => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>

              <h3 className="rh3">Education</h3>
              <ul>
                {sanityResume.education.map(item => (
                  <li key={item._key}>
                    <h4 className="rh4">{item.degree}</h4>
                    <p className='mb-0'>{item.year}</p>
                    <p>{item.school}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="experience col-span-2">
              <h3 className="rh3">Experience</h3>
              <ul className='rexperience'>
                {sanityResume.experience.map(item => (
                  <li key={item._key}>
                    <div className="flex justify-between">
                      <h4 className="rh4">{item.role}</h4>
                      <span className='rdate'>{`${item.start} - ${item.end}`}</span>
                    </div>
                    <h5 className="rh5">{item.employer}</h5>
                    <ul>
                      {item.achievment.map(piece => (
                        <li key={piece._key}>{piece.achievment}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mx-6 md:mx-0">
            <h3 className="rh3">Skills</h3>
            <ul className='grid grid-cols-2 print:grid-cols-4 md:grid-cols-4'>
              {skills.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </main>
        <footer className='bg-gray py-8'></footer>
      </div>
    </>
  )
}
