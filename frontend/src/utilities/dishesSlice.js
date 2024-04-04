import { createSlice } from '@reduxjs/toolkit';

const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {},
  reducers: {
    increaseQuantity: (state, action) => {
      const id = action.payload;
      state[id] = (state[id] || 0) + 1;
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      if (state[id] > 1) {
        state[id] -= 1;
      } else {
        delete state[id];
      }
    },
    reset: () => {},
  },
});

export const { increaseQuantity, decreaseQuantity, reset } = dishesSlice.actions;

export default dishesSlice.reducer;
