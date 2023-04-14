import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addCurrency } from "../../../redux/currencySlice";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";

import { useTranslation } from "react-i18next";

const CurrencyCreater = () => {
  const { t } = useTranslation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = ({ name }) => {
    dispatch(addCurrency({ name }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        component="div"
        sx={{
          p: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          id="standard-basic"
          label={t("Label_name")}
          variant="standard"
          {...register("name", {
            required: t("Required_field"),
            maxLength: { value: 20, message: "max length 20 characters" },
          })}
          error={!!errors.name}
          helperText={ errors?.name ? errors.name.message : null }
        />
        <Button
          size="small"
          type="submit"
          variant="contained"
          color="success"
          sx={{ marginLeft: "20px" }}
          startIcon={<DataSaverOnIcon />}
        >
          {t("Add_currency")}
        </Button>
      </Box>
    </form>
  );
};

export default CurrencyCreater;
