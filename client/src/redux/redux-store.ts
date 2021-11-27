import { combineReducers, createStore } from "redux";
import { categoriesReducer } from "./categoriesReducer";

const reducers = combineReducers({
  categoriesPage: categoriesReducer,
});

export const store = createStore(reducers);

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
