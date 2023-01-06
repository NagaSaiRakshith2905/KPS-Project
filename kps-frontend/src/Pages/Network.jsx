import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { NavigateBeforeRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getByIdAPI } from "../services/NetworkService";
import { networkActions } from "../store/network";
import NavBar from "../components/network/NavBar";
import ToolBar from "../components/network/ToolBar";
import Circuit from "../components/network/Circuit";
import AddNode from "../components/network/AddNode";
import AddLink from "../components/network/AddLink";
import LoadinDailog from "../components/LoadinDailog";
import AddCircuitDialog from "../components/AddCircuitDialog";
import SaveNetworkDialog from "../components/network/SaveNetworkDialog";

const Network = () => {
  const { id, networkName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = localStorage.getItem("username");
  useEffect(() => {
    if (!username) navigate("/signup");
  }, [username, navigate]);

  const [showAddCircuit, setShowAddCircuit] = useState(false);
  const [udp, setUdp] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const nodes = useSelector((state) => state.network.nodes);
  const links = useSelector((state) => state.network.links);

  useEffect(() => {
    document.title = `KPS | Network`;
    dispatch(networkActions.setNetworkId(id));
    dispatch(networkActions.setNetworkName(networkName));
    if (id > -1) {
      getNetworkByIdHandler();
      dispatch(networkActions.setIsNetworkCreated(true));
    }
  }, [id, dispatch, networkName]);
  const getNetworkByIdHandler = async () => {
    await getByIdAPI(id)
      .then((res) => {
        dispatch(networkActions.setNetwork(res.data));
      })
      .catch((error) => console.log(error));
  };
  const [openAddNode, setOpenAddNode] = useState(false);
  const [openAddLink, setOpenAddLink] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      {openAddNode && (
        <AddNode open={openAddNode} setOpenAddNode={setOpenAddNode} />
      )}
      {openAddLink && (
        <AddLink open={openAddLink} setOpenAddLink={setOpenAddLink} />
      )}
      {isLoading && <LoadinDailog />}
      {showAddCircuit && (
        <AddCircuitDialog
          udp={udp}
          setUdp={setUdp}
          open={showAddCircuit}
          setShowAddCircuit={setShowAddCircuit}
          setisLoading={setIsLoading}
        />
      )}
      <NavBar />
      <ToolBar
        setShowAddCircuit={setShowAddCircuit}
        setOpenAddNode={setOpenAddNode}
        setOpenAddLink={setOpenAddLink}
        nodes={nodes}
        links={links}
      />
      <Circuit />
    </Box>
  );
};

export default Network;
