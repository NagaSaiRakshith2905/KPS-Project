import { Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserApi } from "../../services/UserService";
import { authActions } from "../../store/auth";

const Register = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    props.setIsLoading(false);
    if (!email.includes("@") || !email.includes(".")) {
      props.setIsLoading(false);
      setErrors((prev) => {
        return { ...prev, email: "Enter a valid email!" };
      });
    } else if (password.length < 6) {
      props.setIsLoading(false);
      setErrors((prev) => {
        return { ...prev, password: "Password must contain min 6 letters!" };
      });
    } else {
      await registerUserApi({
        userName: username,
        email: email,
        password: password,
      })
        .then((resp) => {
          if (resp.status === 200 || resp.status === 201) {
            localStorage.setItem("username", resp.data);
            dispatch(authActions.setUsername(resp.data));
            dispatch(authActions.setloggedin(true));
            props.setIsLoading(false);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.message === "Username already exists") {
            props.setIsLoading(false);
            setErrors((prev) => {
              return {
                email: "",
                username: err.response.data.message,
                password: "",
              };
            });
          }
          if (err.response.data.message === "Email already exists") {
            props.setIsLoading(false);
            setErrors((prev) => {
              return {
                username: "",
                email: err.response.data.message,
                password: "",
              };
            });
          }
        });
    }
  };

  return (
    <div>
      <Typography
        variant={"h3"}
        marginBottom={1}
        align={"center"}
        sx={{
          color: "rgb(255 255 255/0.5)",
          fontWeight: "200",
          textTransform: "uppercase",
          letterSpacing: "8px",
        }}
      >
        Register
      </Typography>
      <form onSubmit={submitHandler}>
        <TextField
          required
          fullWidth
          margin={"dense"}
          variant={"outlined"}
          label={"Username"}
          size={"small"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText={errors.username}
        />
        <TextField
          required
          fullWidth
          margin={"dense"}
          variant={"outlined"}
          label={"Email"}
          size={"small"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={errors.email}
        />
        <TextField
          required
          fullWidth
          margin={"dense"}
          variant={"outlined"}
          label={"Password"}
          type={"password"}
          size={"small"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={errors.password}
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

export default Register;
