import React from 'react';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link } from 'gatsby';

const Jumplinks = () => (
  <nav className="sticky -top-20 z-20 -mt-20 ml-14 inline-flex  flex-col bg-dark p-3 text-center font-fira-code text-green lg:ml-nav">
    <AnchorLink className="py-4" href="#about">
      <div className="bg-dark text-center text-5xl">
        <FaChevronDown className="ml-1 animate-bounce" />
      </div>
    </AnchorLink>
    <AnchorLink className="py-4" href="#about">
      About
    </AnchorLink>
    <AnchorLink className="py-4" href="#work">
      Work
    </AnchorLink>
    <Link className="py-4" to="/resume">
      Resume
    </Link>
  </nav>
);

export default Jumplinks;
