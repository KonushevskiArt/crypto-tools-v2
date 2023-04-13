/* eslint-env browser */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { addProfitTableRow } from "../../../redux/profitTablesSlice";


const arrOfNumberFieldsData = [
  {label: 'Входная цена', register: 'entryPrice'}, 
  {label: 'Цена закрытия', register: 'exitPrice'},
  {label: 'SL', register: 'sl'},
  {label: 'BY', register: 'by'},
  {label: 'TP1', register: 'tp1'},
  {label: 'TP2', register: 'tp2'},
  {label: 'TP3', register: 'tp3'},
] 

const ProfitTableRowCreater = ({ tableId }) => {
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const dispatch = useDispatch();

  const onSubmit = ({ coinName, entryPrice, exitPrice, sl, by, tp1, tp2, tp3 }) => {
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
          display: "grid",
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
          backgroundColor: 'custom.foreground',
        }}
      >
        <TextField
          id="standard-basic"
          label={"Название монеты"}
          variant="standard"
          {...register("coinName", {
            required: t("Required_field"),
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
              required: t("Required_field"),
              min: 0.000000000001,
              pattern: {
                value: numberValidationExp,
                message: t("Invalid_value"),
              },
            })}
            error={!!errors[cel.register] || false}
            helperText={errors[cel.register] ? errors[cel.register].message : null}
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
          {"Создать ряд"}
        </Button>
      </Box>
    </form>
  );
};

export default ProfitTableRowCreater;
