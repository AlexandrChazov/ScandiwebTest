import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

export const { increment } = categoriesSlice.actions;
export default categoriesSlice.reducer;
