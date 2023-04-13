import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { editCurrencyName } from "../../../redux/currencySlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Badge from "@mui/material/Badge";
import SaveIcon from "@mui/icons-material/Save";

import { useTranslation } from "react-i18next";

const CurrencyNameEditor = ({ currencyName }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currencys = useSelector((state) => {
    return state.currencies.currencies;
  });

  const [isEdit, setIsEdit] = React.useState(false);
  const [name, setName] = React.useState(currencyName);

  const [validationError, setValidationError] = React.useState(false);
  const [validationMessage, setValidationMessage] = React.useState(null);

  const handleChange = (e) => {
    setName(e.target.value);
    setValidationError(false);
    setValidationMessage(null);
  };

  const handleSave = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length > 20) {
      setValidationError(true);
      setValidationMessage(t("Max_length_20_characters"));
    } else if (trimmedName.length < 1) {
      setValidationError(true);
      setValidationMessage(t("Required_field"));
    } else if (currencyName === trimmedName) {
      setIsEdit(false);
    } else if (currencys[trimmedName]) {
      setValidationError(true);
      setValidationMessage(t("Required_field"));
    } else {
      dispatch(editCurrencyName({ newName: name, oldName: currencyName }));
      setIsEdit(false);
    }
  };
  const handleEdit = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setIsEdit(true);
  };

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
          <form>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                size="small"
                id="outlined-basic"
                label={t("Label_name")}
                variant="outlined"
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
                sx={{ marginRight: "40px" }}
                defaultValue={currencyName}
                error={validationError}
                helperText={validationError ? validationMessage : null}
              />
              <Button
                type="submit"
                variant="outlined"
                size="small"
                onClick={handleSave}
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
            badgeContent={currencys[currencyName].length}
            color="secondary"
            sx={{ paddingRight: "10px" }}
          >
            <Typography
              sx={{ fontSize: "24px", fontWeight: "700", color: "#404040" }}
            >
              {currencyName}
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
