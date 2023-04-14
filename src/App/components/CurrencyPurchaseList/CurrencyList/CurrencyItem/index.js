/* eslint-env browser */ 
import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import PurchaseCreater from "./PurchaseCreater";
import { useSelector } from "react-redux";
import { removePurchase } from "../../../../redux/currencySlice";
import { useDispatch } from "react-redux";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CurrencyItemTableBody from "./CurrencyItemTableBody";
import CurrencyItemTableFooter from "./CurrencyItemTableFooter";

import { useTranslation } from "react-i18next";

const CurrencyItem = ({ currencyId }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const listOfPurchases = useSelector((state) => {
    return state.currencies.currencies[currencyId].listOfPurchases;
  });

  const handleRemovePurchase = (e, purchaseId) => {
    e.preventDefault();
    dispatch(removePurchase({ currencyId, purchaseId }));
  };

  return (
    <TableContainer
      sx={{ backgroundColor: "custom.foreground" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t("Date")}</TableCell>
            <TableCell align="center">{t("Price")}</TableCell>
            <TableCell align="center">{t("Quantity")}</TableCell>
            <TableCell align="center">{t("Costs")}</TableCell>
          </TableRow>
        </TableHead>
        <CurrencyItemTableBody listOfPurchases={listOfPurchases} handleRemovePurchase={handleRemovePurchase} />
        <CurrencyItemTableFooter listOfPurchases={listOfPurchases}/>
      </Table>
      <PurchaseCreater currencyId={currencyId} />
    </TableContainer>
  );
};

export default CurrencyItem;
