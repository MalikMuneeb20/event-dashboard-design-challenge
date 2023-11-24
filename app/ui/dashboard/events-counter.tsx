import React from 'react';
import classes from './dashboard.module.css';

interface countCardItems {
  title: String;
  count: Number;
}

const CountCard = ({ title, count }: countCardItems) => {
  return (
    <div
      className={`${classes.tableColor} border-2 border-solid flex flex-col px-6 py-7 justify-evenly  border-indigo-500  rounded-xl w-3/12 h-3/4`}
    >
      <div className={`text-sm font-normal`}>{title}</div>
      <div className={`text-4xl font-extrabold`}>{count.toString()}</div>
    </div>
  );
};

const EventsCounter = () => {
  return (
    <div className="flex justify-between h-full">
      <CountCard title={'All Events'} count={2500} />
      <CountCard title={'This Month Events'} count={30} />
      <CountCard title={'Favourite Events'} count={25} />
    </div>
  );
};

export default EventsCounter;
