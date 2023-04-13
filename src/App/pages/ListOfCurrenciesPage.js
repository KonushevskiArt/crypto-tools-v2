import React from "react";
import CurrencyList from "../components/CurrencyPurchaseList/CurrencyList";
import CurrencyCreater from "../components/CurrencyPurchaseList/CurrencyCreater";

const ListOfCurrenciesPage = () => {

  return (
    <>
      <CurrencyList />
      <CurrencyCreater />
    </>
  );
};

export default ListOfCurrenciesPage;
