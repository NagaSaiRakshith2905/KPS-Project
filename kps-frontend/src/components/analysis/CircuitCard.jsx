import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import PathCard from "./PathCard";

const CirciutCard = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        px: "1rem",
        py: "0.5rem",
        mb: "1rem",
        backgroundColor: "rgba(34, 40, 49,0.5)",
        cursor: "pointer",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={"1rem"}>
        <Typography
          variant={"body2"}
          sx={{ color: "rgb(255 255 255/0.5)", fontWeight: "200" }}
        >
          ID : {props.circuit.id}
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Typography
            variant={"body2"}
            sx={{ color: "rgb(255 255 255/0.8)", fontWeight: "200" }}
          >
            Source :
          </Typography>
          <Typography variant={"subtitle1"}>
            {props.circuit.sourceNode}
          </Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography
            variant={"body2"}
            sx={{ color: "rgb(255 255 255/0.8)", fontWeight: "200" }}
          >
            Destination :
          </Typography>
          <Typography variant={"subtitle1"}>
            {props.circuit.destinationNode}
          </Typography>
          <Typography variant={"subtitle1"}>
            {props.i === 0 ? "User-Defined-Path" : " "}
          </Typography>
        </Box>
      </Stack>
      {props.circuit.paths.map((path, index) => (
        <PathCard key={index} path={path} index={index} />
      ))}
    </Box>
  );
};

export default CirciutCard;
