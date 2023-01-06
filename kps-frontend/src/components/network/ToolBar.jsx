import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addNetworkAPI,
  updatetNetworkAPI,
} from "../../services/NetworkService";
import { networkActions } from "../../store/network";

const ToolBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const network = useSelector((state) => state.network);
  const username = useSelector((state) => state.auth.username);

  const handleOpenNode = () => {
    props.setOpenAddNode(true);
  };

  const handleOpenLink = () => {
    props.setOpenAddLink(true);
  };

  const isNetworkUpdated = useSelector(
    (state) => state.network.isNetworkUpdated
  );
  const isNetworkCreated = useSelector(
    (state) => state.network.isNetworkCreated
  );

  // const saveNetworkHandler = async (e) => {
  //   e.preventDefault();

  //   const newNetwork = {
  //     networkName: network.networkName,
  //     username: username,
  //     nodes: [...network.nodes],
  //     links: [...network.links],
  //   };

  //   await addNetworkAPI(newNetwork)
  //     .then((res) => {
  //       dispatch(networkActions.setIsNetworkCreated(true));
  //       dispatch(networkActions.setNetworkId(res.data.id));
  //       dispatch(networkActions.setNetworkName(res.data.networkName));

  //       navigate(`/network/${res.data.id}/${res.data.networkName}`);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const updatetNetworkHandler = async (e) => {
  //   e.preventDefault();

  //   const newNetwork = {
  //     id: network.networkId,
  //     networkName: network.networkName,
  //     username: username,
  //     nodes: [...network.nodes],
  //     links: [...network.links],
  //   };

  //   const src = newNetwork.nodes.at(0).nodeName;
  //   const dst = newNetwork.nodes.at(newNetwork.nodes.length - 1).nodeName;

  //   await updatetNetworkAPI(newNetwork)
  //     .then((res) => {
  //       dispatch(networkActions.setIsNetworkCreated(true));
  //       dispatch(networkActions.setNetworkId(res.data.id));
  //       dispatch(networkActions.setNetworkName(res.data.networkName));

  //       navigate(`/network/${res.data.id}/${res.data.networkName}`);
  //     })
  //     .catch((error) => console.log(error));
  // };
  const setShowAddCircuitHandle = (e) => {
    props.setShowAddCircuit(true);
  };
  return (
    <Box bgcolor={"rgba(34, 40, 49,0.5)"}>
      <Stack
        direction={"row"}
        width="min(100% , 1200px)"
        marginInline="auto"
        height={"8vh"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Grid
          container
          columns={12}
          px={"1rem"}
          py={"0.5rem"}
          maxWidth={"30%"}
          alignItems={"center"}
          bgcolor={"rgb(34, 40, 49)"}
          borderRadius="0.5rem"
        >
          <Grid item md={2}>
            <Typography variant={"body2"}>add</Typography>
          </Grid>
          <Grid item md={5}>
            <Button fullWidth size={"small"} onClick={handleOpenNode}>
              Node
            </Button>
          </Grid>
          <Grid item md={5}>
            <Button fullWidth size={"small"} onClick={handleOpenLink}>
              Fiber
            </Button>
          </Grid>
        </Grid>
        <Button
          color={"success"}
          disabled={
            (!isNetworkCreated || isNetworkUpdated) &&
            (props.nodes.length < 2 || props.links.length < 1)
          }
          variant="contained"
          onClick={(e) => {
            if (isNetworkCreated && !isNetworkUpdated) alert("Already saved!");
            else {
              setShowAddCircuitHandle(e);
            }
          }}
        >
          {!isNetworkCreated
            ? "Save Network"
            : isNetworkUpdated
            ? "Update Network"
            : "Save Network"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ToolBar;
