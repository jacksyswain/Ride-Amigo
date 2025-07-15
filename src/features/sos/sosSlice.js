import { createSlice } from '@reduxjs/toolkit';

const initialNumbers = JSON.parse(localStorage.getItem('sosNumbers')) || [];

const sosSlice = createSlice({
  name: 'sos',
  initialState: {
    numbers: initialNumbers,
  },
  reducers: {
    addNumber: (state, action) => {
      state.numbers.push(action.payload);
      localStorage.setItem('sosNumbers', JSON.stringify(state.numbers));
    },
    removeNumber: (state, action) => {
      state.numbers.splice(action.payload, 1);
      localStorage.setItem('sosNumbers', JSON.stringify(state.numbers));
    },
    resetNumbers: (state) => {
      state.numbers = [];
      localStorage.removeItem('sosNumbers');
    },
  },
});

export const { addNumber, removeNumber, resetNumbers } = sosSlice.actions;
export default sosSlice.reducer;