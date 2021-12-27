import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Header {
  currency: "USD" | "EUR" | "JPY";
}

const initialState: Header = {
  currency: "USD"
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<"USD" | "EUR" | "JPY">) => {
      state.currency = action.payload;
    }
  }
});

export const { setCurrency } = headerSlice.actions;
export default headerSlice.reducer;
