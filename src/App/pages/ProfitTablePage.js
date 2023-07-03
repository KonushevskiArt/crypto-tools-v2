import React from "react";
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import ProfitTable from "../components/TablesProfitPage/ProfitTable";
import { useSelector } from "react-redux";
import ProfitTableRowCreator from "../components/TablesProfitPage/ProfitTableRowCreator";

const ProfitTablePage = () => {
  let { id }  = useParams();
  const tables = useSelector((state) => state.tables.tables);

  return (
    <Box sx={{ pb: '20px', pt: '20px', pr: '20px', width: '100%' }}>
      <ProfitTable tableId={id} tableData={tables[id]}  />  
      <ProfitTableRowCreator tableId={id} />
    </Box>
  );
};

export default ProfitTablePage;
