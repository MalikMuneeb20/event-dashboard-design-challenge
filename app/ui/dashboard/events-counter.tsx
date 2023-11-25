'use client';
import React from 'react';
import classes from './dashboard.module.css';
import { AppDispatch, useAppSelector } from '@/app/redux/store';

interface countCardItems {
  title: String;
  count: Number;
}

const CountCard = ({ title, count }: countCardItems) => {
  return (
    <div
      className={`${classes.tableColor}  flex flex-col px-6 py-7 justify-evenly    rounded-xl w-3/12 h-3/4`}
    >
      <div className={`text-sm font-normal`}>{title}</div>
      <div className={`text-4xl font-extrabold`}>{count.toString()}</div>
    </div>
  );
};

const EventsCounter = () => {
  const count = useAppSelector((state) => state.eventsReducer.count);
  const favCount = useAppSelector((state) => state.favEventsReducer.favCount);
  return (
    <div className="flex justify-between h-full">
      <CountCard title={'All Events'} count={count} />
      <CountCard title={'This Month Events'} count={30} />
      <CountCard title={'Favourite Events'} count={favCount} />
    </div>
  );
};

export default EventsCounter;
