import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>(); // just typed dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // typescript will suggest us fields of store
