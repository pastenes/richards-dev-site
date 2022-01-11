import React from 'react'
import { StaticImage } from "gatsby-plugin-image"

const Header = () => {
  return (
    <section className="bg-neutral h-screen w-screen flex">
      {/* TODO: add container with padding to entire site */}
      <div className="flex-auto justify-items-center self-center w-1/2 p-14 ">
        <div className='max-w-md'>
          <h1 className="text-5xl">Richard Pastenes</h1>
          <p>I've been obsessed with figuring out how things work from a young age. From tinkering with my toys to getting in trouble for taking apart (and putting back together) pretty much every electrinic in my childhood homo, I was driven to pursue the analytical, yet creative, field of Electronic Engineering. On top of having an Associates degree in Web design and Bachelors in Electronic Engineering, re-write this whole thing.</p>
        </div>
      </div>
      <div className='flex-auto self-end w-1/2'>
        <StaticImage 
          src="../images/richard-pastenes.png" 
          alt="Richard Pastnes being awesome"
          placeholder='tracedSVG'
          layout='fixed'
          width={380}
        />
      </div>
    </section>
  )
}
export default Header