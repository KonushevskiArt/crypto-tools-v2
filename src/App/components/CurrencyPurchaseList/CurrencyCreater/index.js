import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addCurrency } from "../../../redux/currencySlice";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
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
  const [additionalError, setEdditionalError] = React.useState(false);
  const [additionalMessage, setEdditionalMessage] = React.useState(null);

  const currencys = useSelector((state) => {
    return state.currencies.currencies;
  });

  const dispatch = useDispatch();

  const handleChange = () => {
    setEdditionalError(false);
    setEdditionalMessage(null);
  };

  const onSubmit = ({ name }) => {
    const trimmedName = name.trim();
    if (currencys[trimmedName]) {
      setEdditionalError(true);
      setEdditionalMessage(t("Validation_message_currencyExisted"));
    } else {
      dispatch(addCurrency({ name: trimmedName }));
      reset();
    }
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
          onChange={handleChange}
          error={!!errors?.name || additionalError}
          helperText={
            errors?.name
              ? errors.name.message
              : additionalError
              ? additionalMessage
              : null
          }
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
