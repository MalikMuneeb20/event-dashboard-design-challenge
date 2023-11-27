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
import {
  setEventOfTheMonth,
  setUpcomingEvents,
} from '@/app/redux/features/upcoming-event-slice';
import { setLoading } from '@/app/redux/features/loader-slice';
import FilterPopup from './filter-popup';
import Modal from './modal';

export default function DashboardPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [show, setShow] = useState(true);

  const isLoading: boolean = useAppSelector(
    (state) => state.loadingReducer.loading
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchAndDispatchEvents = async () => {
      try {
        const events = await fetchEvents();
        dispatch(setFavEvents());
        dispatch(setEvents({ count: events.count, results: events.results }));
        dispatch(setUpcomingEvents({ results: events.results }));
        dispatch(setEventOfTheMonth({ results: events.results }));
        dispatch(setLoading({ loading: false }));
      } catch (error) {
        console.error('Error fetching events:', error);
        dispatch(setLoading({ loading: false }));
      }
    };

    fetchAndDispatchEvents();
  }, [dispatch]);

  return (
    // <Suspense fallback={<Loader />}>
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex overflow-auto flex-col-reverse pl-4 pr-4 lg:pl-0 lg:pr-0 lg:flex-row w-full">
          <Modal />
          <div className="flex flex-col h-full w-full">
            <div
              className={`${classes.customEventHeight} flex flex-col w-full relative overflow-y-auto`}
            >
              <div className="flex justify-between pb-5 px-5 items-center">
                <div className="text-xl font-semibold">Events List</div>
                <div>
                  <FilterPopup />
                </div>
              </div>

              <EventsList />
            </div>
            <div className={`${classes.customEventCounterHeight} mt-4`}>
              <EventsCounter />
            </div>
            <div
              className={`${classes.customEventOfMonthHeight}  lg:hidden block  mt-4  `}
            >
              <EventOfMonth />
            </div>
          </div>
          <div className="flex flex-col mt-5 lg:mt-0 ml:0 lg:ml-4  h-full w-full lg:w-2/6">
            <div
              className={`${classes.customUpcomingEventHeight} w-full h-full`}
            >
              <UpcomingEvents />
            </div>
            <div
              className={`${classes.customEventOfMonthHeight} mb-5  hidden lg:block  mt-4  `}
            >
              <EventOfMonth />
            </div>
          </div>
        </div>
      )}
      {/* </Suspense> */}
    </>
  );
}
