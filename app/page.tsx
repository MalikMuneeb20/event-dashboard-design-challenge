'use client';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <main className="flex flex-col-reverse lg:flex-row h-full justify-between border-2 border-solid border-black">
      <div className="flex flex-col border-2  border-solid border-indigo-500 h-full w-full">
        <div className="border-2  border-solid border-indigo-500 h-full">
          Hello
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
