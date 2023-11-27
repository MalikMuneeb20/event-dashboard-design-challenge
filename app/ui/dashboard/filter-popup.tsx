import { useState } from 'react';
import { Popover } from '@headlessui/react';
import { IoFilterSharp, IoSearch } from 'react-icons/io5';
import classes from './dashboard.module.css';
import { filterEventByCategory } from '@/app/lib/events';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { setEvents } from '@/app/redux/features/event-slice';
import { setLoading } from '@/app/redux/features/loader-slice';
import {
  setEventOfTheMonth,
  setUpcomingEvents,
} from '@/app/redux/features/upcoming-event-slice';

const FilterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState('');
  const [fromDateTime, setFromDateTime] = useState('');
  const [toDateTime, setToDateTime] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const searchAndfilterEvents = async (
    searchCategory: string,
    fromDate: string,
    toDate: string
  ) => {
    try {
      console.log(searchCategory);
      dispatch(setLoading({ loading: true }));
      const events = await filterEventByCategory(
        searchCategory,
        fromDate,
        toDate
      );
      console.log(events);

      dispatch(setEvents({ count: events.count, results: events.results }));
      dispatch(setUpcomingEvents({ results: events.results }));
      dispatch(setEventOfTheMonth({ results: events.results }));
      dispatch(setLoading({ loading: false }));
    } catch (error) {
      console.error('Error fetching events:', error);
      dispatch(setLoading({ loading: false }));
    }
  };

  const categories = [
    { value: 'school-holidays', label: 'School Holidays' },
    { value: 'public-holidays', label: 'Public Holidays' },
    { value: 'observances', label: 'Observances' },
    { value: 'politics', label: 'Politics' },
    { value: 'conferences', label: 'Conferences' },
    { value: 'expos', label: 'Expos' },
    { value: 'concerts', label: 'Concerts' },
    { value: 'festivals', label: 'Festival' },
    { value: 'perform-arts', label: 'Performing Arts' },
    { value: 'sports', label: 'Sports' },
    { value: 'community', label: 'Community' },
    { value: 'daylight-savings', label: 'Daylight Savings' },
    { value: 'airport-delays', label: 'Airport Delays' },
    { value: 'severe-weather', label: 'Severe Weather' },
    { value: 'disasters', label: 'Disasters' },
    { value: 'terror', label: 'Terror' },
    { value: 'health-warnings', label: 'Health Warnings' },
    { value: 'academic', label: 'Academic' },
  ];
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
              ${open ? classes.eventText : classes.textColor}
              bg-transparentrounded-md px-4 py-2
              flex items-center justify-between outline-none
            `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoFilterSharp size={25} />
          </Popover.Button>

          <Popover.Panel
            className={`${classes.filterContainer}
              ${open ? 'visible opacity-100' : 'invisible opacity-0'}
              absolute z-10 rounded-md p-4 transition duration-300 
            `}
          >
            <div className="flex justify-between  h-full">
              <div className="px-3 py-5 w-full items-start" role="none">
                <div className=" text-slate-500">
                  <p className="text-md font-bold mb-1">Category</p>
                  <select
                    className={`${classes.fieldColor} p-2 text-md  w-full bg-filterField bg-gray-300 rounded`}
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={`flex pt-4 w-100 float-end  justify-between`}>
                  <div className=" text-slate-500">
                    <p className="text-md font-bold mb-1">From</p>
                    <input
                      type="datetime-local"
                      id="datetime"
                      value={fromDateTime}
                      onChange={(e) => setFromDateTime(e.target.value)}
                      className={` p-2 text-md  w-full bg-filterField bg-gray-300 rounded`}
                    />
                  </div>
                  <div className=" text-slate-500">
                    <p className="text-md font-bold mb-1">To</p>
                    <input
                      type="datetime-local"
                      id="datetime"
                      value={toDateTime}
                      onChange={(e) => setToDateTime(e.target.value)}
                      className={` p-2 text-md  w-full bg-filterField bg-gray-300 rounded`}
                    />
                  </div>
                </div>
                <div className="flex justify-end w-100">
                  <div
                    onClick={() => {
                      searchAndfilterEvents(
                        searchCategory,
                        fromDateTime,
                        toDateTime
                      );
                    }}
                    className={`mt-5 bg-white  flex justify-center  items-center ${classes.fieldColor} w-2/12 p-1 rounded-md`}
                  >
                    <IoSearch size={25} className={`${classes.eventText} `} />
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default FilterPopup;
