'use client';
import Image from 'next/image';
import EventsList from './events-list';
import { IoFilterSharp } from 'react-icons/io5';
import classes from './dashboard.module.css';
import EventsCounter from './events-counter';
import EventOfMonth from './event-of-month';
import UpcomingEvents from '@/app/ui/dashboard/upcoming-events';
import { fetchEvents } from '@/app/lib/events';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { setFavEvents } from '@/app/redux/features/favourite-event-slice';
import { setEvents } from '@/app/redux/features/event-slice';
import Loader from './loader';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchAndDispatchEvents = async () => {
      try {
        const events = await fetchEvents();
        dispatch(setFavEvents());
        dispatch(setEvents({ count: events.count, results: events.results }));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchAndDispatchEvents();
  }, [dispatch]);

  return (
    // <Suspense fallback={<Loader />}>
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col h-full w-full">
            <div
              className={`${classes.customEventHeight} flex flex-col w-full   overflow-y-auto`}
            >
              <div className="flex justify-between pb-5 px-5 items-center">
                <div className="text-xl font-semibold">Events List</div>
                <IoFilterSharp
                  className={`${classes.iconColor} `}
                  size={25}
                  // onClick={() => {
                  //   console.log('clicked');
                  // }}
                />
              </div>

              <EventsList />
            </div>
            <div className={`${classes.customEventCounterHeight} mt-4`}>
              <EventsCounter />
            </div>
          </div>
          <div className="flex flex-col  ml:0 lg:ml-4  h-full w-full lg:w-2/6">
            <div className={`${classes.customUpcomingEventHeight} h-full`}>
              <UpcomingEvents />
            </div>
            <div
              className={`${classes.customEventOfMonthHeight}  hidden lg:block  mt-4   h-2/5`}
            >
              <EventOfMonth />
            </div>
          </div>
        </>
      )}
      {/* </Suspense> */}
    </>
  );
}
