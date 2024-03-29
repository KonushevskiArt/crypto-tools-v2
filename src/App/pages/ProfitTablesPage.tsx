import React from "react";
import ListOfProfitTables from "../components/TablesProfitPage/ListOfProfitTables";
import Box from "@mui/material/Box";

const ProfitTablesPage: React.FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ListOfProfitTables />
    </Box>
  );
};

export default ProfitTablesPage;
