import { NavigateBeforeRounded, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadinDailog from "../components/LoadinDailog";
import { authActions } from "../store/auth";
import {
  viewUserByUsernameApi,
  userUpdatePasswordApi,
} from "../services/UserService";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({ password: "" });
  const [userData, setUserData] = useState({ id: "", email: "" });
  const [updatePassword, setUpdatePassword] = useState(false);

  const username = useSelector((state) => state.auth.username);

  useEffect(() => {
    fetchUserData(username);
  }, []);
  const fetchUserData = async (username) => {
    await viewUserByUsernameApi(username)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password.length < 6) {
      setIsLoading(false);
      setErrors((prev) => {
        return { ...prev, password: "Password should be min 6 characters" };
      });
    } else {
      await userUpdatePasswordApi(username, password)
        .then((resp) => {
          if (resp.status === 200 || resp.status === 201) {
            localStorage.setItem("username", resp.data);
            dispatch(authActions.setUsername(resp.data));
            dispatch(authActions.setloggedin(true));
            setIsLoading(false);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box width={"100%"} height={"100vh"}>
      <Box
        width={"100%"}
        height={"8vh"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bgcolor={"#222831"}
        px={"2rem"}
      >
        <IconButton
          size={"small"}
          onClick={(e) => {
            navigate("/");
          }}
        >
          <NavigateBeforeRounded fontSize={"large"} />
        </IconButton>

        <Typography variant="h5" align={"center"} sx={{ cursor: "pointer" }}>
          Profile
        </Typography>
        <Button
          size={"small"}
          variant={"outlined"}
          color={"warning"}
          onClick={(e) => {
            localStorage.removeItem("username");
            dispatch(authActions.setUsername(""));
            dispatch(authActions.setloggedin(false));
            navigate("/signup");
          }}
        >
          logout
        </Button>
      </Box>
      <Box
        width={"100%"}
        height={"92vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {isLoading && <LoadinDailog open={isLoading} />}
        <Paper
          sx={{
            width: "25rem",
            marginInline: "auto",
            p: "2rem",
            backgroundColor: "#222831",
          }}
        >
          <Avatar
            sx={{ marginInline: "auto", mb: "32px", width: 56, height: 56 }}
          >
            <Person sx={{ color: "#fff", width: "32px", height: "32px" }} />
          </Avatar>
          <Typography
            variant="h5"
            align={"center"}
            sx={{
              color: "rgb(255 255 255/0.87)",
              fontWeight: "100",
              letterSpacing: "4px",
            }}
          >
            ID: {userData.id}
          </Typography>
          <br />
          <Divider />
          <br />
          <Typography
            variant="h5"
            align={"left"}
            sx={{
              color: "rgb(255 255 255/0.87)",
              fontWeight: "100",
              letterSpacing: "4px",
            }}
          >
            Username: {username}
          </Typography>
          <br />
          <Divider />
          <br />
          <Typography
            variant="h5"
            align={"left"}
            sx={{
              color: "rgb(255 255 255/0.87)",
              fontWeight: "100",
              letterSpacing: "4px",
            }}
          >
            email: {userData.email}
          </Typography>
          <br />
          <Divider />
          <br />
          <Switch
            checked={updatePassword}
            onChange={(e) => setUpdatePassword(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
          <form>
            <TextField
              required
              disabled={!updatePassword}
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
              disabled={!updatePassword}
              variant={"contained"}
              fullWidth
              size={"normal"}
              type={"submit"}
              sx={{ marginY: "1rem" }}
              color={"success"}
              onClick={submitHandler}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Profile;
