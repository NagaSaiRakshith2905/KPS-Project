import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import { NavigateBeforeRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { networkActions } from "../../store/network";
import ExportIcon from "../../images/table-export.svg";
import {
  analysepathAPI,
  updatetNetworkAPI,
  addNetworkAPI,
} from "../../services/NetworkService";
const NavBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, networkName } = useParams();
  const isNetworkCreated = useSelector(
    (state) => state.network.isNetworkCreated
  );
  const isNetworkUpdated = useSelector(
    (state) => state.network.isNetworkUpdated
  );

  const network = useSelector((state) => state.network);
  const username = useSelector((state) => state.auth.username);

  const saveNetworkHandler = async (e) => {
    e.preventDefault();
    props.setisLoading(true);
    const newNetwork = {
      networkName: network.networkName,
      username: username,
      nodes: [...network.nodes],
      links: [...network.links],
    };

    const src = newNetwork.nodes.at(0).nodeName;
    const dst = newNetwork.nodes.at(newNetwork.nodes.length - 1).nodeName;

    const analysePath = async (id) => {
      return await analysepathAPI({
        src: src,
        dst: dst,
        networkId: id,
        path: " ",
      });
    };

    await addNetworkAPI(newNetwork)
      .then((res) => {
        dispatch(networkActions.setIsNetworkCreated(true));
        dispatch(networkActions.setNetworkId(res.data.id));
        dispatch(networkActions.setNetworkName(res.data.networkName));
        analysePath(res.data.id)
          .then((resp) => console.log(resp))
          .catch((err) => console.log(err));
        props.setisLoading(false);
        window.location.reload();
        navigate(`/network/${res.data.id}/${res.data.networkName}`);
      })
      .catch((error) => {
        props.setisLoading(false);
        console.log(error);
      });
  };

  const updatetNetworkHandler = async (e) => {
    e.preventDefault();
    props.setisLoading(true);

    const newNetwork = {
      id: network.networkId,
      networkName: network.networkName,
      username: username,
      nodes: [...network.nodes],
      links: [...network.links],
    };

    const src = newNetwork.nodes.at(0).nodeName;
    const dst = newNetwork.nodes.at(newNetwork.nodes.length - 1).nodeName;

    const analysePath = async (id) => {
      return await analysepathAPI({
        src: src,
        dst: dst,
        networkId: id,
        path: " ",
      });
    };

    console.log(newNetwork);
    await updatetNetworkAPI(newNetwork)
      .then((res) => {
        console.table(res.data);
        dispatch(networkActions.setIsNetworkUpdated(false));
        dispatch(networkActions.setNetworkId(res.data.id));
        dispatch(networkActions.setNetworkName(res.data.networkName));
        analysePath(id)
          .then((resp) => console.log(resp))
          .catch((err) => console.log(err));
        props.setisLoading(false);
        window.location.reload();
        navigate(`/network/${res.data.id}/${res.data.networkName}`);
      })
      .catch((error) => {
        props.setisLoading(false);
        console.log(error);
      });
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
        <Grid item xs={3} md={8}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            Report
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Grid container alignItems={"center"} columnSpacing={2}>
            <Grid item md={6}>
              <Button
                fullWidth
                size={"small"}
                variant={"outlined"}
                color={"info"}
              >
                export report
                <img
                  src={ExportIcon}
                  style={{ marginLeft: "8px" }}
                  width={"18px"}
                  alt=""
                />
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button
                fullWidth
                size={"small"}
                variant={"outlined"}
                color={"warning"}
                disabled={
                  (!isNetworkCreated || isNetworkUpdated) &&
                  (network.nodes.length < 2 || network.links.length < 1)
                }
                onClick={(e) => {
                  if (!isNetworkCreated) saveNetworkHandler(e);
                  if (isNetworkCreated && !isNetworkUpdated)
                    alert("Already saved!");
                  if (isNetworkCreated && isNetworkUpdated)
                    updatetNetworkHandler(e);
                }}
              >
                {!isNetworkCreated
                  ? "Save Network"
                  : isNetworkUpdated
                  ? "Update Network"
                  : "Save Network"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NavBar;
