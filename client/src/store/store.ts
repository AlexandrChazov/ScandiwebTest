import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./reducers/categoriesSlice";
import headerReducer from "./reducers/headerSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    header: headerReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
