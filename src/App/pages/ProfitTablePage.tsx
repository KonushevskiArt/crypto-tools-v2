import React from "react";
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { ProfitTable } from "../components/TablesProfitPage/ProfitTable";
import ProfitTableRowCreator from "../components/TablesProfitPage/ProfitTableRowCreator";
import { useTypedSelector } from "../redux/store";

const ProfitTablePage: React.FC = () => {
  const { id } = useParams();
  const tables = useTypedSelector((state) => state.tables.tables);

  const provedId = id as string;

  return (
    <Box sx={{ pb: '20px', pt: '20px', pr: '20px', width: '100%' }}>
      <ProfitTable tableId={provedId} tableData={tables[provedId]}  />  
      <ProfitTableRowCreator tableId={provedId} />
    </Box>
  );
};

export default ProfitTablePage;
