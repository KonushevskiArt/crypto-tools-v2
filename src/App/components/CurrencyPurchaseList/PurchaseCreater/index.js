import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addPurchase } from "../../../redux/currencySlice";
import { useForm } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const PurchaseCreater = ({ name }) => {
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [dateValue, setDateValue] = React.useState(dayjs(Date.now()));

  const handleChange = (newValue) => {
    const formatedDate = Date.parse(new Date(newValue.$d));
    setDateValue(formatedDate);
  };

  const dispatch = useDispatch();

  const onSubmit = ({ price, quantity }) => {
    dispatch(
      addPurchase({
        name,
        price,
        quantity,
        date: Date.parse(new Date(dateValue)),
      })
    );
    reset();
  };

  const numberValidationExp = /^[0-9]*[.]?[0-9]+$/;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        p="20px"
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <DesktopDatePicker
          label={t("Date&Time_picker")}
          inputFormat="DD/MM/YYYY"
          value={dateValue}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              size="small"
              sx={{ marginRight: "20px" }}
              {...params}
              {...register("date", {
                required: t("Required_field"),
              })}
            />
          )}
        />
        <TextField
          id="standard-basic"
          label={t("Price")}
          variant="standard"
          sx={{ marginRight: "20px" }}
          {...register("price", {
            required: t("Required_field"),
            min: 0.000000000001,
            pattern: {
              value: numberValidationExp,
              message: t("Invalid_value"),
            },
          })}
          error={!!errors?.price}
          helperText={errors?.price ? errors.price.message : null}
        />
        <TextField
          sx={{
            marginRight: "20px",
          }}
          id="standard-basic"
          label={t("Quantity")}
          variant="standard"
          {...register("quantity", {
            required: t("Required_field"),
            min: 0.000000000001,
            pattern: {
              value: numberValidationExp,
              message: t("Invalid_value"),
            },
          })}
          error={!!errors?.quantity}
          helperText={errors?.quantity ? errors.quantity.message : null}
        />
        <Button
          size="small"
          color="success"
          type="submit"
          variant="contained"
          sx={{
            margin: "10px",
          }}
          startIcon={<LibraryAddIcon />}
        >
          {t("Save_purchase")}
        </Button>
      </Box>
    </form>
  );
};

export default PurchaseCreater;
