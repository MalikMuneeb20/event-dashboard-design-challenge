'use client';
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
import { addEventtoFavourite } from '../../redux/features/event-slice';
import { addUpcomingEventtoFavourite } from '../../redux/features/upcoming-event-slice';
import {
  addEventToModal,
  setIsModelOpen,
  setLoading,
} from '../../redux/features/loader-slice';
import Loader from '../../ui/dashboard/loader';
import Modal from '../dashboard/modal';

const Spacer = () => {
  return (
    <tr className={`bg-transparent`}>
      <td className="py-1"></td>
    </tr>
  );
};

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

const CustomRow = ({ result }: CustomRowProps) => {
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
    <tr className={`${classes.tableColor} rounded-t`}>
      <td
        onClick={() => handleOpenModal()}
        scope="row"
        className={`${classes.td} px-6 py-4 font-semibold`}
      >
        {result.rank.toString()}
      </td>
      <td
        onClick={() => handleOpenModal()}
        className={`${classes.td} px-6 py-4`}
      >
        {result.title}
      </td>
      <td
        onClick={() => handleOpenModal()}
        className={`${classes.td} px-6 py-4`}
      >{`${padWithZero(hours)}:${padWithZero(minutes)}`}</td>
      <td
        onClick={() => handleOpenModal()}
        className={`${classes.td} px-6 py-4`}
      >{`${day}-${month}-${year}`}</td>
      <td
        onClick={() => handleOpenModal()}
        className={`${classes.td} px-6 py-4`}
      >
        {result.country}
      </td>
      <td className={`${classes.td} float-right px-6 py-4`}>
        {!isFav ? (
          <FaRegHeart className={classes.unselectedIcon} onClick={toggleFav} />
        ) : (
          <FaHeart className={`text-red-600`} onClick={toggleFav} />
        )}
      </td>
    </tr>
  );
};
const FavouritesPage = () => {
  const isLoading: boolean = useAppSelector(
    (state) => state.loadingReducer.loading
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchAndDispatchEvents = async () => {
      dispatch(setLoading({ loading: true }));
      try {
        const events = await fetchEvents();
        dispatch(setFavEvents());
        dispatch(setLoading({ loading: false }));
      } catch (error) {
        console.error('Error fetching events:', error);
        dispatch(setLoading({ loading: false }));
      }
    };

    fetchAndDispatchEvents();
  }, [dispatch]);

  const results = useAppSelector((state) => state.favEventsReducer.value);
  const count = useAppSelector((state) => state.eventsReducer.count);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Modal />
          <div className="flex justify-between pb-5 px-5 items-center">
            <div className="text-xl font-semibold">Favourite Events</div>
          </div>
          <div className="relative overflow-x-auto h-full overflow-y-auto ">
            <table
              className={`${classes.textColor} w-full text-sm text-left rtl:text-right  `}
            >
              <thead className="text-s uppercase bg-gray-50 bg-transparent border-b-2">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="text-s font-light pt-5">
                <Spacer />
                {results.map((result) => (
                  <React.Fragment>
                    <CustomRow result={result} />
                    <Spacer />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default FavouritesPage;
