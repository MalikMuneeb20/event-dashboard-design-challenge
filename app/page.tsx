import Image from 'next/image';
import EventsList from './ui/dashboard/events-list';
import { IoFilterSharp } from 'react-icons/io5';
import classes from './dashboard.module.css';
import EventsCounter from './ui/dashboard/events-counter';
import EventOfMonth from './ui/dashboard/event-of-month';
import UpcomingEvents from './ui/dashboard/upcoming-events';
import { fetchEvents } from './lib/events';
import { Suspense } from 'react';
import DashboardPage from './ui/dashboard/dashboard';

// export async function fetchEvents() {

// }

export default async function Dashboard() {
  // try {
  //   const response = await fetch('https://api.predicthq.com/v1/events/', {
  //     headers: {
  //       Authorization: 'Bearer H428WwrA754f-mazLxuRXdDbD-vzd4dNphpl-tYW',
  //       Accept: 'application/json',
  //     },
  //   });

  //   const events = await response.json();
  //   console.log(events);
  // } catch (error) {
  //   console.error('Error fetching:', error);
  //   // throw new Error('Failed to fetch quests');
  // }

  // const events = await fetchEvents();
  return (
    <main className="flex flex-col-reverse lg:flex-row h-full justify-between   ">
      {/* <div className="flex flex-col     h-full w-full">
        <div className=" flex flex-col  h-full w-full   overflow-y-auto">
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
        <div
          className="mt-4
        h-1/4"
        >
          <EventsCounter />
        </div>
      </div>
      <div className="flex flex-col  ml:0 lg:ml-4  h-full w-full lg:w-2/6">
        <div className=" h-full">
          <UpcomingEvents />
        </div>
        <div className="hidden lg:block  mt-4   h-2/5">
          <EventOfMonth />
        </div>
      </div> */}
      <DashboardPage />
    </main>
  );
}
