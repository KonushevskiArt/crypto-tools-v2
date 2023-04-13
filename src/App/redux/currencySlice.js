/*eslint-env browser*/
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  currencies: {},
  opendAccordions: {},
};

const storage = JSON.parse(localStorage.getItem("currencies"));

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState:
    storage === null
      ? initialState
      : { currencies: storage, opendAccordions: {} },
  reducers: {
    addCurrency: (state, action) => {
      const { name } = action.payload;
      console.log(name)
      state.currencies[name] = [];
      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    editCurrencyName: (state, action) => {
      const { newName, oldName } = action.payload;

      const stateCurrencie = state.currencies[oldName];
      state.currencies[newName] = stateCurrencie;

      delete state.currencies[oldName];

      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    addPurchase: (state, action) => {
      const { name, price, quantity, date } = action.payload;
      state.currencies[name].push({
        date: date,
        price: price,
        quantity: quantity,
        id: uuidv4(),
      });
      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    removePurchase: (state, action) => {
      const { name, id } = action.payload;

      const purchaseList = state.currencies[name];

      const idx = purchaseList.findIndex((purchase) => id === purchase.id);

      const newPurchaseList = [
        ...purchaseList.slice(0, idx),
        ...purchaseList.slice(idx + 1),
      ];

      state.currencies[name] = newPurchaseList;

      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    removeCurrency: (state, action) => {
      delete state.currencies[action.payload.name];

      const newState = JSON.stringify({ ...state.currencies });

      localStorage.setItem("currencies", newState);
    },
    toggleAccardion: (state, action) => {
      const currentValue = state.opendAccordions[action.payload.name];
      if (currentValue) {
        state.opendAccordions[action.payload.name] = currentValue
          ? false
          : true;
      } else {
        state.opendAccordions[action.payload.name] = true;
      }
    },
  },
});

export const {
  editCurrencyName,
  addCurrency,
  addPurchase,
  removeCurrency,
  removePurchase,
  toggleAccardion,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
