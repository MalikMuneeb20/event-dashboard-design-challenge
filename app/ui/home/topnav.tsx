'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import classes from '@/app/ui/home/topnav.module.css';
import { FaSearch } from 'react-icons/fa';
import HamburgerMenu from './hamburger-menu';

const TopNav = () => {
  const [clicked, setClicked] = useState(false);

  const toggleMenu = () => {
    setClicked(!clicked);
  };

  return (
    <div
      className={`${classes.container} flex flex-row px-5 md:px-10 py-2 items-center justify-between relative `}
    >
      <div className={`flex flex-row w-11/12 md:w-10/12`}>
        <div className="md:pr-8">
          <Image
            src="/events-logo/Logo.png"
            width={60}
            height={60}
            alt="Events Logo"
          />
        </div>
        <div
          className={`${classes.searchContainer} flex flex-row rounded-full px-5 items-center w-10/12 sm:w-full md:w-2/4  md:py-3`}
        >
          <div className="pr-3">
            <FaSearch className={`${classes.iconColor}`} />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            className={`search-input bg-transparent border-0 outline-none md:w-4/5 ${classes.iconColor}`}
          />
        </div>
      </div>
      <div className={`pl-2 block md:hidden`}>
        <Image
          src="/icons/hamburger.svg"
          onClick={toggleMenu}
          width={25}
          height={25}
          alt="Hamburger"
        />
      </div>
      {clicked && <HamburgerMenu toggleMenu={toggleMenu} clicked={clicked} />}
    </div>
  );
};

export default TopNav;
