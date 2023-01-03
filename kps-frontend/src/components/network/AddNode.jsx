import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { MenuItem, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { networkActions } from "../../store/network";

const NODE_TYPE = ["add_drop", "ola", "pass_through"];

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

export default function AddNode(props) {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.network.nodes);
  const [nodeName, setNodeName] = useState();
  const [nodeType, setNodeType] = useState(NODE_TYPE[0]);
  const isNetworkCreated = useSelector(
    (state) => state.network.isNetworkCreated
  );

  const addNodeHandler = (e) => {
    e.preventDefault();
    const temp = [...nodes.filter((node) => node.nodeName === nodeName)];
    if (temp.length > 0) {
      alert("Node with " + nodeName + " already exists!");
    } else {
      const noOfEdges = nodeType === NODE_TYPE[0] ? 16 : 2;
      const edges = [];
      for (let i = 0; i < noOfEdges; i++) {
        edges.push({
          edgeName: String.fromCharCode(65 + i),
          isAvailable: true,
        });
      }
      const node = {
        id: -1,
        nodeName: nodeName,
        ipAddress: "192.168.10." + Math.floor(Math.random() * 255),
        password: "1234",
        nodeType: nodeType,
        x: 100,
        y: 100,
        edges: edges,
      };

      dispatch(networkActions.setNodes(node));
      if (isNetworkCreated) dispatch(networkActions.setIsNetworkUpdated(true));
      handleClose();
    }
  };
  const handleClose = () => {
    props.setOpenAddNode(false);
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
            Node
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={addNodeHandler}>
            <TextField
              autoFocus
              required
              fullWidth
              margin={"normal"}
              variant={"outlined"}
              label={"lable/name"}
              size={"small"}
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
            />
            <TextField
              select
              required
              fullWidth
              margin={"normal"}
              variant={"outlined"}
              size={"small"}
              label="Select Node type"
              value={nodeType}
              onChange={(e) => setNodeType(e.target.value)}
            >
              {NODE_TYPE.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type={"submit"}
              color={"success"}
              size={"medium"}
              fullWidth
              sx={{ marginY: "1rem" }}
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
