import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { editCurrencyName } from "../../../../redux/currencySlice";
import EditIcon from "@mui/icons-material/Edit";
import Badge from "@mui/material/Badge";
import SaveIcon from "@mui/icons-material/Save";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTypedDispatch, useTypedSelector } from "../../../../redux/store";

interface ICurrencyNameEditorProps {
  currencyId: string
}

type TFormValues = {
  name: string
}


const CurrencyNameEditor: React.FC<ICurrencyNameEditorProps> = ({ currencyId }) => {
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const dispatch = useTypedDispatch();

  const currencies = useTypedSelector((state) => {
    return state.currencies.currencies;
  });

  const currencyName = currencies[currencyId].name;

  const [isEdit, setIsEdit] = React.useState(false);

  const onSaveNewName: SubmitHandler<TFormValues> = ({ name }) => {
    dispatch(editCurrencyName({ newName: name, id: currencyId }));
    reset();
    setIsEdit(false)
  };

  const handleEdit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    setIsEdit(true);
  };
  const handleClickBySaveNewName = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {isEdit ? (
        <>
          <form onSubmit={handleSubmit(onSaveNewName)}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                size="small"
                label={t("Label_name")}
                variant="outlined"
                {...register("name", {
                  required: t("Required_field") as string,
                  maxLength: { value: 20, message: "max length 20 characters" },
                })}
                onClick={(e) => e.stopPropagation()}
                sx={{ marginRight: "40px" }}
                defaultValue={currencyName}
                error={!!errors.name}
                helperText={ errors?.name ? errors.name.message : null }
              />
              <Button
                type="submit"
                variant="outlined"
                onClick={handleClickBySaveNewName}
                size="small"
                startIcon={<SaveIcon />}
              >
                {t("Save")}
              </Button>
            </Box>
          </form>
        </>
      ) : (
        <>
          <Badge
            badgeContent={currencies[currencyId].listOfPurchases.length || 0 }
            color="secondary"
            sx={{ paddingRight: "10px" }}
          >
            <Typography
              sx={{ fontSize: "24px", fontWeight: "700", color: "#404040" }}
            >
              {currencies[currencyId].name}
            </Typography>
          </Badge>
          <Button
            variant="outlined"
            size="small"
            type="button"
            onClick={handleEdit}
            sx={{ marginLeft: "40px" }}
            startIcon={<EditIcon />}
          >
            {t("Edit")}
          </Button>
        </>
      )}
    </Box>
  );
};

export default CurrencyNameEditor;
