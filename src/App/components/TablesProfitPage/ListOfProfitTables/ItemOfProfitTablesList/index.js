/*eslint-env browser*/
import React, { useState } from "react";
import { removeProfitTable } from "../../../../redux/profitTablesSlice";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { editProfitTableName } from "../../../../redux/profitTablesSlice";

const ItemOfProfitTablesList = ({ id, date, name }) => {
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isEdit, setIsEdit] = useState(false);

  const handleRemoveTable = () => {
    dispatch(removeProfitTable({ id }));
  };

  const handleEditName = () => {
    setIsEdit(true);
  };

  const onSubmit = ({ name }) => {
    const trimmedName = name.trim();
    dispatch(editProfitTableName({ id, newName: trimmedName }));
    reset();
    setIsEdit(false);
  };

  return (
    <ListItem
      sx={{
        position: "relative",
        paddingTop: "50px",
        paddingBottom: "10px",
        minWidth: "180px",
        maxWidth: "250px",
        minHeight: "140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "custom.foreground",
        boxShadow: "0px 5px 10px 2px rgba(16, 22, 26, 0.31)",
        transition: "transform 0.1s, box-shadow 0.2s",
        borderRadius: "10px",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: " 0px 5px 14px 2px rgba(4, 5, 6, 0.46)",
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {!isEdit && <Link to={id}>{name}</Link>}
        {isEdit && 
         <form id="formTableNameEdit" onSubmit={handleSubmit(onSubmit)}>
           <TextField
             id="standard-basic"
             label='New name'
             defaultValue={name}
             variant="standard"
               {...register("name", {
               required: 'required',
               maxLength: { value: 30, message: "max length 30 characters" },
             })}
             error={errors?.name}
             helperText={ errors?.name ? errors?.name.message : null }
           />
            <IconButton
              title="Save"
              sx={{ position: "absolute", top: "5px", left: "5px" }}
              color="primary"
              aria-label="save new name of the table"
              component="button"
              type="submit"
            >
              <SaveAsIcon />
            </IconButton>
         </form>
        }
        
      </Box>
      <Divider
        sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
      />
      <Box>{new Date(date).toLocaleDateString("ru-RU") || "00.00.00"}</Box>

      <IconButton
        title="Delete"
        onClick={handleRemoveTable}
        sx={{ position: "absolute", top: "5px", right: "5px" }}
        color="primary"
        aria-label="remove list"
        component="label"
      >
        <DisabledByDefaultIcon />
      </IconButton>

      {!isEdit && 
        <IconButton
          title="Edit"
          onClick={handleEditName}
          sx={{ position: "absolute", top: "5px", left: "5px" }}
          color="primary"
          aria-label="edit name of the table"
          component="label"
        >
        <EditIcon />
        </IconButton>
      }
    </ListItem>
  );
};

export default ItemOfProfitTablesList;
