import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { NavigateBeforeRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { networkActions } from "../../store/network";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, networkName } = useParams();
  const isNetworkCreated = useSelector(
    (state) => state.network.isNetworkCreated
  );

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
        <Grid item xs={1} md={2}>
          <IconButton
            size={"small"}
            onClick={(e) => {
              dispatch(networkActions.clearNetwork());
              navigate("/");
            }}
          >
            <NavigateBeforeRounded fontSize={"large"} />
          </IconButton>
        </Grid>
        <Grid item xs={1} md={7}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            {networkName}
          </Typography>
        </Grid>
        <Grid item xs={1} md={3}>
          <Grid container width={"100%"} columnSpacing={2}>
            <Grid item md={6}>
              <Button
                fullWidth
                size={"small"}
                variant={"outlined"}
                color={"info"}
                onClick={(e) =>
                  navigate(`/network/${id}/${networkName}/report`)
                }
              >
                View Report
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button
                fullWidth
                size={"small"}
                variant={"outlined"}
                disabled={!isNetworkCreated}
                color={"warning"}
                onClick={(e) =>
                  navigate(`/network/${id}/${networkName}/analysis`)
                }
              >
                View Analysis
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={1} md={2}>
          <Button size={"small"} variant={"outlined"} color={"info"}>
            View Report
          </Button>
        </Grid>
        <Grid item xs={1} md={2}>
          <Button
            size={"small"}
            variant={"outlined"}
            disabled={!isNetworkCreated}
            color={"warning"}
          >
            View Analysis
          </Button>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default NavBar;
