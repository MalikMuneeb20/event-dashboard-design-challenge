// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface EventState {
//   title: String;
//   rank: Number;
//   start: String;
//   country: String;
//   category: String;
//   description: String;
// }

// interface InitialState {
//   count: Number;
//   value: EventState[];
//   //   value: EventState;
// }
// // title: '',
// //     rank: 0,
// //     dateTime: '',
// //     country: '',
// //     category: '',
// //     description: '',
// const initialState = {
//   count: 0,
//   value: [],
// } as InitialState;

// export const events = createSlice({
//   name: 'events',
//   initialState,
//   reducers: {
//     setEvents: (
//       state,
//       action: PayloadAction<{ count: number; results: EventState[] }>
//     ) => {
//       state.count = action.payload.count;
//       state.value = [...state.value, ...action.payload.results];
//     },
//     // setEvents: (state, action) => {
//     //   state.count = action.payload.count;
//     //   action.payload.results.forEach((result: EventState) => {
//     //     state.value.push({
//     //       title: result.title,
//     //       rank: result.rank,
//     //       dateTime: result.dateTime,
//     //       country: result.country,
//     //       category: result.category,
//     //       description: result.description,
//     //     });
//     //   });
//     // },
//     // unSetEvents: (state, action) => {},
//   },
// });

// export const { setEvents } = events.actions;
// export default events.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EventState {
  title: string;
  rank: number;
  start: string;
  country: string;
  category: string;
  description: string;
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
          rank: result.rank,
          start: result.start,
          country: result.country,
          category: result.category,
          description: result.description,
        });
      });
    },
    // unSetEvents: (state, action) => {},
  },
});

export const { setEvents } = events.actions;
export default events.reducer;
