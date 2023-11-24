import Link from 'next/link';
import React from 'react';

interface ListItemProps {
  to: string;
  title: string;
  closeMenu: () => void;
}

const CustomLink = ({ to, title, closeMenu }: ListItemProps) => {
  const handleClick = () => {
    console.log('Test');
    closeMenu();
  };

  return (
    <li className="mt-5" onClick={handleClick}>
      <Link className="text-2xl text-white font-bold" href={to}>
        {title}
      </Link>
      <div className="w-full border-b-2 mt-3"></div>
    </li>
  );
};

export default CustomLink;
