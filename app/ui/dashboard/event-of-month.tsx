'use client';
import React from 'react';
import classes from './dashboard.module.css';
import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';
import { useAppSelector } from '@/app/redux/store';

interface EventOfMonthItems {
  title: String;
  count: Number;
}
const EventOfMonthCard = ({ title, count }: EventOfMonthItems) => {
  const eventOfTheMonth = useAppSelector(
    (state) => state.upcomingEventsReducer.eventOfMonth
  );

  const dateTime = new Date(eventOfTheMonth.start);
  const day = dateTime.getDate();
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  const padWithZero = (value: number) => (value < 10 ? `0${value}` : value);
  return (
    <div
      className={`${classes.eventClass} w-full flex flex-col px-4 md:px-6 lg:px-8 py-4 md:py-7 justify-evenly rounded-xl h-full`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div
          className={`text-xl lg:text-2xl text-white font-bold mb-2 md:mb-0`}
        >
          {title}
        </div>
        <Image
          src={'/icons/zondicons_badge.svg'}
          alt={'Achievement Sign'}
          width={60}
          height={60}
        />
      </div>

      <div
        className={`${
          eventOfTheMonth.title == '' ? classes.noEvent : classes.eventOfMonth
        } flex flex-col px-4 py-4 rounded-xl bg-white mt-4 md:mt-0 h-auto md:h-3/5 overflow-auto`}
      >
        {eventOfTheMonth.title == '' ? (
          <div
            className={`${classes.textColor} text-center font-normal text-md`}
          >
            No Event Found
          </div>
        ) : (
          <>
            <div className={`flex flex-col font-bold text-lg mb-2`}>
              <div className={`${classes.eventText} mb-1`}>
                {eventOfTheMonth.title}
              </div>
              <div
                className={`${classes.textColor} flex justify-between font-normal text-md mb-1`}
              >
                <div>
                  Category:{' '}
                  <span className="font-bold">{eventOfTheMonth.category}</span>
                </div>
                <div>{`${day}-${month}-${year}`}</div>
              </div>
              <div
                className={`${classes.textColor} flex justify-between font-normal text-md`}
              >
                <div className={`flex items-center`}>
                  <FaLocationDot
                    className={`${classes.unselectedIcon} pr-2`}
                    size={20}
                  />{' '}
                  {eventOfTheMonth.country}
                </div>
                <div>{`${padWithZero(hours)}:${padWithZero(minutes)}`}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const EventOfMonth = () => {
  return (
    <div className="h-full">
      <EventOfMonthCard title={'Event of the month'} count={1} />
    </div>
  );
};

export default EventOfMonth;
