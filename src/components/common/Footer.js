import React from 'react'
import { Link } from 'gatsby'
import { SlSocialGithub, SlSocialLinkedin, SlSocialTwitter } from 'react-icons/sl'

export default function Footer() {
  return (
    <footer className='py-24 flex flex-col items-center text-muted font-mono'>
      <div className="text-xs pb-2">Built by Richard Pastenes</div>
      <div className="flex gap-2">
        <Link to='https://github.com/pastenes/richards-dev-site'>
          <SlSocialGithub />
        </Link>
        <Link to='https://www.linkedin.com/in/richardpastenes'>
          <SlSocialLinkedin />
        </Link>
        <Link to='https://twitter.com/RichardPastenes'>
          <SlSocialTwitter />
        </Link>
      </div>
    </footer>
  )
}
