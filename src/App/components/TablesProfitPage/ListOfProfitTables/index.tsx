
import React from "react";
import List from "@mui/material/List";
import ProfitTableCreator from "../ProfitTableCreator";
import ItemOfProfitTablesList from "./ItemOfProfitTablesList";
import { useTypedSelector } from "../../../redux/store";

const ListOfProfitTables: React.FC = () => {
  const profitTables = useTypedSelector((state) => state.tables.tables);
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
      <ProfitTableCreator />
    </List>
  );
};

export default ListOfProfitTables;
