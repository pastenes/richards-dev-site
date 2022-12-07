import React from 'react';
import { Link } from 'gatsby';
import { SlSocialGithub, SlSocialLinkedin, SlSocialTwitter } from 'react-icons/sl';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center py-24 font-mono text-muted">
      <div className="pb-2 text-xs">Built by Richard Pastenes</div>
      <div className="flex gap-2">
        <Link to="https://github.com/pastenes/richards-dev-site">
          <SlSocialGithub />
        </Link>
        <Link to="https://www.linkedin.com/in/richardpastenes">
          <SlSocialLinkedin />
        </Link>
        <Link to="https://twitter.com/RichardPastenes">
          <SlSocialTwitter />
        </Link>
      </div>
    </footer>
  );
}
