import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import PurchaseCreator from "./PurchaseCreator";
import { removePurchase } from "../../../../redux/currencySlice";
import { useDispatch } from "react-redux";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CurrencyItemTableBody from "./CurrencyItemTableBody";
import CurrencyItemTableFooter from "./CurrencyItemTableFooter";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import { AlertDialog } from "../../../share/ConfirmationDialog";

import { CurrencyLineChart } from "./CurrencyLineChart";
import { useTranslation } from "react-i18next";

import { customSort } from "./customSort";
import { useTypedSelector } from "../../../../redux/store";

interface ICurrencyItemProps {
  currencyId: string
}

export enum EnumFilterOfPurchase {
  date = 'date',
  price = 'price',
  quantity = 'quantity',
  costs = 'costs'
}

const CurrencyItem: React.FC<ICurrencyItemProps> = ({ currencyId }) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = React.useState(false);
  const [removedCurrencyId, setRemovedCurrencyId] = React.useState('');
  
  const dispatch = useDispatch();
  
  const listOfPurchases = useTypedSelector((state) => {
    return state.currencies.currencies[currencyId].listOfPurchases;
  });

 
  const [ filteredListOfPurchases, setFilteredListOfPurchases ] = React.useState(Array.from(listOfPurchases));
  const [ isAscending, setAscending ] = React.useState(false);

  React.useEffect(() => {
    setFilteredListOfPurchases(listOfPurchases)
  }, [listOfPurchases])

  const handleClickBy = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, filter: EnumFilterOfPurchase) => {
    evt.stopPropagation()
    setAscending(!isAscending);
    setFilteredListOfPurchases(customSort(listOfPurchases, filter, isAscending));
  }

  const handleClickByPrice = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleClickBy(evt, EnumFilterOfPurchase.price)
  }

  const handleClickByQuantity = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleClickBy(evt, EnumFilterOfPurchase.quantity)
  }

  const handleClickByDate = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleClickBy(evt, EnumFilterOfPurchase.date)
  }
  
  const handleClickByCosts = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleClickBy(evt, EnumFilterOfPurchase.costs)
  }

  const handleRemovePurchase = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    evt.stopPropagation();
    evt.preventDefault();
    setRemovedCurrencyId(id);
    setOpen(true);
  };

  const ProvedRemoveCurrency = (id: string) => {
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
                onClick={(evt) => handleClickByPrice(evt)} 
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
      <PurchaseCreator id={currencyId} />

      <Box>
        <CurrencyLineChart listOfPurchases={filteredListOfPurchases} />
      </Box>

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
