'use client';
import React, { useState } from 'react';
import classes from './dashboard.module.css';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const CustomUpcomingEventCard = () => {
  const [fav, setFav] = useState(false);

  const toggleFav = () => {
    setFav(!fav);
  };
  return (
    <div
      className={`${classes.border} flex px-4 py-2 mb-2 item-center justify-between rounded-xl`}
    >
      <div className={`flex flex-col`}>
        <div className={`text-md`}>Web Development</div>
        <div className={`text-xs`}>Thu 2 Nov, 12:00AM</div>
      </div>
      <div className="flex  self-center">
        {!fav ? (
          <FaRegHeart
            className={classes.unselectedIcon}
            onClick={toggleFav}
            size={22}
          />
        ) : (
          <FaHeart className={`text-red-600`} onClick={toggleFav} size={22} />
        )}
      </div>
    </div>
  );
};

const UpcomingEvents = () => {
  return (
    <div
      className={`${classes.upcomingColor} flex flex-col h-full  px-6 py-6  rounded-xl `}
    >
      <div className="text-2xl font-semibold pb-5 ">Upcoming Events</div>

      <div className="overflow-auto h-full">
        <CustomUpcomingEventCard /> <CustomUpcomingEventCard />{' '}
        <CustomUpcomingEventCard /> <CustomUpcomingEventCard />{' '}
        <CustomUpcomingEventCard /> <CustomUpcomingEventCard />{' '}
      </div>
    </div>
  );
};

export default UpcomingEvents;
