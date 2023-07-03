import React from "react";
import CurrencyList from "../components/CurrencyPurchaseList/CurrencyList";
import CurrencyCreator from "../components/CurrencyPurchaseList/CurrencyCreator";

const ListOfCurrenciesPage = () => {

  return (
    <>
      <CurrencyList />
      <CurrencyCreator />
    </>
  );
};

export default ListOfCurrenciesPage;
