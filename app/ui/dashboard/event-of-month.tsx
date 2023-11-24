import React from 'react';
import classes from './dashboard.module.css';
import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';

interface EventOfMonthItems {
  title: String;
  count: Number;
}
const EventOfMonthCard = ({ title, count }: EventOfMonthItems) => {
  return (
    <div
      className={`${classes.eventClass} border-2 w-full border-solid flex flex-col px-6 py-7 justify-evenly border-indigo-500 rounded-xl h-full`}
    >
      <div className="flex  justify-between">
        <div className={`text-3xl text-white font-bold`}>{title}</div>
        <Image
          src={'/icons/zondicons_badge.svg'}
          alt={'Achievement Sign'}
          width={80}
          height={80}
        />
      </div>
      <div className={`flex flex-col px-4 py-4 rounded-xl bg-white h-3/5`}>
        <div className={`flex flex-row  font-bold text-lg`}>
          <div className={`${classes.eventText}`}>Web Development</div>
        </div>
        <div
          className={`${classes.textColor} flex flex-row justify-between font-normal text-md`}
        >
          <div className={``}>
            Category: <span className="font-bold">AI</span>
          </div>
          <div>Thu 2 Nov 2023</div>
        </div>
        <div
          className={`${classes.textColor} flex flex-row justify-between font-normal text-md`}
        >
          <div className={`flex item-center`}>
            <FaLocationDot
              className={`${classes.unselectedIcon} pr-2`}
              size={20}
            />{' '}
            Bahria Intellectual Village
          </div>
          <div>12:00am</div>
        </div>
      </div>
    </div>
  );
};

const EventOfMonth = () => {
  return (
    <div className="h-5/6">
      <EventOfMonthCard title={'Event of the month'} count={1} />
    </div>
  );
};

export default EventOfMonth;
