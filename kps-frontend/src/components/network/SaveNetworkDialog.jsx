import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updatetNetworkAPI,
  addNetworkAPI,
} from "../../services/NetworkService";
import { networkActions } from "../../store/network";
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function SaveNetworkDialog(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const network = useSelector((state) => state.network);
  const username = useSelector((state) => state.auth.username);
  const [udp, setUdp] = useState();
  const isNetworkCreated = useSelector(
    (state) => state.network.isNetworkCreated
  );
  const isNetworkUpdated = useSelector(
    (state) => state.network.isNetworkUpdated
  );

  const saveNetworkHandler = async () => {
    props.setisLoading(true);
    handleClose();

    const newNetwork = {
      networkName: network.networkName,
      username: username,
      nodes: [...network.nodes],
      links: [...network.links],
      udp: udp,
    };

    await addNetworkAPI(newNetwork)
      .then((res) => {
        dispatch(networkActions.setIsNetworkCreated(true));
        dispatch(networkActions.setNetworkId(res.data.id));
        dispatch(networkActions.setNetworkName(res.data.networkName));
        props.setisLoading(false);
        navigate(`/network/${res.data.id}/${res.data.networkName}`);
        window.location.reload();
      })
      .catch((error) => {
        props.setisLoading(false);
        console.log(error);
      });
  };

  const updatetNetworkHandler = async () => {
    props.setisLoading(true);
    handleClose();

    const newNetwork = {
      id: network.networkId,
      networkName: network.networkName,
      username: username,
      nodes: [...network.nodes],
      links: [...network.links],
      udp: udp,
    };

    console.log(newNetwork);
    await updatetNetworkAPI(newNetwork)
      .then((res) => {
        console.table(res.data);
        dispatch(networkActions.setIsNetworkUpdated(false));
        dispatch(networkActions.setNetworkId(res.data.id));
        dispatch(networkActions.setNetworkName(res.data.networkName));
        props.setisLoading(false);
        navigate(`/network/${res.data.id}/${res.data.networkName}`);
        window.location.reload();
      })
      .catch((error) => {
        props.setisLoading(false);
        console.log(error);
      });
  };

  const addCircuitHandler = async (e) => {
    e.preventDefault();
    if (!isNetworkCreated) saveNetworkHandler();
    if (isNetworkCreated && !isNetworkUpdated) alert("Already saved!");
    if (isNetworkCreated && isNetworkUpdated) updatetNetworkHandler();
  };

  const handleClose = () => {
    props.setShowAddCircuit(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        fullWidth
        maxWidth={"xs"}
        aria-labelledby="draggable-dialog-title"
        hideBackdrop
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Typography
            variant={"h3"}
            align={"center"}
            sx={{
              color: "rgb(255 255 255/0.8)",
              fontWeight: "200",
              textTransform: "uppercase",
              letterSpacing: "8px",
            }}
          >
            Fiber
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={addCircuitHandler}>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  variant={"outlined"}
                  label={"User Defined Path"}
                  size={"small"}
                  value={udp}
                  onChange={(e) => setUdp(e.target.value)}
                />
              </Grid>
            </Grid>

            <Button
              type={"submit"}
              color={"success"}
              size={"medium"}
              fullWidth
              sx={{ mt: "1rem" }}
              variant={"outlined"}
            >
              add
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"error"} size={"small"}>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
