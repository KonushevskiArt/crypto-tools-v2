/*eslint-env browser*/
import React from "react";
import List from "@mui/material/List";
import ProfitTableCreater from "../ProfitTableCreater";
import { useSelector } from "react-redux";
import ItemOfProfitTablesList from "./ItemOfProfitTablesList";

const ListOfProfitTables = () => {
  const profitTables = useSelector((state) => state.tables.tables);
  const profitTablesArr = Object.keys(profitTables);

  return (
    <List
      sx={{
        paddingTop: "50px",
        maxWidth: "900px",
        display: "grid",
        gap: "30px",
        gridTemplateColumns: "1fr 1fr 1fr",
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
      <ProfitTableCreater profitTables={profitTables} />
    </List>
  );
};

export default ListOfProfitTables;
