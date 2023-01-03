import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DeleteRounded, VisibilityRounded } from "@mui/icons-material";
import { deleteNetworkAPI } from "../../services/NetworkService";

const NetworkCard = (props) => {
  const navigate = useNavigate();

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    await deleteNetworkAPI(id)
      .then((resp) => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <Paper
      sx={{
        width: "100%",
        px: "1rem",
        py: "0.5rem",
        mb: "1rem",
        backgroundColor: "#222831",
        cursor: "pointer",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} gap={"1rem"}>
          <Typography
            variant={"body2"}
            sx={{ color: "rgb(255 255 255/0.5)", fontWeight: "200" }}
          >
            {props.id}
          </Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant={"subtitle1"}> {props.networkName} </Typography>
        </Stack>
        <Box display={"flex"} gap={"1rem"}>
          <Tooltip title="View Network">
            <IconButton
              color={"info"}
              onClick={(e) =>
                navigate(`/network/${props.id}/${props.networkName}`)
              }
            >
              <VisibilityRounded />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Network">
            <IconButton
              color={"error"}
              onClick={(e) => {
                deleteHandler(e, props.id);
              }}
            >
              <DeleteRounded />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Paper>
  );
};

export default NetworkCard;
