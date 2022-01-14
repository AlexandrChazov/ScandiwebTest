import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AvailableCurrency } from "../../models/IProducts";
import { ISelectedProducts } from "../../Components/Cart/Cart";

const selectedProducts = JSON.parse(
  localStorage.getItem("selectedProducts") as string
) as ISelectedProducts;
const goodsCount = selectedProducts && Object.keys(selectedProducts).length;

interface Header {
  currency: AvailableCurrency;
  cartItemsCount: number;
}

const initialState: Header = {
  currency: "USD",
  cartItemsCount: goodsCount
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<AvailableCurrency>) => {
      state.currency = action.payload;
    },
    setCartItemsCount: (state, action: PayloadAction<number>) => {
      state.cartItemsCount = action.payload;
    }
  }
});

export const { setCurrency, setCartItemsCount } = headerSlice.actions;
export default headerSlice.reducer;
