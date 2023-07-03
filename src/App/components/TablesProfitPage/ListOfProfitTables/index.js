/*eslint-env browser*/
import React from "react";
import List from "@mui/material/List";
import ProfitTableCreator from "../ProfitTableCreator";
import { useSelector } from "react-redux";
import ItemOfProfitTablesList from "./ItemOfProfitTablesList";

const ListOfProfitTables = () => {
  const profitTables = useSelector((state) => state.tables.tables);
  const profitTablesArr = Object.keys(profitTables);

  return (
    <List
      sx={{
        paddingTop: "20px",
        display: "flex",
        flexWrap: 'wrap',
        gap: "20px",
        justifyItems: 'start',
    
      }}
    >
      {profitTablesArr.map((id) => (
        <ItemOfProfitTablesList
          key={id}
          id={id}
          date={profitTables[id].date}
          name={profitTables[id].name}
        />
      ))}
      <ProfitTableCreator profitTables={profitTables} />
    </List>
  );
};

export default ListOfProfitTables;
