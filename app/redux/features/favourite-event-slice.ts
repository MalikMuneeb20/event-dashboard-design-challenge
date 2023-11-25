import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import './data-types';
import { EventState, InitialState } from './data-types';

const initialState: InitialState = {
  count: 0,
  value: [],
};

const loadFromLocalStorage = (): InitialState => {
  const storedData = localStorage.getItem('favEvents');
  return storedData ? JSON.parse(storedData) : { count: 0, value: [] };
};

const saveToLocalStorage = (state: InitialState) => {
  localStorage.setItem('favEvents', JSON.stringify(state));
};

export const favEvents = createSlice({
  name: 'favEvents',
  initialState,
  reducers: {
    setFavEvents: (state) => {
      const loadedState = loadFromLocalStorage();
      state.count = loadedState.count;
      state.value = loadedState.value;
    },
    addEventToFavouriteEvents: (
      state,
      action: PayloadAction<{ result: EventState }>
    ) => {
      const selectedValue = state.value.find(
        (event) => action.payload.result.id === event.id
      );
      if (selectedValue) {
        const updatedValue = state.value.filter(
          (event) => event.id !== action.payload.result.id
        );
        state.value = updatedValue;
        state.count = state.count - 1;
      } else {
        state.value.push({
          id: action.payload.result.id,
          title: action.payload.result.title,
          rank: action.payload.result.rank,
          start: action.payload.result.start,
          country: action.payload.result.country,
          category: action.payload.result.category,
          description: action.payload.result.description,
          favourite: true,
        });
        state.count = state.count + 1;
      }
      saveToLocalStorage(state);
    },
  },
});

export const { setFavEvents, addEventToFavouriteEvents } = favEvents.actions;
export default favEvents.reducer;
