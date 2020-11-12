import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    currentPage: '',
    userData: {}
  },
  reducers: {
    setAppSliceState: (state, { payload }) => {

      // If changing more than one key/value pair
      if (Array.isArray(payload[0])) {
        payload.forEach((keyValuePair) => {
          const [key, value] = keyValuePair;
          state[key] = value;
        });
      }

      // If only changing one set
      else {
        const [key, value] = payload;
        state[key] = value;
      }
    }
  }
});

export const {
  actions: { setAppSliceState }
} = appSlice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectApp = (state) => state.app;

export default appSlice.reducer;
