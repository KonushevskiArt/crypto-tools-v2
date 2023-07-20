import React from 'react';
import TableBody from "@mui/material/TableBody";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { IPurchase } from '../../../../../shareTypes';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface ICurrencyItemTableBodyProps {
  listOfPurchases: IPurchase[],
  handleRemovePurchase: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void
}

const CurrencyItemTableBody: React.FC<ICurrencyItemTableBodyProps> = ({ listOfPurchases, handleRemovePurchase }) => {
  return (
    <TableBody>
      {listOfPurchases
        ? listOfPurchases
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
  );
};

export default CurrencyItemTableBody;