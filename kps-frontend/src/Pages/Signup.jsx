import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadinDailog from "../components/LoadinDailog";
import ForgotPassword from "../components/signup/ForgotPassword";
import Login from "../components/signup/Login";
import Register from "../components/signup/Register";

const Signup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    document.title = "KPS | Signup";
    if (hasLoggedIn) navigate("/");
  });
  return (
    <Container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && <LoadinDailog open={isLoading} />}
      <Paper
        sx={{
          width: "25rem",
          marginInline: "auto",
          p: "2rem",
          //   backgroundColor: "#242A38",
          backgroundColor: "#222831",
        }}
      >
        <Typography
          variant="h5"
          align={"center"}
          sx={{
            color: "rgb(255 255 255/0.87)",
            fontWeight: "100",
            letterSpacing: "4px",
          }}
        >
          K-Path Simulations.
        </Typography>
        <br />
        <Divider />
        <br />
        {isLogin ? (
          !forgotPassword ? (
            <Login
              setIsLoading={setIsLoading}
              setForgotPassword={setForgotPassword}
            />
          ) : (
            <ForgotPassword
              setIsLoading={setIsLoading}
              setForgotPassword={setForgotPassword}
            />
          )
        ) : (
          <Register setIsLoading={setIsLoading} />
        )}
        <br />
        <Divider />
        <Button
          variant={"outlined"}
          fullWidth
          size={"normal"}
          type={"submit"}
          sx={{ marginTop: "2rem" }}
          onClick={(e) => {
            if (!forgotPassword) {
              setIsLogin((prev) => {
                return !prev;
              });
            }
            if (isLogin && forgotPassword) {
              setForgotPassword((prev) => !prev);
            }
          }}
        >
          {!isLogin ? "Login" : forgotPassword ? "Login" : "Register"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Signup;
