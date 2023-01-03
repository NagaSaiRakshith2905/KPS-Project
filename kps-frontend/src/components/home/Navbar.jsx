import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

const Navbar = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box bgcolor={"#222831"}>
      <Stack
        direction={"row"}
        width={"100%"}
        height={"8vh"}
        paddingY={"1rem"}
        paddingX={"2rem"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5" align={"center"} sx={{ cursor: "pointer" }}>
          K-Path Simulations.
        </Typography>
        {username && (
          <Button
            size={"small"}
            color={"warning"}
            onClick={(e) => {
              localStorage.removeItem("username");
              dispatch(authActions.setUsername(""));
              dispatch(authActions.setloggedin(false));
              navigate("/signup");
            }}
          >
            Logout
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Navbar;
