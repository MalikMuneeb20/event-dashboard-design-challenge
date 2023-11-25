'use client';
import React, { useState } from 'react';
import classes from './dashboard.module.css';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { addEventtoFavourite } from '@/app/redux/features/event-slice';
import { addEventToFavouriteEvents } from '@/app/redux/features/favourite-event-slice';
import { addUpcomingEventtoFavourite } from '@/app/redux/features/upcoming-event-slice';
import {
  addEventToModal,
  setIsModelOpen,
} from '@/app/redux/features/loader-slice';

interface CustomRowItems {
  id: string;
  title: string;
  rank: number;
  start: string;
  country: string;
  category: string;
  description: string;
  favourite: boolean;
}
interface CustomRowProps {
  result: CustomRowItems;
}

const CustomUpcomingEventCard = ({ result }: CustomRowProps) => {
  const isFav = result.favourite;
  const dateTime = new Date(result.start);
  const day = dateTime.getDate();
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  const padWithZero = (value: number) => (value < 10 ? `0${value}` : value);

  const dispatch = useDispatch<AppDispatch>();

  const toggleFav = () => {
    dispatch(addEventtoFavourite({ id: result.id }));
    dispatch(addEventToFavouriteEvents({ result }));
    dispatch(addUpcomingEventtoFavourite({ id: result.id }));
  };

  const handleOpenModal = async () => {
    dispatch(setIsModelOpen());
    dispatch(addEventToModal({ result }));
  };
  return (
    <div
      className={`${classes.border} flex px-4 py-2 mb-2 item-center justify-between rounded-xl`}
    >
      <div onClick={() => handleOpenModal()} className={`flex flex-col`}>
        <div className={`text-md`}>{result.title}</div>
        <div className={`text-xs`}>{`${day}-${month}-${year}, ${padWithZero(
          hours
        )}:${padWithZero(minutes)}`}</div>
      </div>
      <div className="flex  self-center">
        {!isFav ? (
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
  const results = useAppSelector((state) => state.upcomingEventsReducer.value);
  return (
    <div
      className={`${classes.upcomingColor} flex flex-col h-full  px-6 py-6  rounded-xl `}
    >
      <div className="text-2xl font-semibold pb-5 ">Upcoming Events</div>

      <div className="overflow-auto h-full">
        {results.map((result) => (
          <CustomUpcomingEventCard result={result} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
