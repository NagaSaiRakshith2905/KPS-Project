import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { NavigateBeforeRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
// import { networkActions } from "../../store/network";
import { analysepathAPI } from "../../services/NetworkService";
import ExportIcon from "../../images/table-export.svg";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, networkName } = useParams();
  // const isNetworkCreated = useSelector(
  //   (state) => state.network.isNetworkCreated
  // );

  const network = useSelector((state) => state.network);
  // const username = useSelector((state) => state.auth.username);

  const handleOpen = (e) => {
    e.preventDefault();
    props.setShowAddCircuit(true);
  };

  return (
    <Box bgcolor={"#222831"}>
      <Grid
        container
        alignItems="center"
        width={"100%"}
        height={"8vh"}
        paddingX={"2rem"}
        columns={{ xs: 4, md: 12 }}
      >
        <Grid item xs={1} md={1}>
          <IconButton
            size={"small"}
            onClick={(e) => {
              navigate(`/network/${id}/${networkName}`);
            }}
          >
            <NavigateBeforeRounded fontSize={"large"} />
          </IconButton>
        </Grid>
        <Grid item xs={3} md={9}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            Analysis
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Button size={"small"} fullWidth variant={"outlined"} color={"info"}>
            export analysis
            <img
              src={ExportIcon}
              style={{ marginLeft: "8px" }}
              width={"18px"}
              alt=""
            />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
