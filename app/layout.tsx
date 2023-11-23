import type { Metadata } from 'next';

import { inter } from '@/app/ui/fonts';
import './globals.css';
import TopNav from '@/app/ui/home/topnav';
import { useState } from 'react';
import SideNav from './ui/home/sidenav';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col h-screen`}>
        <div>
          <TopNav />
        </div>
        <div className="pl-6 pr-6  pt-4 pb-4 flex-row h-full hidden md:flex">
          <div className="pr-2 ">
            <SideNav />
          </div>
          <div style={{ border: '1px solid black' }} className="w-full pl-5">
            {children}
          </div>
        </div>

        <div className="block md:hidden">{children}</div>
      </body>
    </html>
  );
}
