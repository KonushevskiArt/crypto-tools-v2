/* eslint-env browser */
import * as React from 'react';
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

export default function ProfitTable({ tableId, tableData }) {
  const dispatch = useDispatch();

  const handleRemoveRow = ( rowId ) => {
    dispatch(removeProfitTableRow({ tableId, rowId }))
  }

  return (
    <>
     <Typography sx={{backgroundColor: 'custom.foreground'}} variant="h3" >
        {tableData.name}
      </Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell>Название монеты</TableCell>
              <TableCell align="right">Цена входа</TableCell>
              <TableCell align="right">Цена выхода</TableCell>
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
                      onClick={() => handleRemoveRow(row.rowId)}
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
    </>
  );
}