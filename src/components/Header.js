import React, { useState, useEffect, useRef } from 'react'
import BIRDS from 'vanta/dist/vanta.birds.min'
import { StaticImage } from "gatsby-plugin-image"
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";

const Header = () => {
  const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(BIRDS({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: '#c4c4c4',
        color1: 0x0,
        color2: '#ffffff',
        colorMode: "lerpGradient",
        birdSize: 0.60,
        wingSpan: 34.00,
        speedLimit: 4.00,
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  return (
      <section ref={myRef} className="bg-neutral h-screen w-screen flex flex-col lg:flex-row">
        <div className="flex-auto justify-items-center self-center w-3/4 lg:w-1/2 pt-14 px-0 pb-14 lg:p-14 ">
          <div className='max-w-md'>
            <h1 className="text-5xl">Richard Pastenes</h1>
            <p>I've been obsessed with figuring out how things work from a young age. From tinkering with my toys to getting in trouble for taking apart (and putting back together) pretty much every electronic in my childhood home, I was driven to pursue the analytical, yet creative, field of Software Developer.</p>

            {/* <p>I'm not just a coder who was born in the driest desert in the world-- I'm also an avid photographer, hiker, and adventure seeker. (I mean, who would move to a new country to marry the love of their life other than someone who loves adventure?) When I'm not busy transforming code into beautiful websites, you can find him hiking, fixing bikes, or taking photos.</p> */}

            <div className="flex justify-start my-8">
              <a className="text-white text-4xl pr-2" href='https://www.linkedin.com/in/richardpastenes/' target='_blank' rel="noreferrer">
                <FaLinkedin className='hover:drop-shadow-lg'/>
              </a>
              <a className="text-white text-4xl pr-2" href='https://github.com/pastenes' target='_blank' rel="noreferrer">
                <FaGithub className='hover:drop-shadow-lg'/>
              </a>
              <a className="text-white text-4xl pr-2" href='https://twitter.com/RichardPastenes' target='_blank' rel="noreferrer">
                <FaTwitter className='hover:drop-shadow-lg'/>
              </a>
            </div>
          </div>
        </div>
        <div className='max-w-xs self-end w-1/2 lg:justify-self-end'>
          <StaticImage 
            src="../images/richard-pastenes.png" 
            alt="Richard Pastnes being awesome"
            placeholder='tracedSVG'
            layout='constrained'
            width={380}
          />
        </div>
      </section>
  )
}
export default Header