import React, { useState } from 'react';
import classes from './dashboard.module.css';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
const Spacer = () => {
  return (
    <tr className={`bg-transparent`}>
      <td className="py-1"></td>
    </tr>
  );
};

interface customRowItems {
  id: Number;
  name: String;
  time: String;
  date: String;
  location: String;
}
const rows = Array.from({ length: 12 }, (_, index) => index + 1);
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
        {!fav ? (
          <FaRegHeart className={classes.unselectedIcon} onClick={toggleFav} />
        ) : (
          <FaHeart className={`text-red-600`} onClick={toggleFav} />
        )}
      </td>
    </tr>
  );
};

const EventsList = () => {
  return (
    <div className="relative overflow-x-auto  overflow-y-auto ">
      <table
        className={`${classes.textColor} w-full text-sm text-left rtl:text-right  `}
      >
        <thead className="text-s uppercase bg-gray-50 bg-transparent border-b-2">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="text-s font-light pt-5">
          <Spacer />
          {rows.map((index) => (
            <React.Fragment key={index}>
              <CustomRow
                id={index}
                name={'Web Development'}
                time={'12:00AM'}
                date={'Thu 2 Nov'}
                location={'Bahria Intellectual Village'}
              />
              <Spacer key={`spacer-${index}`} />
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsList;
