import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from "./currencySlice";
import profitTablesReducer from "./profitTablesSlice";

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    tables: profitTablesReducer,
  },
});
