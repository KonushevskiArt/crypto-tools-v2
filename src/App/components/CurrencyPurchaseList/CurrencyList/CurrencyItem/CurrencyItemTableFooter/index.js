/* eslint-env browser*/
import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableFooter } from "@mui/material";
import {
  averagePrice,
  totalCosts,
  totalQuantity,
} from "../../../../../Utils/calculations";
import { useTranslation } from "react-i18next";

const CurrencyItemTableFooter = ({ listOfPurchases }) => {
  const { t } = useTranslation();
  return (
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
          {averagePrice(listOfPurchases) || 0}
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
          {totalQuantity(listOfPurchases) || 0}
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
          {totalCosts(listOfPurchases) || 0}
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default CurrencyItemTableFooter;