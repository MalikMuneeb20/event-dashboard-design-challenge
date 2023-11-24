'use client';

import React from 'react';
import classes from '@/app/ui/navbar/topnav.module.css';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import CustomLink from './custom-link';

interface HamburgerMenuProps {
  toggleMenu: () => void;
  clicked: Boolean;
}

const HamburgerMenu = ({ toggleMenu, clicked }: HamburgerMenuProps) => {
  const closeMenu = () => {
    if (clicked == true) {
      console.log('helo');
      toggleMenu();
    }
  };

  return (
    <div
      className={`${classes.hamBurger}  px-5 py-2 m-0 top-0 left-0 w-screen  absolute h-screen`}
    >
      <div className={`${classes.logoSection} w-full`}>
        <Image
          src="/events-logo/Logo.png"
          width={60}
          height={60}
          alt="Events Logo"
          className="text-white"
        />
        <FaTimes
          className={`${classes.iconColor} icon-large`}
          size={30}
          onClick={toggleMenu}
        />
      </div>
      <ul className="flex flex-col pt-6 justify-center text-center">
        <CustomLink to="/" title="Dashboard" closeMenu={closeMenu} />
        <CustomLink
          to="/favourites"
          title="Favourite Events"
          closeMenu={closeMenu}
        />
      </ul>
    </div>
  );
};

export default HamburgerMenu;
