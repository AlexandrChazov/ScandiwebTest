import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Price } from "../../models/IProducts";

export type SelectedProductType = {
  brand: string;
  prices: Price[];
  count: number;
  attributes: { [key: string]: string };
  image: string[];
};

type InitialStateType = {
  selectedProducts: { [key: string]: SelectedProductType };
  cartItemsCount: number;
};

const selectedProducts = JSON.parse(
  localStorage.getItem("selectedProducts") as string
);
const goodsCount = selectedProducts && Object.keys(selectedProducts).length;

const initialState: InitialStateType = {
  selectedProducts,
  cartItemsCount: goodsCount
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    setCartItemsCount: (state, action: PayloadAction<number>) => {
      state.cartItemsCount = action.payload;
    }
  }
});

export const { setSelectedProducts, setCartItemsCount } = cartSlice.actions;
export default cartSlice.reducer;
