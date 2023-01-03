import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { analysepathAPI } from "../../services/NetworkService";
import { useNavigate } from "react-router-dom";

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

export default function AddCircuitDialog(props) {
  const navigate = useNavigate();
  const networkId = useSelector((state) => state.network.networkId);
  const nodes = useSelector((state) => state.network.nodes);
  const networkName = useSelector((state) => state.network.networkName);
  const circuits = useSelector((state) => state.network.circuits);

  const [udp, setUdp] = useState();

  const [fromNode, setFromNode] = useState();
  const [fromNodeList, setFromNodeList] = useState(nodes);

  const [toNode, setToNode] = useState();
  const [toNodeList, setToNodeList] = useState(nodes);

  const addCircuitHandler = async (e) => {
    e.preventDefault();

    const object = {
      src: fromNode,
      dst: toNode,
      networkId,
      path: udp && udp.length > 0 ? udp : " ",
    };
    await analysepathAPI(object)
      .then((res) => {
        navigate(`/network/${networkId}/${networkName}`);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  const fromNodeChangeHandler = (e) => {
    setFromNode(e.target.value);
    setToNodeList(nodes.filter((node) => node.nodeName !== e.target.value));
  };

  const toNodeChangeHandler = (e) => {
    setToNode(e.target.value);
    setFromNodeList(nodes.filter((node) => node.nodeName !== e.target.value));
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
              <Grid item md={6}>
                <TextField
                  select
                  required
                  fullWidth
                  variant={"outlined"}
                  size={"small"}
                  label="Select Source"
                  value={fromNode}
                  onChange={fromNodeChangeHandler}
                >
                  {fromNodeList.map((node, index) => (
                    <MenuItem key={index} value={node.nodeName}>
                      {node.nodeName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item md={6}>
                <TextField
                  select
                  required
                  fullWidth
                  variant={"outlined"}
                  size={"small"}
                  label="Select Destination"
                  value={toNode}
                  onChange={toNodeChangeHandler}
                >
                  {toNodeList.map((node, index) => (
                    <MenuItem key={index} value={node.nodeName}>
                      {node.nodeName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

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
