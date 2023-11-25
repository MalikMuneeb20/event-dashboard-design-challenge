import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './features/event-slice';

import favEventsReducer from './features/favourite-event-slice';
import upcomingEventsReducer from './features/upcoming-event-slice';
import loadingReducer from './features/loader-slice';

import { useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    eventsReducer,
    favEventsReducer,
    upcomingEventsReducer,
    loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
