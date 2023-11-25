'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import classes from '@/app/ui/navbar/topnav.module.css';
import { FaSearch } from 'react-icons/fa';
import HamburgerMenu from './hamburger-menu';
import { FaSort } from 'react-icons/fa';
import { fetchEvents, searchEvents } from '@/app/lib/events';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { setFavEvents } from '@/app/redux/features/favourite-event-slice';
import { setEvents } from '@/app/redux/features/event-slice';

import {
  setEventOfTheMonth,
  setUpcomingEvents,
} from '@/app/redux/features/upcoming-event-slice';
import { setLoading } from '@/app/redux/features/loader-slice';
const TopNav = () => {
  const [clicked, setClicked] = useState(false);
  const [btn, setBtn] = useState('');

  const toggleMenu = () => {
    setClicked(!clicked);
  };

  const dispatch = useDispatch<AppDispatch>();

  const searchAndDispatchEvents = async (item: string) => {
    try {
      dispatch(setLoading({ loading: true }));
      const events = await searchEvents(item);

      dispatch(setEvents({ count: events.count, results: events.results }));
      dispatch(setUpcomingEvents({ results: events.results }));
      dispatch(setEventOfTheMonth({ results: events.results }));
      dispatch(setLoading({ loading: false }));
    } catch (error) {
      console.error('Error fetching events:', error);
      dispatch(setLoading({ loading: false }));
    }
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
          className={`${classes.searchContainer} flex  flex-row rounded-full px-5 items-center w-10/12 sm:w-full md:w-2/4  md:py-3`}
        >
          <input
            type="text"
            placeholder="Search events..."
            onChange={(e) => setBtn(e.target.value)}
            className={`search-input bg-transparent flex-grow border-0 outline-none md:w-4/5 ${classes.iconColor}`}
          />
          <div
            className="pr-3"
            onClick={() => {
              searchAndDispatchEvents(btn);
              console.log('Hello');
            }}
          >
            <FaSearch className={`${classes.iconColor} cursor-pointer  `} />
          </div>
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
