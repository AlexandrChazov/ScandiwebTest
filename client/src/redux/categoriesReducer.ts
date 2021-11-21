import {ProductType} from "../Types/types";
import {InferActionsTypes} from "./redux-store";

const initialState = {
  name: "" as string,
  products: [] as Array<ProductType>
}

type InitialStateType = typeof initialState;

export const categoriesActions = {
  setCategory: (name: string) => ({type: "SET_CATEGORY", name} as const)
}

export const categoriesReducer = (state = initialState, action: ActionsType):InitialStateType => {
  switch (action.type) {
    case "SET_CATEGORY": {
      return {
        ...state,
        name: action.name
      }
    };
    default: {
      return state
    }
  }
}

type ActionsType = InferActionsTypes<typeof categoriesActions>;