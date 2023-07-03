/* eslint-env browser */ 
import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import PurchaseCreator from "./PurchaseCreator";
import { useSelector } from "react-redux";
import { removePurchase } from "../../../../redux/currencySlice";
import { useDispatch } from "react-redux";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CurrencyItemTableBody from "./CurrencyItemTableBody";
import CurrencyItemTableFooter from "./CurrencyItemTableFooter";
import Button from '@mui/material/Button';
import SortIcon from '@mui/icons-material/Sort';

import { useTranslation } from "react-i18next";

const customSort = ( arr, filter, isAscending ) => {
  if (filter === 'costs') {
    return Array.from(arr).sort(( el1, el2 ) => {
      const costs1 = Number(el1.quantity) * Number(el1.price);
      const costs2 = Number(el2.quantity) * Number(el2.price);

      return isAscending 
      ? Number(costs1) - Number(costs2)
      : Number(costs2) - Number(costs1) 
    })  
  }
  return Array.from(arr).sort(( el1, el2 ) =>  
    isAscending 
    ? Number(el1[filter]) - Number(el2[filter])
    : Number(el2[filter]) - Number(el1[filter]) 
  )
}

const CurrencyItem = ({ currencyId }) => {
  const { t } = useTranslation();

  
  const dispatch = useDispatch();
  
  const listOfPurchases = useSelector((state) => {
    return state.currencies.currencies[currencyId].listOfPurchases;
  });

 
  const [ filteredListOfPurchases, setFilteredListOfPurchases ] = React.useState(Array.from(listOfPurchases));
  const [ isAscending, setAscending ] = React.useState(false);

  React.useEffect(() => {
    setFilteredListOfPurchases(listOfPurchases)
  }, [listOfPurchases])

  const handleClickBy = (evt, filter) => {
    evt.stopPropagation()
    setAscending(!isAscending);
    setFilteredListOfPurchases(customSort(listOfPurchases, filter, isAscending));
  }

  const handleClickByPrice = (evt) => {
    handleClickBy(evt, 'price')
  }

  const handleClickByQuantity = (evt) => {
    handleClickBy(evt, 'quantity')
  }

  const handleClickByDate = (evt) => {
    handleClickBy(evt, 'date')
  }
  
  const handleClickByCosts = (evt) => {
    handleClickBy(evt, 'costs')
  }

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
            <TableCell>
              <Button endIcon={<SortIcon />} onClick={handleClickByDate} variant="text">{t("Date")}</Button>
            </TableCell>
            <TableCell align="center">
              <Button endIcon={<SortIcon />} onClick={handleClickByPrice} variant="text">{t("Price")}</Button>
              </TableCell>
            <TableCell align="center">
              <Button endIcon={<SortIcon />} onClick={handleClickByQuantity} variant="text">{t("Quantity")}</Button>
            </TableCell>
            <TableCell align="center">
              <Button endIcon={<SortIcon />} onClick={handleClickByCosts} variant="text">{t("Costs")}</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <CurrencyItemTableBody listOfPurchases={filteredListOfPurchases} handleRemovePurchase={handleRemovePurchase} />
        <CurrencyItemTableFooter listOfPurchases={listOfPurchases}/>
      </Table>
      <PurchaseCreator currencyId={currencyId} />
    </TableContainer>
  );
};

export default CurrencyItem;
