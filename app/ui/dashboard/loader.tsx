'use client';
import React from 'react';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import classes from './dashboard.module.css';

const Loader = () => {
  return (
    <div className="flex h-full justify-center items-center w-full">
      <IoCloudDownloadOutline
        className={`${classes.unselectedIcon} animate-bounce`}
        size={50}
      />
    </div>
  );
};

export default Loader;
