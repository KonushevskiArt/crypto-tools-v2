/*eslint-env browser*/
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  tables: {
    "1b048dfc-ee98-4a45-ad92-b38069b4401c":
    {
      "table":[
        {coinName: 'BTC', entryPrice: 20232, rowId: '1234', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'BTh', entryPrice: 20232, rowId: '12345', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'BTC3', entryPrice: 20232, rowId: '12346', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'BTC', entryPrice: 20232, rowId: '12347', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'BTC1', entryPrice: 20232, rowId: '12348', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256}
        
      ],
      "date":1681236706000,
      "name":"fdsf3242"
    },
    "1b048dfc-ee98-4a45-ad92-bfgdfg3434":
    {
      "table":[
        {coinName: 'ETH', entryPrice: 20232, rowId: '12349', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'ETH', entryPrice: 20232, rowId: '123412', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'ETH', entryPrice: 20232, rowId: '123413', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'BTC', entryPrice: 20232, rowId: '123414', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'BTC', entryPrice: 20232, rowId: '123415', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256}
      ],
      "date":1681236706000,
      "name":"fdsf3242"
    },
    "1b048dfc-ee98-4a45-ad92-b3802344ssf1c":
    {
      "table":[
        {coinName: 'BTY', entryPrice: 20232, rowId: '123423', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'BTY', entryPrice: 20232, rowId: '123424', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'BTY', entryPrice: 20232, rowId: '123425', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'BTC', entryPrice: 20232, rowId: '123426', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256},
        {coinName: 'BTC', entryPrice: 20232, rowId: '123427', exitPrice: 12008, sl: 24, by: 234, tp1: 223, tp2: 228, tp3: 256}
      ],
      "date":1681236706000,
      "name":"fdsf3242"
    },
  },
};

const storage = JSON.parse(localStorage.getItem("profitTables"));

export const profitTablesSlice = createSlice({
  name: "profitTables",
  initialState: storage === null ? initialState : { tables: storage },
  reducers: {
    addProfitTable: (state, action) => {
      const { name } = action.payload;
      const date = Date.parse(new Date());
      const id = uuidv4();
      state.tables[id] = { table: [], date, name };
      const newState = JSON.stringify({ ...state.tables });

      localStorage.setItem("profitTables", newState);
    },
    editProfitTableName: (state, action) => {
      const { newName, id } = action.payload;

      const stateTable = state.tables[id];
      stateTable.name = newName;
      const newState = JSON.stringify({ ...state.tables });

      localStorage.setItem("profitTables", newState);
    },
    removeProfitTable: (state, action) => {
      delete state.tables[action.payload.id];

      const newState = JSON.stringify({ ...state.tables });

      localStorage.setItem("profitTables", newState);
    },
    addProfitTableRow: (state, action) => {
      const { tableId, coinName, entryPrice, exitPrice, sl, by, tp1, tp2, tp3 } = action.payload;
      state.tables[tableId].table.push(
        {
          coinName,
          entryPrice, 
          exitPrice,
          sl,
          by,
          tp1,
          tp2,
          tp3,
          rowId: uuidv4(),
        }
      );
      const newState = JSON.stringify({ ...state.tables });

      localStorage.setItem('profitTables', newState);
    },
    removeProfitTableRow: (state, action) => {
      const { tableId, rowId } = action.payload;

      const rowList = state.tables[tableId].table;

      const idx = rowList.findIndex((row) => rowId === row.rowId);

      const newRowList = [
        ...rowList.slice(0, idx),
        ...rowList.slice(idx + 1),
      ];

      state.tables[tableId].table = newRowList;

      const newState = JSON.stringify({ ...state.tables });

      localStorage.setItem('profitTables', newState);

    },
  },
});

export const { editProfitTableName, addProfitTable, removeProfitTable, addProfitTableRow, removeProfitTableRow } =
  profitTablesSlice.actions;

export default profitTablesSlice.reducer;
