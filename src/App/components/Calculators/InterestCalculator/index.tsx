import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import FunctionsIcon from "@mui/icons-material/Functions";

type TFormValues = {
  entryPrice: number,
  closingPrice: number
}

const InterestCalculator: React.FC = () => {
  const [result, setResult] = React.useState(0);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const numberValidationExp = /^[0-9]*[.]?[0-9]+$/;

  const onSubmit: SubmitHandler<TFormValues>  = ({ entryPrice, closingPrice }) => {
    const currentRes =
      entryPrice > closingPrice
        ? ((entryPrice - closingPrice) / entryPrice) * 100 * -1
        : ((closingPrice - entryPrice) / entryPrice) * 100;

    setResult(Number(Number.parseFloat(String(currentRes)).toFixed(6)));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "custom.foreground",
          width: "700px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Typography mb="30px">Калькулятор процентного соотношения</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
        >
          <TextField
            label={"цена входа"}
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            {...register("entryPrice", {
              required: t("Required_field") as string,
              min: 0.000000000001,
              pattern: {
                value: numberValidationExp,
                message: t("Invalid_value"),
              },
            })}
            error={errors && !!errors.entryPrice}
            helperText={
              errors && errors.entryPrice ? errors.entryPrice.message : null
            }
          />
          <Typography pr="20px" pl="20px">
            {result}%
          </Typography>

          <TextField
            label={"цена выхода"}
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            {...register("closingPrice", {
              required: t("Required_field") as string,
              min: 0.000000000001,
              pattern: {
                value: numberValidationExp,
                message: t("Invalid_value"),
              },
            })}
            error={errors && !!errors.closingPrice}
            helperText={
              errors && errors.closingPrice ? errors.closingPrice.message : null
            }
          />
        </Box>
        <Button
          size="small"
          color="success"
          type="submit"
          variant="contained"
          sx={{
            margin: "10px",
          }}
          startIcon={<FunctionsIcon />}
        >
          {t("Calculate")}
        </Button>
      </Box>
    </form>
  );
};

export default InterestCalculator;
