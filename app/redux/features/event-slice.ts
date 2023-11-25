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
  count: number;
  value: EventState[];
}

const initialState: InitialState = {
  count: 0,
  value: [],
};

export const events = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (
      state,
      action: PayloadAction<{ count: number; results: EventState[] }>
    ) => {
      console.log(action.payload.count);
      state.count = action.payload.count;
      action.payload.results.forEach((result: EventState) => {
        state.value.push({
          title: result.title,
          id: result.id,
          rank: result.rank,
          start: result.start,
          country: result.country,
          category: result.category,
          description: result.description,
          favourite: false,
        });
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
  },
});

export const { setEvents, addEventtoFavourite } = events.actions;
export default events.reducer;
