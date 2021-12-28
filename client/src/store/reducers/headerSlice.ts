import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AvailableCurrency } from "../../models/IProducts";

interface Header {
  currency: AvailableCurrency;
}

const initialState: Header = {
  currency: "USD"
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<AvailableCurrency>) => {
      state.currency = action.payload;
    }
  }
});

export const { setCurrency } = headerSlice.actions;
export default headerSlice.reducer;
