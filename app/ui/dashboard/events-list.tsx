'use client';
import React, { Suspense, useEffect, useState } from 'react';
import classes from './dashboard.module.css';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { fetchEvents } from '@/app/lib/events';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { setEvents } from '@/app/redux/features/event-slice';

const Spacer = () => {
  return (
    <tr className={`bg-transparent`}>
      <td className="py-1"></td>
    </tr>
  );
};

interface customRowItems {
  id: Number;
  name: String;
  time: String;
  date: String;
  location: String;
}

const rows = Array.from({ length: 12 }, (_, index) => index + 1);
const CustomRow = ({ id, name, time, date, location }: customRowItems) => {
  const [fav, setFav] = useState(false);

  const toggleFav = () => {
    setFav(!fav);
  };

  return (
    <tr className={`${classes.tableColor} rounded-t`}>
      <td scope="row" className={`${classes.td} px-6 py-4 font-semibold`}>
        {id.toString()}
      </td>
      <td className={`${classes.td} px-6 py-4`}>{name}</td>
      <td className={`${classes.td} px-6 py-4`}>{time}</td>
      <td className={`${classes.td} px-6 py-4`}>{date}</td>
      <td className={`${classes.td} px-6 py-4`}>{location}</td>
      <td className={`${classes.td} float-right px-6 py-4`}>
        {!fav ? (
          <FaRegHeart className={classes.unselectedIcon} onClick={toggleFav} />
        ) : (
          <FaHeart className={`text-red-600`} onClick={toggleFav} />
        )}
      </td>
    </tr>
  );
};

const EventsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  useAppSelector((state) => state.eventsReducer.value);
  useEffect(() => {
    const fetchAndDispatchEvents = async () => {
      try {
        const events = await fetchEvents();
        dispatch(setEvents({ count: events.count, results: events.results }));
        // setResults(useAppSelector((state) => state.eventsReducer.value));
        const temp = useAppSelector((state) => state.eventsReducer.count);

        // setCount(temp);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchAndDispatchEvents();
  }, [dispatch]);

  const results = useAppSelector((state) => state.eventsReducer.value);
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
                # {count}
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
            {results.map((index) => (
              <React.Fragment>
                <CustomRow
                  id={index.rank}
                  name={index.title}
                  time={index.start}
                  date={index.start}
                  location={index.country}
                />
                <Spacer key={`spacer-${index}`} />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Suspense>
    </div>
  );
};

export default EventsList;
