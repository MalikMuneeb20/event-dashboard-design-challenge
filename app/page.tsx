'use client';
import Image from 'next/image';
import EventsList from './ui/dashboard/events-list';
import { IoFilterSharp } from 'react-icons/io5';
import classes from './dashboard.module.css';

export default function Dashboard() {
  return (
    <main className="flex flex-col-reverse lg:flex-row h-full justify-between border-2 border-solid border-black">
      <div className="flex flex-col border-2  border-solid border-indigo-500 h-full w-full">
        <div className="border-2 flex flex-col h-full w-full border-solid border-indigo-500 overflow-y-auto">
          <div className="flex justify-between pb-5 px-5 items-center">
            <div className="text-xl font-semibold">Events List</div>
            <IoFilterSharp
              className={`${classes.iconColor} `}
              size={25}
              onClick={() => {
                console.log('clicked');
              }}
            />
          </div>
          <EventsList />
        </div>
        <div className="border-2 mt-4 border-solid border-indigo-500 h-1/4">
          World
        </div>
      </div>
      <div className="flex flex-col border-2 ml:0 lg:ml-4 border-solid border-indigo-500 h-full w-full lg:w-2/6">
        <div className="border-2  border-solid border-indigo-500 h-full">
          Hello
        </div>
        <div className="hidden lg:block border-2 mt-4 border-solid border-indigo-500 h-2/5">
          World
        </div>
      </div>
    </main>
  );
}
