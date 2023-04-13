import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import FunctionsIcon from "@mui/icons-material/Functions";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const CommissionCalculator = () => {
  const { t } = useTranslation();

  const [quantity, setQuantity] = React.useState(0);
  const [initialMargin, setInitialMargin] = React.useState(0);
  const [profitAndLoss, setProfitAndLoss] = React.useState(0);
  const [profitAndLossPercentages, setProfitAndLossPercentages] =
    React.useState(0);
  const [ROI, setROI] = React.useState(0);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ creditLeverage, amount, entryPrice, closingPrice }) => {
    const currentQuantity = (amount * creditLeverage) / entryPrice;
    const currentProfitAndLoss = currentQuantity * (closingPrice - entryPrice);

    const currentProfitAndLossPercentages =
      entryPrice > closingPrice
        ? ((entryPrice - closingPrice) / entryPrice) * 100 * -1
        : ((closingPrice - entryPrice) / entryPrice) * 100;

    const currentROI = currentProfitAndLossPercentages * creditLeverage;

    setQuantity(Number.parseFloat(currentQuantity).toFixed(6));
    setInitialMargin(Number.parseFloat(amount).toFixed(6));
    setProfitAndLoss(Number.parseFloat(currentProfitAndLoss).toFixed(6));
    setProfitAndLossPercentages(
      Number.parseFloat(currentProfitAndLossPercentages).toFixed(2)
    );
    setROI(Number.parseFloat(currentROI).toFixed(2));
  };

  const removeZeros = (number) => {
    return Number(String(number).replace(/0*$/, ""));
  };

  const handleReset = () => {
    reset();
  };

  const numberValidationExp = /^[0-9]*[.]?[0-9]+$/;

  const fieldsInfoArr = [
    {
      translationName: "CreditLeverage",
      registerName: "creditLeverage",
    },
    {
      translationName: "Amount",
      registerName: "amount",
    },
    {
      translationName: "EntryPrice",
      registerName: "entryPrice",
    },
    {
      translationName: "ClosingPrice",
      registerName: "closingPrice",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "custom.foreground",
        width: "700px",
        paddingTop: "30px",
      }}
    >
      <Typography>Калькулятор комиссии</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            p="20px"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            {fieldsInfoArr.map(({ registerName, translationName }) => (
              <TextField
                key={registerName}
                id="standard-basic"
                label={t(translationName)}
                variant="outlined"
                sx={{ marginBottom: "20px" }}
                {...register(registerName, {
                  required: t("Required_field"),
                  min: 0.000000000001,
                  pattern: {
                    value: numberValidationExp,
                    message: t("Invalid_value"),
                  },
                })}
                error={errors && !!errors[registerName]}
                helperText={
                  errors && errors[registerName]
                    ? errors[registerName].message
                    : null
                }
              />
            ))}

            <TextField
              id="standard-basic"
              label={t("Quantity")}
              value={removeZeros(quantity)}
              variant="outlined"
              disabled
              sx={{ marginBottom: "20px" }}
            />
            <Box>
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
              <Button
                size="small"
                color="error"
                type="button"
                variant="contained"
                sx={{
                  margin: "10px",
                }}
                onClick={handleReset}
                startIcon={<RestartAltIcon />}
              >
                {t("Reset")}
              </Button>
            </Box>
          </Box>
        </form>
        <Box sx={{ pt: "20px" }}>
          <Typography
            sx={{ padding: "12px", borderRadius: "5px", width: "100%" }}
            paragraph={true}
          >
            {t("InitialMargin")}: {removeZeros(initialMargin)} USDT
          </Typography>
          <Typography
            sx={{ padding: "12px", borderRadius: "5px", width: "100%" }}
            paragraph={true}
          >
            {t("ProfitAndLoss")}: {removeZeros(profitAndLoss)} USDT
          </Typography>
          <Typography
            sx={{ padding: "12px", borderRadius: "5px", width: "100%" }}
            paragraph={true}
          >
            {t("ProfitAndLoss")}: {removeZeros(profitAndLossPercentages)}%
          </Typography>
          <Typography
            sx={{ padding: "12px", borderRadius: "5px", width: "100%" }}
            paragraph={true}
          >
            ROI: {removeZeros(ROI)}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CommissionCalculator;
