import { useState } from "react";
import Button from "@mui/material/Button";
import {  useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { useTranslation } from "react-i18next";
import { Box } from '@mui/material';

import { setUser } from '../redux/userSlice';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";

import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";

import { useTypedDispatch } from "../redux/store";
import { User } from "firebase/auth";

interface IExpendedUser extends User {
  accessToken : string
}

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
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [isLoading, setLoading] = useState(false)

  const location = useLocation();

  const isLogin = location.pathname === '/login';

  interface IFormData {
    mail: string,
    password: string,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();


  const onSubmit = async ({ mail, password }: IFormData) => {
    try {
      const auth = getAuth();
      if (isLogin) {
        setLoading(true);
        
        const { user } = await signInWithEmailAndPassword(auth, mail, password);
        const expendedUser = user as IExpendedUser;

        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: expendedUser.accessToken,
        }));
        
        setLoading(false);
        navigate('/')
      } else {
        setLoading(true);
        const { user } = await createUserWithEmailAndPassword(auth, mail, password)

        const expendedUser = user as IExpendedUser;
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: expendedUser.accessToken,
        }));
        setLoading(false);
        navigate('/');
      }
    
    } catch (error) {
      console.log(error)
      setLoading(false);
      const customError = error as { message: string };
      toast.error(customError.message, {
        duration: 4000,
        position: 'top-center',
      })
    }

  };


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "custom.navigation",
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
            backgroundColor: "custom.authWindow",
            borderRadius: "10px",
            boxShadow: "0px 5px 10px 2px rgba(11, 18, 22, 0.44)",
            minWidth: "300px",
          }}
        >
          <CssTextField
            label={"mail"}
            variant="outlined"
            defaultValue={'abc@gmail.com'}
            inputProps={{
              autoComplete: "off",
            }}
            {...register("mail", {
              required: t("Required_field") as string,
              pattern: { 
                value: /^\S+@\S+\.\S+$/,
                message: "Field must be email"
              },
              maxLength: {
                value: 50,
                message: 'max length 50 characters'
              },
            })}
            error={!!errors?.mail}
            helperText={
              errors?.mail
                ? <>{errors.mail.message}</>
                : null
            }
          />

          <CssTextField
            label={"password"}
            variant="outlined"
            defaultValue={123456}
            inputProps={{
              autoComplete: "off",
            }}
            {...register("password", {
              required: t("Required_field") as string,
              maxLength: {
                value: 30,
                message: 'max length 30 characters'
              },
              minLength: {
                value: 5,
                message: 'min length 5 characters' 
              }
              
            })}
            error={!!errors?.password }
            helperText={
              errors?.password
                ? <>{errors.password.message}</>
                : null
            }
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            startIcon={<AddBoxIcon />}
            disabled={isLoading}
            endIcon={
              <ClipLoader loading={isLoading} size={20} color="#fcf" />
            }
          >
            { isLogin ? 'log in' : 'sign up' }
          </Button>
        </Box>
      </form>
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        <Button
          size="small"
          type="submit"
          variant="contained"
          color="success"
          onClick={() => navigate('/')}
          startIcon={<AppRegistrationIcon />}
        >
          {"Home"}
        </Button>
      </Box>
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
          onClick={() => navigate(isLogin ? '/auth' : '/login')}
          startIcon={ isLogin ? <AppRegistrationIcon /> : <LoginIcon /> }
          sx={{
            marginLeft: "20px",
          }}
        >
          {isLogin ?  'Sign up' : 'Log in'}
        </Button> 
      </Box>
    </Box>
  );
};

export default Authorization;
