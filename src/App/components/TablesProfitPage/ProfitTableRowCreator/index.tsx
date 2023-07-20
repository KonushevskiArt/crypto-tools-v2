/* eslint-env browser */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { addProfitTableRow } from "../../../redux/profitTablesSlice";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTypedDispatch } from "../../../redux/store";

interface IProfitTableRowCreatorProps {
  tableId: string
}

enum EnumFormValues {
  coinName = "coinName",
  entryPrice = "entryPrice",
  exitPrice = "exitPrice",
  sl = "sl",
  by = "by", 
  tp1 = "tp1",
  tp2 = "tp2", 
  tp3 = "tp3"
}

type TFormValues = {
  coinName: string,
  entryPrice: number,
  exitPrice: number,
  sl: number,
  by: number, 
  tp1: number,
  tp2: number, 
  tp3: number
}

const ProfitTableRowCreator: React.FC<IProfitTableRowCreatorProps> = ({ tableId }) => {
  const { t } = useTranslation();
  const matches = useMediaQuery('(min-width:1050px)');
  
  const arrOfNumberFieldsData = [
    {label: t("EntryPrice") as string, register: EnumFormValues.entryPrice}, 
    {label: t("ClosingPrice") as string, register: EnumFormValues.exitPrice},
    {label: 'SL', register: EnumFormValues.sl},
    {label: 'BY', register:EnumFormValues.by},
    {label: 'TP1', register: EnumFormValues.tp1},
    {label: 'TP2', register: EnumFormValues.tp2},
    {label: 'TP3', register: EnumFormValues.tp3},
  ] 

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();


  const dispatch = useTypedDispatch();

  const onSubmit: SubmitHandler<TFormValues> = ({ coinName, entryPrice, exitPrice, sl, by, tp1, tp2, tp3 }) => {
    dispatch(
      addProfitTableRow({
        tableId, coinName, entryPrice, exitPrice, sl, by, tp1, tp2, tp3
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
          minWidth: "600px",
          display: "grid",
          gridTemplateColumns: matches ? 'repeat(5, 1fr)' : 'repeat(3, 1fr)',
          gap: '20px',
          backgroundColor: 'custom.foreground',
        }}
      >
        <TextField
          id="standard-basic"
          label={t("Label_name")}
          variant="standard"
          {...register("coinName", {
            required: t("Required_field") as string,
            maxLength: { value: 20, message: "max length 20 characters" },
          })}
          error={!!errors.coinName || false}
          helperText={ errors.coinName ? errors.coinName.message : null }
        />
        {arrOfNumberFieldsData.map( (cel) => (
          <TextField
            key={cel.register + cel.label}
            id="standard-basic"
            label={cel.label}
            variant="standard"
            sx={{ marginRight: "20px" }}
            {...register(cel.register, {
              required: t("Required_field") as string,
              min: 0.000000000001,
              pattern: {
                value: numberValidationExp,
                message: t("Invalid_value"),
              },
            })}
            error={!!errors[cel.register] || false}
            helperText={errors[cel.register] ? errors[cel.register]!.message : null}
          />)
          )
        }
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
          {t("rowCreator")}
        </Button>
      </Box>
    </form>
  );
};

export default ProfitTableRowCreator;
