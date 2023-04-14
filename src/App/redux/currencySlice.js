/*eslint-env browser*/
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  currencies: {},
};

const storage = JSON.parse(localStorage.getItem("currencies"));

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState:
    storage === null
      ? initialState
      : { currencies: storage },
  reducers: {
    addCurrency: (state, action) => {
      const { name } = action.payload;
      const id = uuidv4();
      state.currencies[id] = { id, name, listOfPurchases: []};
      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    editCurrencyName: (state, action) => {
      const { newName, id } = action.payload;

      const stateCurrencies = state.currencies[id];
      stateCurrencies.name = newName;

      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    addPurchase: (state, action) => {
      const { currencyId, price, quantity, date } = action.payload;
      state.currencies[currencyId].listOfPurchases.push({
        date: date,
        price: price,
        quantity: quantity,
        id: uuidv4(),
      });
      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    removePurchase: (state, action) => {
      const { currencyId, purchaseId } = action.payload;

      const listOfPurchases = state.currencies[currencyId].listOfPurchases;

      const idx = listOfPurchases.findIndex((purchase) => purchaseId === purchase.id);

      const newlistOfPurchases = [
        ...listOfPurchases.slice(0, idx),
        ...listOfPurchases.slice(idx + 1),
      ];

      state.currencies[currencyId].listOfPurchases = newlistOfPurchases;

      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    removeCurrency: (state, action) => {
      delete state.currencies[action.payload.currencyId];

      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
  },
});

export const {
  editCurrencyName,
  addCurrency,
  addPurchase,
  removeCurrency,
  removePurchase,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
