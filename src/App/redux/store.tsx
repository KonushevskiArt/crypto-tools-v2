import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from "./currencySlice";
import profitTablesReducer from "./profitTablesSlice";
import userReducer from "./userSlice";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'


export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    tables: profitTablesReducer,
    user:  userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useTypedDispatch: () => AppDispatch = useDispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector