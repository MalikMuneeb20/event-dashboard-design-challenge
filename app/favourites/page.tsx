import React, { Suspense, useEffect, useState } from 'react';
import classes from './favourites.module.css';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { fetchEvents } from '@/app/lib/events';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import {
  addEventToFavouriteEvents,
  setFavEvents,
} from '@/app/redux/features/favourite-event-slice';
import { addEventtoFavourite } from '../redux/features/event-slice';
import { addUpcomingEventtoFavourite } from '../redux/features/upcoming-event-slice';
import { setLoading } from '../redux/features/loader-slice';
import Loader from '../ui/dashboard/loader';
import FavouritesPage from '../ui/favourites/favourite';

const FavouritesDashboard = () => {
  return (
    <>
      <FavouritesPage />
    </>
  );
};

export default FavouritesDashboard;
