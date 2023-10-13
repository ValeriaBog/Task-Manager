import React, { useState} from "react";
import { FormikHelpers, useFormik } from "formik";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  TextField, Typography
} from "@mui/material";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { authThunks } from "features/auth/model/auth.slice";
import { LoginParamsType } from "features/auth/api/auth.api";
import { BaseResponseType } from "common/types";
import s from "features/auth/ui/login/login.module.css";


type FormikErrorType = Partial<Omit<LoginParamsType, 'captcha'>>

export const Login = () => {

  const { login } = useActions(authThunks);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = () => {
        setExpanded(!expanded);
      };

  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 3) {
        errors.password = "Must be 3 characters or more";
      }

      return errors;
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      login(values)
        .unwrap()
        .catch((reason: BaseResponseType) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
    },
  });

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
        <form onSubmit={formik.handleSubmit} className={s.container}>
          <Paper elevation={3} className={s.list}>
          <FormControl>
            <FormLabel>
              <Typography variant="h4" className={s.title}>Sign in</Typography>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" variant="filled" color={"secondary"} {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <Typography className={s.error}>{formik.errors.email}</Typography>}
              <TextField type="password" label="Password" variant="filled" color="secondary" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password && <Typography className={s.error}>{formik.errors.password}</Typography>}
              <div className={s.check}>
                <FormControlLabel
                    label={"Remember me"} color={"secondary"}
                    control={<Checkbox color="secondary" {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
                />
                <div>
                  <button className={s.datasForSignUp} onClick={handleChange}
                  >New to TRELLO?</button>
                  {expanded && <div className={s.info}>
                    <Typography variant="h6" style={{textAlign: 'center'}}>
                      Use common test account
                    </Typography>
                    <Typography variant="h6" style={{fontSize: 15, marginLeft: 15}}>
                      Email: free@samuraijs.com
                    </Typography>
                    <Typography variant="h6" style={{fontSize: 15, marginLeft: 15}}>
                      Password: free
                    </Typography>
                  </div>}
                </div>
              </div>

                <Button
                    type={"submit"}
                    variant={"contained"}
                    disabled={!(formik.isValid && formik.dirty)}
                    color={"secondary"}
                >
                  Login
                </Button>
            </FormGroup>
          </FormControl>
            </Paper>
        </form>
  );
};
