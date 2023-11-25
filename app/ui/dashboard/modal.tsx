import classes from './dashboard.module.css';
import { RxCross1 } from 'react-icons/rx';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { setFavEvents } from '@/app/redux/features/favourite-event-slice';
import { setEvents } from '@/app/redux/features/event-slice';
import { setIsModelOpen, setLoading } from '@/app/redux/features/loader-slice';
import { EventState } from '@/app/redux/features/data-types';
import { MdPinDrop } from 'react-icons/md';

interface ModalItems {
  show: boolean;
  setShow: Function;
  // event: Event;
}

const Modal = () => {
  const showModal: boolean = useAppSelector(
    (state) => state.loadingReducer.showModal
  );
  const event: EventState = useAppSelector(
    (state) => state.loadingReducer.event
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleCloseModal = async () => {
    dispatch(setIsModelOpen());
  };
  const dateTime = new Date(event.start);
  const day = dateTime.getDate();
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  const padWithZero = (value: number) => (value < 10 ? `0${value}` : value);

  console.log('showModal:', showModal);
  return (
    <>
      {showModal && (
        <div className={`${classes.modalWrapper} z-50`}>
          <div className={classes.modal}>
            <RxCross1
              onClick={() => handleCloseModal()}
              className={`${classes.btnClose} font-bold`}
              size={40}
            />
            <div className={`w-full p-12 classes.test`}>
              <div className={`flex pb-5 w-full justify-between `}>
                <div className={`flex-start w-3/5 font-bold text-3xl`}>
                  {event.title}
                </div>
                <div className={`flex-end w-2/5 font-bold text-right text-xl`}>
                  {`${day}-${month}-${year}, ${padWithZero(
                    hours
                  )}:${padWithZero(minutes)}`}
                </div>
              </div>
              <div className="text-2xl font-normal">
                Category: <span className="font-normal">{event.category}</span>
              </div>
              <div className="pt-5 text-2xl pb-2 font-semibold">
                Description:
              </div>
              <div
                className={`${classes.spaceApply} text-slate-500 text-md pb-4`}
              >
                {event.description == ''
                  ? 'No Description Found'
                  : event.description}
              </div>
              <div className=" flex justify-center pt-4 text-slate-500">
                <MdPinDrop size={40} />
                <div className="text-3xl font-bold pl-2">{event.country}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
