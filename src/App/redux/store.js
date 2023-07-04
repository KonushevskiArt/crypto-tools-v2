import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from "./currencySlice";
import profitTablesReducer from "./profitTablesSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    tables: profitTablesReducer,
    user:  userReducer,
  },
});
