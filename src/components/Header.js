import React, { useState, useEffect, useRef } from 'react'
import BIRDS from 'vanta/dist/vanta.birds.min'
import { StaticImage } from "gatsby-plugin-image"

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
      <section ref={myRef} className="bg-neutral h-screen w-screen flex">
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