'use client';

import React from 'react';
import classes from './sidenav.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { FiGrid } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';

const links = [
  { name: 'Dashboard', href: '/', icon: FiGrid },
  { name: 'Favourite', href: '/favourites', icon: FaRegHeart },
];

const SideNav = () => {
  const pathName = usePathname();

  return (
    <div
      className={`${classes.container} flex h-full flex-col px-3 py-4 md:px-2 rounded-full`}
    >
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <div className={`${classes.listIcons} p-3 rounded-full`}>
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  `${classes.unselectedIcon} flex h-[48px] grow items-center justify-center gap-2 rounded-full bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100  md:flex-none md:justify-start md:p-2 md:px-3`,
                  {
                    [classes.selectedIcon]: pathName === link.href,
                  }
                )}
              >
                <LinkIcon size={25} />
              </Link>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default SideNav;
