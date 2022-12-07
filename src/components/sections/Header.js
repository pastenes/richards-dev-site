import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import BIRDS from 'vanta/dist/vanta.birds.min';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';

export default function Header() {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      sanityHero {
        title
        intro {
          children {
            text
          }
        }
        links {
          github
          linkedin
          twitter
        }
        headshot {
          alt
          asset {
            gatsbyImageData(width: 380, placeholder: NONE, formats: [AUTO, AVIF])
          }
        }
      }
    }
  `);
  const hero = data.sanityHero;
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: '#c4c4c4',
          color1: 0x0,
          color2: '#ffffff',
          colorMode: 'lerpGradient',
          birdSize: 0.6,
          wingSpan: 34.0,
          speedLimit: 4.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <section ref={myRef} className="flex h-screen w-screen flex-col bg-neutral py-0 lg:flex-row">
      <div className="w-3/4 flex-auto px-0 pt-14 pb-14 lg:w-1/2 lg:self-center lg:p-14">
        <div className="max-w-md">
          <p className="mb-1 ml-1 font-fira-code">Hi, I'm</p>
          <h1 className="mb-1 text-5xl">{hero.title}</h1>
          <p>{hero.intro[0].children[0].text}</p>

          <div className="my-8 flex justify-start">
            <a
              className="pr-2 text-2xl text-black"
              href={`https://www.linkedin.com/in/${hero.links.linkedin}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="hover:drop-shadow-lg" />
            </a>
            <a
              className="pr-2 text-2xl text-black"
              href={`https://github.com/${hero.links.github}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="hover:drop-shadow-lg" />
            </a>
            <a
              className="pr-2 text-2xl text-black"
              href={`https://twitter.com/${hero.links.twitter}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter className="hover:drop-shadow-lg" />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-1/2 max-w-xs self-end lg:relative lg:justify-self-end">
        <GatsbyImage
          image={hero.headshot.asset.gatsbyImageData}
          alt={hero.headshot.alt}
          layout="constrained"
          width={380}
          loading="eager"
        />
      </div>
    </section>
  );
}
