import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import './data-types';
import { EventState, InitialState, InitialUpcomingState } from './data-types';

const initialState: InitialUpcomingState = {
  count: 0,
  value: [],
  eventOfMonth: {
    title: '',
    id: '',
    rank: 0,
    start: '',
    country: '',
    category: '',
    description: '',
    favourite: false,
  },
};

const loadFromLocalStorage = (): InitialUpcomingState => {
  const storedData = localStorage.getItem('favEvents');
  return storedData ? JSON.parse(storedData) : { favCount: 0, value: [] };
};

export const upcomingEvents = createSlice({
  name: 'upcomingEvents',
  initialState,
  reducers: {
    setUpcomingEvents: (
      state,
      action: PayloadAction<{
        results: EventState[];
      }>
    ) => {
      const loadedState = loadFromLocalStorage();
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      state.value = [];
      state.count = 0;

      action.payload.results.forEach((result: EventState) => {
        const existingEvent = loadedState.value.find(
          (event) => event.id === result.id
        );

        const existingValue = state.value.find(
          (event) => event.id === result.id
        );

        const eventDate = new Date(result.start);
        const eventYear = new Date(result.start).getFullYear();
        const eventMonth = new Date(result.start).getMonth() + 1;

        if (eventMonth == currentMonth) {
          state.count += 1;
        }

        if (eventDate >= currentDate) {
          if (!existingValue) {
            state.value.push({
              title: result.title,
              id: result.id,
              rank: result.rank,
              start: result.start,
              country: result.country,
              category: result.category,
              description: result.description,
              favourite: existingEvent ? existingEvent.favourite : false,
            });
          }
        }
      });
    },

    addUpcomingEventtoFavourite: (
      state,
      action: PayloadAction<{ id: String }>
    ) => {
      state.value.forEach((result: EventState) => {
        if (result.id == action.payload.id) {
          result.favourite = !result.favourite;
          console.log(result);
        }
      });
    },

    setEventOfTheMonth: (
      state,
      action: PayloadAction<{
        results: EventState[];
      }>
    ) => {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      console.log('Current Month:', currentMonth);
      console.log('Current Year:', currentYear);

      const filteredEvents = action.payload.results.filter(
        (event) =>
          new Date(event.start).getMonth() + 1 === currentMonth &&
          new Date(event.start).getFullYear() === currentYear
      );

      console.log('Filtered Events:', filteredEvents);

      if (filteredEvents.length > 0) {
        const eventOfTheMonth = filteredEvents.reduce(
          (maxEvent, currentEvent) =>
            currentEvent.rank > maxEvent.rank ? currentEvent : maxEvent,
          action.payload.results[0]
        );

        console.log('Event of the Month:', eventOfTheMonth);

        state.eventOfMonth = {
          title: eventOfTheMonth.title,
          id: eventOfTheMonth.id,
          rank: eventOfTheMonth.rank,
          start: eventOfTheMonth.start,
          country: eventOfTheMonth.country,
          category: eventOfTheMonth.category,
          description: eventOfTheMonth.description,
          favourite: eventOfTheMonth.favourite,
        };
      }
    },
  },
});

export const {
  setUpcomingEvents,
  addUpcomingEventtoFavourite,
  setEventOfTheMonth,
} = upcomingEvents.actions;
export default upcomingEvents.reducer;
