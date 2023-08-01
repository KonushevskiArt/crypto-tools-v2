import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addPurchase } from "../../../../../redux/currencySlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useTypedDispatch } from "../../../../../redux/store";

interface IPurchaseCreatorProps {
  id: string
}

type TFormValues = {
  price: number, 
  quantity: number,
  date: Dayjs
}

const PurchaseCreator: React.FC<IPurchaseCreatorProps> = ({ id }) => {
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const [dateValue, setDateValue] = React.useState<Dayjs>(dayjs(Date.now()));

  const handleChange = (newValue: Dayjs) => {
    setDateValue(newValue);
  };

  const dispatch = useTypedDispatch();

  const onSubmit: SubmitHandler<TFormValues> = ({ price, quantity }) => { 
    dispatch(
      addPurchase({
        id,
        price,
        quantity,
        date: dayjs(dateValue).valueOf(),
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
          onChange={(newValue) => handleChange(newValue as Dayjs)}
          renderInput={(params) => (
            <TextField
              size="small"
              sx={{ marginRight: "20px" }}
              {...params}
              {...register("date", {
                required: t("Required_field") as string,
              })}
            />
          )}
        />
        <TextField
          label={t("Price")}
          variant="standard"
          sx={{ marginRight: "20px" }}
          {...register("price", {
            required: t("Required_field") as string,
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
          label={t("Quantity")}
          variant="standard"
          {...register("quantity", {
            required: t("Required_field") as string,
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

export default PurchaseCreator;
