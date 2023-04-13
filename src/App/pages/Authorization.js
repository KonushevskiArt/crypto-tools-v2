/*eslint-env browser*/
import { Box } from "@mui/system";
import * as React from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { useTranslation } from "react-i18next";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& label": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      color: "white",
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "&. .MuiTextField-root": {
      color: "white",
    },
  },
});

const Authorization = () => {
  const { t } = useTranslation();

  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [additionalError, setEdditionalError] = React.useState(false);
  const [additionalMessage, setEdditionalMessage] = React.useState(null);

  //remove 2 strings below
  setEdditionalError(false);
  setEdditionalMessage(null)

  const onSubmit = ({ name }) => {
    console.log(name)
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#69957c",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="div"
          sx={{
            p: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "30px",
            alignItems: "center",
            backgroundColor: "#92aa9c",
            borderRadius: "10px",
            boxShadow: "0px 5px 10px 2px rgba(11, 18, 22, 0.44)",
            minWidth: "300px",
          }}
        >
          <CssTextField
            label={"mail"}
            variant="outlined"
            inputProps={{
              autoComplete: "off",
            }}
            id="custom-css-outlined-input"
            {...register("mail", {
              required: t("Required_field"),
              maxLength: 20,
            })}
            error={!!errors?.name || additionalError}
            helperText={
              errors?.name
                ? errors.name.message
                : additionalError
                ? additionalMessage
                : null
            }
          />

          <CssTextField
            label={"password"}
            variant="outlined"
            inputProps={{
              autoComplete: "off",
            }}
            id="custom-css-outlined-input"
            {...register("password", {
              required: t("Required_field"),
              maxLength: 20,
            })}
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
            // size="small"
            type="submit"
            variant="contained"
            color="success"
            startIcon={<AddBoxIcon />}
          >
            {t("Add_currency")}
          </Button>
        </Box>
      </form>
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
      >
        <Button
          size="small"
          type="submit"
          variant="contained"
          color="success"
          startIcon={<AppRegistrationIcon />}
        >
          {"Register"}
        </Button>
        <Button
          size="small"
          type="submit"
          variant="contained"
          color="success"
          startIcon={<LoginIcon />}
          sx={{
            marginLeft: "20px",
          }}
        >
          {"login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Authorization;
