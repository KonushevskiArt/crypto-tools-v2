import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import PurchaseCreater from "../PurchaseCreater";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { removePurchase } from "../../../redux/currencySlice";
import { useDispatch } from "react-redux";
import { TableFooter } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
  averagePrice,
  totalCosts,
  totalQuantity,
} from "../../../Utils/calculations";

import { useTranslation } from "react-i18next";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CurrencyItem = ({ name }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const currencyData = useSelector((state) => {
    return state.currencies.currencies[name];
  });

  const handleRemovePurchase = (e, id) => {
    e.preventDefault();
    dispatch(removePurchase({ name, id }));
  };

  const purchasesComparison = (purchase1, purchase2) => {
    const date1 = Number(purchase1.date);
    const date2 = Number(purchase2.date);
    if (date1 < date2) {
      return -1;
    }
    return 1;
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
        <TableBody>
          {currencyData
            ? Array.from(currencyData)
                .sort(purchasesComparison)
                .map(({ date, price, quantity, id }) => (
                  <StyledTableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        color: "rgba(0, 0, 0, 0.9)",
                      }}
                    >
                      {new Date(date).toLocaleDateString("ru-RU")}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        color: "rgba(0, 0, 0, 0.9)",
                      }}
                    >
                      {price}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        color: "rgba(0, 0, 0, 0.9)",
                      }}
                    >
                      {quantity}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        color: "rgba(0, 0, 0, 0.9)",
                      }}
                    >
                      {parseFloat((price * quantity).toFixed(4))}
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={(e) => handleRemovePurchase(e, id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </StyledTableRow>
                ))
            : null}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              sx={{
                fontSize: "1rem",
                fontWeight: "700",
                textDecoration: "underline",
                color: "rgba(0, 0, 0, 0.9)",
              }}
            >
              {t("Outcome")}
            </TableCell>
            <TableCell
              sx={{
                fontSize: "1rem",
                fontWeight: "700",
                textDecoration: "underline",
                color: "rgba(0, 0, 0, 0.9)",
              }}
              align="center"
            >
              {averagePrice(currencyData) || 0}
            </TableCell>
            <TableCell
              sx={{
                fontSize: "1rem",
                fontWeight: "700",
                textDecoration: "underline",
                color: "rgba(0, 0, 0, 0.9)",
              }}
              align="center"
            >
              {totalQuantity(currencyData) || 0}
            </TableCell>
            <TableCell
              sx={{
                fontSize: "1rem",
                fontWeight: "700",
                textDecoration: "underline",
                color: "rgba(0, 0, 0, 0.9)",
              }}
              align="center"
            >
              {totalCosts(currencyData) || 0}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <PurchaseCreater name={name} />
    </TableContainer>
  );
};

export default CurrencyItem;
