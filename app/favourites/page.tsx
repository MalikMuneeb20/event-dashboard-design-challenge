'use client';
import React, { Suspense, useEffect, useState } from 'react';
import classes from './favourites.module.css';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { fetchEvents } from '@/app/lib/events';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { addEventToFavouriteEvents } from '@/app/redux/features/favourite-event-slice';
import { addEventtoFavourite } from '../redux/features/event-slice';

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

const rows = Array.from({ length: 12 }, (_, index) => index + 1);
const CustomRow = ({ result }: CustomRowProps) => {
  const [isFav, setIsFav] = useState(result.favourite);
  const dispatch = useDispatch<AppDispatch>();

  const toggleFav = () => {
    dispatch(addEventtoFavourite({ id: result.id }));
    dispatch(addEventToFavouriteEvents({ result }));
    setIsFav(!isFav);
  };

  return (
    <tr className={`${classes.tableColor} rounded-t`}>
      <td scope="row" className={`${classes.td} px-6 py-4 font-semibold`}>
        {result.rank.toString()}
      </td>
      <td className={`${classes.td} px-6 py-4`}>{result.title}</td>
      <td className={`${classes.td} px-6 py-4`}>{result.start}</td>
      <td className={`${classes.td} px-6 py-4`}>{result.start}</td>
      <td className={`${classes.td} px-6 py-4`}>{result.country}</td>
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
const FavouritesDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const results = useAppSelector((state) => state.favEventsReducer.value);
  const count = useAppSelector((state) => state.eventsReducer.count);
  return (
    <div className="relative overflow-x-auto h-full overflow-y-auto ">
      <Suspense fallback={<div>Loading...</div>}>
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

export default FavouritesDashboard;
