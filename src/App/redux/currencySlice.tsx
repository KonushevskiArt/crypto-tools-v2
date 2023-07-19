import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICurrencies, IPurchase } from "../shareTypes";

interface IState {
  currencies: ICurrencies
}

const initialState: IState = {
  currencies: {},
};

const storage = JSON.parse(localStorage.getItem("currencies") as string) as ICurrencies | null;

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState:
    storage === null
      ? initialState
      : { currencies: storage },
  reducers: {
    updateCurrenciesState: (state, action: PayloadAction<{currencies: ICurrencies}>) => {
      const { currencies } = action.payload;
      state.currencies = {...currencies};
      localStorage.setItem('currencies', JSON.stringify(currencies))
    },
    addCurrency: (state, action: PayloadAction<{name: string}>) => {
      const { name } = action.payload;
      const id = uuidv4();
      state.currencies[id] = { id, name, listOfPurchases: []};
      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    editCurrencyName: (state, action: PayloadAction<{newName: string, id: string}>) => {
      const { newName, id } = action.payload;

      const stateCurrencies = state.currencies[id];
      stateCurrencies.name = newName;

      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    addPurchase: (state, action: PayloadAction<IPurchase>) => {
      const { id, price, quantity, date } = action.payload;
      state.currencies[id].listOfPurchases.push({
        date: date,
        price: price,
        quantity: quantity,
        id: uuidv4(),
      });
      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    removePurchase: (state, action: PayloadAction<{currencyId: string, purchaseId: string}>) => {
      const { currencyId, purchaseId } = action.payload;

      const listOfPurchases = state.currencies[currencyId].listOfPurchases;

      const idx: number = listOfPurchases.findIndex((purchase) => purchaseId === purchase.id);

      const newlistOfPurchases = [
        ...listOfPurchases.slice(0, idx),
        ...listOfPurchases.slice(idx + 1),
      ];

      state.currencies[currencyId].listOfPurchases = newlistOfPurchases;

      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    removeCurrency: (state, action: PayloadAction<{ id: string}>) => {
      delete state.currencies[action.payload.id];
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
  updateCurrenciesState,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
