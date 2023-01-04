import { Box, Button } from "@mui/material";
import React from "react";
import pagenotfound from "../images/page-not-found.svg";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        bgcolor={"#222831"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          py: "1rem",
          px: "2rem",
          marginInline: "auto",
          borderRadius: "1rem",
        }}
      >
        <img src={pagenotfound} width={"400px"} alt="logo" />
        <Button
          color={"warning"}
          fullWidth
          size={"medium"}
          variant={"contained"}
          onClick={(e) => navigate("/signup")}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default PageNotFound;
