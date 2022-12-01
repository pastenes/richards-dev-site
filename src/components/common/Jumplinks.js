import React from "react";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Link } from "gatsby";

const Jumplinks = () => (
  <nav className="text-green text-center sticky -top-20 -mt-20 ml-14  lg:ml-nav z-20 bg-dark inline-flex flex-col p-3 font-fira-code">
    <AnchorLink className='py-4' href='#about'>
    <div className="bg-dark text-5xl text-center">
        <FaChevronDown className="animate-bounce ml-1" />
    </div>
    </AnchorLink>
    <AnchorLink className='py-4' href='#about'>About</AnchorLink>
    <AnchorLink className='py-4' href='#work'>Work</AnchorLink>
    <Link className='py-4' to='/resume'>Resume</Link>
  </nav>
);

export default Jumplinks;