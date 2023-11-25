'use client';
import React from 'react';
import classes from './dashboard.module.css';
import { AppDispatch, useAppSelector } from '@/app/redux/store';

interface countCardItems {
  title: string;
  count: number;
}

const CountCard = ({ title, count }: countCardItems) => {
  return (
    <div
      className={`${classes.tableColor}  flex flex-col px-6 py-7 justify-evenly    rounded-xl w-3/12 h-full`}
    >
      <div className={`text-xs lg:text-sm font-normal`}>{title}</div>
      <div className={`text-lg lg:text-4xl font-extrabold`}>
        {count.toString()}
      </div>
    </div>
  );
};

const EventsCounter = () => {
  const count = useAppSelector((state) => state.eventsReducer.count);
  const favCount = useAppSelector((state) => state.favEventsReducer.count);
  const eventThisMonthCount = useAppSelector(
    (state) => state.upcomingEventsReducer.count
  );
  return (
    <div className="flex justify-between h-full">
      <CountCard title={'All Events'} count={count} />
      <CountCard title={'This Month Events'} count={eventThisMonthCount} />
      <CountCard title={'Favourite Events'} count={favCount} />
    </div>
  );
};

export default EventsCounter;
