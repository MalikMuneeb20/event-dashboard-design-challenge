import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EventState {
  title: string;
  id: string;
  rank: number;
  start: string;
  country: string;
  category: string;
  description: string;
  favourite: boolean;
}

interface InitialState {
  favCount: number;
  value: EventState[];
}

const initialState: InitialState = {
  favCount: 0,
  value: [],
};

const loadFromLocalStorage = (): InitialState => {
  const storedData = localStorage.getItem('favEvents');
  return storedData ? JSON.parse(storedData) : { favCount: 0, value: [] };
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
      state.favCount = loadedState.favCount;
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
        state.favCount = state.favCount - 1;
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
        state.favCount = state.favCount + 1;
      }
      saveToLocalStorage(state);
    },
  },
});

export const { setFavEvents, addEventToFavouriteEvents } = favEvents.actions;
export default favEvents.reducer;
