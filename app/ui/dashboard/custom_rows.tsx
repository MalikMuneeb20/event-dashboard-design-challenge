import React, { useState } from 'react';
import classes from './dashboard.module.css';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
interface customRowItems {
  id: Number;
  name: String;
  time: String;
  date: String;
  location: String;
}
// const rows = Array.from({ length: 12 }, (_, index) => index + 1);
const CustomRow = ({ id, name, time, date, location }: customRowItems) => {
  const [fav, setFav] = useState(false);

  const toggleFav = () => {
    setFav(!fav);
  };

  return (
    <tr className={`${classes.tableColor} rounded-t`}>
      <td scope="row" className={`${classes.td} px-6 py-4 font-semibold`}>
        {id.toString()}
      </td>
      <td className={`${classes.td} px-6 py-4`}>{name}</td>
      <td className={`${classes.td} px-6 py-4`}>{time}</td>
      <td className={`${classes.td} px-6 py-4`}>{date}</td>
      <td className={`${classes.td} px-6 py-4`}>{location}</td>
      <td className={`${classes.td} float-right px-6 py-4`}>
        {/* {!fav ? (
          <FaRegHeart className={classes.unselectedIcon} onClick={toggleFav} />
        ) : (
          <FaHeart className={`text-red-600`} onClick={toggleFav} />
        )} */}
      </td>
    </tr>
  );
};

export default CustomRow;
