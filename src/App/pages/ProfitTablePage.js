import React from "react";
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import ProfitTable from "../components/TablesProfitPage/ProfitTable";
import { useSelector } from "react-redux";
import ProfitTableRowCreater from "../components/TablesProfitPage/ProfitTableRowCreater";

const ProfitTablePage = () => {
  let { id }  = useParams();
  const tables = useSelector((state) => state.tables.tables);

  return (
    <Box sx={{ pb: '20px' }}>
      <ProfitTable tableId={id} tableData={tables[id]}  />  
      <ProfitTableRowCreater tableId={id} />
    </Box>
  );
};

export default ProfitTablePage;
