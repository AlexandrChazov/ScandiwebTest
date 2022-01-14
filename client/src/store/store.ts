import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./reducers/headerSlice";
import cartReducer from "./reducers/cartSlice";

export const store = configureStore({
  reducer: {
    header: headerReducer,
    cart: cartReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;
