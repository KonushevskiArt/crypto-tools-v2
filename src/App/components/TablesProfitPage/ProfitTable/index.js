import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { removeProfitTableRow } from '../../../redux/profitTablesSlice';
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import AlertDialog from '../../share/ConfirmationDialog';

export default function ProfitTable({ tableId, tableData }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);

  const [idOfWillDeletedRow, setIdOfWillDeletedRow] = useState(null);
  const [nameOfWillDeletedRow, setNameOfWillDeletedRow] = useState(null);

  const handleRemoveRow = (evt, id, name) => {
    evt.stopPropagation();
    evt.preventDefault();
    setOpen(true);
    setIdOfWillDeletedRow(id);
    setNameOfWillDeletedRow(name)
  };
  
  const ProvedRemoveRow = () => {
    dispatch(removeProfitTableRow({ tableId, idOfWillDeletedRow }))
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogeTitle = (`Do you want to remove the row ${nameOfWillDeletedRow} ?`);


  return (
    <>
     <Typography sx={{backgroundColor: 'custom.foreground'}} variant="h3" >
        {tableData.name}
      </Typography>
      <TableContainer component={Paper} >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell>{t("Label_name")}</TableCell>
              <TableCell align="right">{t("EntryPrice")}</TableCell>
              <TableCell align="right">{t("ClosingPrice")}</TableCell>
              <TableCell align="right">SL</TableCell>
              <TableCell align="right">BY ?</TableCell>
              <TableCell align="right">TP1</TableCell>
              <TableCell align="right">TP2</TableCell>
              <TableCell align="right">TP3</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.table.map((row) => (
              <TableRow
                hover
                key={row.coinName + Date.now() + Math.random()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: 'bold', fontSize: '22px' }}>{row.coinName}</Typography>
                </TableCell>
                <TableCell align="right">{row.entryPrice}</TableCell>
                <TableCell align="right">{row.exitPrice}</TableCell>
                <TableCell align="right">{row.sl}</TableCell>
                <TableCell align="right">{row.by}</TableCell>
                <TableCell align="right">{row.tp1}</TableCell>
                <TableCell align="right">{row.tp2}</TableCell>
                <TableCell align="right">{row.tp3}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      size="small"
                      onClick={(evt) => handleRemoveRow(evt, row.rowId, row.coinName)}
                    >
                      < DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AlertDialog
        isOpen={isOpen}
        handleClose={handleClose}
        handleAccept={() => ProvedRemoveRow()}
        title={dialogeTitle}
      />
    </>
  );
}