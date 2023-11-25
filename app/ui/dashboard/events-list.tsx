'use client';
import React, { Suspense, useEffect, useState } from 'react';
import classes from './dashboard.module.css';
import { FaRegHeart, FaHeart, FaSort } from 'react-icons/fa';
import { fetchEvents } from '@/app/lib/events';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/redux/store';

import {
  addEventToFavouriteEvents,
  setFavEvents,
} from '@/app/redux/features/favourite-event-slice';
import {
  setEvents,
  addEventtoFavourite,
  sortEventinOrder,
} from '@/app/redux/features/event-slice';
import { addUpcomingEventtoFavourite } from '@/app/redux/features/upcoming-event-slice';
import {
  setLoading,
  setIsModelOpen,
  addEventToModal,
} from '@/app/redux/features/loader-slice';

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
const EventsList = () => {
  const results = useAppSelector((state) => state.eventsReducer.value);
  const count = useAppSelector((state) => state.eventsReducer.count);
  const [sort, setSort] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const toogleSort = async () => {
    console.log('consol');
    dispatch(
      sortEventinOrder({
        sortOrder: sort ? 'asc' : 'desc',
      })
    );
    setSort(!sort);
  };

  return (
    <div className="relative overflow-x-auto h-full overflow-y-auto ">
      <Suspense fallback={<div>Loading...</div>}>
        <table
          className={`${classes.textColor} w-full text-sm text-left rtl:text-right  `}
        >
          <thead className="text-s uppercase bg-gray-50 bg-transparent border-b-2">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="flex ">
                  <div className={`pr-3`}># </div>
                  <div>
                    <FaSort
                      onClick={() => {
                        toogleSort();
                      }}
                      className={`${classes.eventText} cursor-pointer`}
                      size={15}
                    />
                  </div>
                </div>
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
                <CustomRow
                  result={result}
                  // id={index.id}
                  // name={index.title}
                  // time={index.start}
                  // date={index.start}
                  // location={index.country}
                  // favourite={index.favourite}
                  // rank={index.rank}
                />
                <Spacer />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Suspense>
    </div>
  );
};

export default EventsList;
