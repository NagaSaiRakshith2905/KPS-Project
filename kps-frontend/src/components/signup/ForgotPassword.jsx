import { Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userUpdatePasswordApi } from "../../services/UserService";
import { authActions } from "../../store/auth";

const ForgotPassword = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userValue, setUserValue] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({ userValue: "", password: "" });

  const submitHandler = async (e) => {
    e.preventDefault();
    props.setIsLoading(true);
    if (password.length < 6) {
      props.setIsLoading(false);
      setErrors((prev) => {
        return { ...prev, password: "Password should be min 6 characters" };
      });
    } else {
      await userUpdatePasswordApi(userValue, password)
        .then((resp) => {
          if (resp.status === 200 || resp.status === 201) {
            localStorage.setItem("username", resp.data);
            dispatch(authActions.setUsername(resp.data));
            dispatch(authActions.setloggedin(true));
            props.setIsLoading(false);
            props.setForgotPassword(false);
            navigate("/signup");
          }
        })
        .catch((err) => {
          if (err.response.data.message === "Invalid email or username") {
            props.setIsLoading(false);
            setErrors((prev) => {
              return { userValue: err.response.data.message, password: "" };
            });
          }
          if (err.response.data.message === "Wrong password") {
            props.setIsLoading(false);
            setErrors((prev) => {
              return { userValue: "", password: err.response.data.message };
            });
          }
        });
    }
  };

  return (
    <div>
      <Typography
        variant={"h4"}
        marginBottom={1}
        align={"center"}
        sx={{
          color: "rgb(255 255 255/0.5)",
          fontWeight: "200",
          textTransform: "uppercase",
          letterSpacing: "4px",
        }}
      >
        Forgot Password
      </Typography>
      <form onSubmit={submitHandler}>
        <TextField
          required
          fullWidth
          margin={"dense"}
          variant={"outlined"}
          label={"Username/Email"}
          size={"small"}
          helperText={errors.userValue}
          value={userValue}
          onChange={(e) => setUserValue(e.target.value)}
        />
        <TextField
          required
          margin={"dense"}
          variant={"outlined"}
          fullWidth
          label={"New-Password"}
          type={"password"}
          size={"small"}
          value={password}
          helperText={errors.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant={"contained"}
          fullWidth
          size={"normal"}
          type={"submit"}
          sx={{ marginY: "1rem" }}
          color={"success"}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
