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

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import AlertDialog from "../../../share/ConfirmationDialog";


import { useTranslation } from "react-i18next";

import { customSort } from "./customSort";


const CurrencyItem = ({ currencyId }) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = React.useState(false);
  const [removedCurrencyId, setRemovedCurrencyId] = React.useState(null);
  
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

  const handleRemovePurchase = (evt, id) => {
    evt.stopPropagation();
    evt.preventDefault();
    setRemovedCurrencyId(id);
    setOpen(true);
  };

  const ProvedRemoveCurrency = (id) => {
    dispatch(removePurchase({ currencyId, purchaseId: id }));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogeTitle = ("Do you want to remove the purchase ?");

  return (
    <TableContainer
      sx={{ backgroundColor: "custom.foreground" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Button 
                endIcon={ isAscending ? <TrendingUpIcon /> : <TrendingDownIcon />} 
                onClick={handleClickByDate} 
                variant="text">
                {t("Date")}
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button 
                endIcon={ isAscending ? <TrendingUpIcon /> : <TrendingDownIcon />} 
                onClick={handleClickByPrice} 
                variant="text">{t("Price")}</Button>
              </TableCell>
            <TableCell align="center">
              <Button 
                endIcon={ isAscending ? <TrendingUpIcon /> : <TrendingDownIcon />} 
                onClick={handleClickByQuantity}
                variant="text">
                  {t("Quantity")}
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button 
                endIcon={ isAscending ? <TrendingUpIcon /> : <TrendingDownIcon />} 
                onClick={handleClickByCosts} 
                variant="text">
                  {t("Costs")}
                </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <CurrencyItemTableBody listOfPurchases={filteredListOfPurchases} handleRemovePurchase={handleRemovePurchase} />
        <CurrencyItemTableFooter listOfPurchases={listOfPurchases}/>
      </Table>
      <PurchaseCreator currencyId={currencyId} />
      <AlertDialog
        isOpen={isOpen}
        handleClose={handleClose}
        handleAccept={() => ProvedRemoveCurrency(removedCurrencyId)}
        title={dialogeTitle}
      />
    </TableContainer>
  );
};

export default CurrencyItem;
