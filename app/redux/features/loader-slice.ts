import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import './data-types';
import { EventState, LoadingState } from './data-types';

const initialState: LoadingState = {
  loading: true,
  isPopup: false,
  showModal: false,
  event: {
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

export const loading = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
    setIsPopup: (state, action: PayloadAction<{ popup: boolean }>) => {
      state.isPopup = action.payload.popup;
    },
    setIsModelOpen: (state) => {
      state.showModal = !state.showModal;
    },
    addEventToModal: (state, action: PayloadAction<{ result: EventState }>) => {
      state.event.id = action.payload.result.id;
      state.event.title = action.payload.result.title;
      state.event.rank = action.payload.result.rank;
      state.event.start = action.payload.result.start;
      state.event.country = action.payload.result.country;
      state.event.category = action.payload.result.category;
      state.event.description = action.payload.result.description;
      state.event.favourite = action.payload.result.favourite;
    },
  },
});

export const { setLoading, setIsModelOpen, addEventToModal } = loading.actions;
export default loading.reducer;
