/* eslint-env browser */
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import { addProfitTable } from "../../../redux/profitTablesSlice";

import { useTranslation } from "react-i18next";

const ProfitTableCreater = () => {
  const { t } = useTranslation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = ({ name }) => {
    const trimmedName = name.trim();
    dispatch(addProfitTable({ name: trimmedName }));
    reset();
  };

  return (
    <ListItem
      sx={{
        paddingBottom: "20px",
        minWidth: "180px",
        maxWidth: "250px",
        minHeight: "140px",
        display: "flex",
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
      <form style={{ height: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="div"
          sx={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="standard-basic"
            label={t("Label_name")}
            variant="standard"
              {...register("name", {
              required: t("Required_field"),
              maxLength: { value: 30, message: "max length 30 characters" },
            })}
            error={errors.name}
            helperText={ errors.name ? errors.name.message : null }
          />
          <Button
            size="small"
            type="submit"
            variant="contained"
            color="success"
            startIcon={<DataSaverOnIcon />}
          >
            {"Добавить таблицу"}
          </Button>
        </Box>
      </form>
    </ListItem>
  );
};

export default ProfitTableCreater;
