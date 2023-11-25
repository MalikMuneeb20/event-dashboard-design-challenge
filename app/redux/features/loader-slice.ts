import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import './data-types';
import { LoadingState } from './data-types';

const initialState: LoadingState = {
  loading: true,
};

export const loading = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
  },
});

export const { setLoading } = loading.actions;
export default loading.reducer;
