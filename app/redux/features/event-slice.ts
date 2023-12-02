import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EventState, InitialState } from './data-types';

const initialState: InitialState = {
  count: 0,
  value: [],
};

const loadFromLocalStorage = (): InitialState => {
  const storedData = localStorage.getItem('favEvents');
  return storedData ? JSON.parse(storedData) : { favCount: 0, value: [] };
};

export const events = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (
      state,
      action: PayloadAction<{ count: number; results: EventState[] }>
    ) => {
      const loadedState = loadFromLocalStorage();
      state.value = [];
      console.log(action.payload.count);
      state.count = action.payload.count;
      action.payload.results.forEach((result: EventState) => {
        const existingEvent = loadedState.value.find(
          (event) => event.id === result.id
        );
        const existingValue = state.value.find(
          (event) => event.id === result.id
        );

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
      });
    },
    addEventtoFavourite: (state, action: PayloadAction<{ id: String }>) => {
      state.value.forEach((result: EventState) => {
        if (result.id == action.payload.id) {
          result.favourite = !result.favourite;
          console.log(result);
        }
      });
    },
    sortEventinOrder: (
      state,
      action: PayloadAction<{ sortOrder: 'asc' | 'desc' }>
    ) => {
      const { sortOrder } = action.payload;

      state.value.sort((a: EventState, b: EventState) => {
        const order = sortOrder === 'asc' ? 1 : -1;

        return (a.rank - b.rank) * order;
      });
    },
  },
});

export const { setEvents, addEventtoFavourite, sortEventinOrder } =
  events.actions;
export default events.reducer;
