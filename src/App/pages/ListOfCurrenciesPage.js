import React from "react";
import CurrencyList from "../components/CurrencyPurchaseList/CurrencyList";
import CurrencyCreator from "../components/CurrencyPurchaseList/CurrencyCreator";
import { Box } from "@mui/material";

const ListOfCurrenciesPage = () => {

  return (
    <Box sx={{display: 'grid', width: '100%', pr: '20px', pt: '20px' }}>
      <CurrencyList />
      <CurrencyCreator />
    </Box>
  );
};

export default ListOfCurrenciesPage;
