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

export default async function Dashboard() {
  return (
    <main className="flex flex-col-reverse h-full  lg:flex-row  justify-between   ">
      <DashboardPage />
    </main>
  );
}
