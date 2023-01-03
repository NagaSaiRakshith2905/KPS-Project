import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { MenuItem, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { networkActions } from "../../store/network";

const NODE_TYPE = ["add-drop", "ola", "pass-through"];

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

export default function EditNode(props) {
  const dispatch = useDispatch();
  const [nodeName, setNodeName] = useState(props.node.nodeName);
  const [ipAddress, setIpAddress] = useState(props.node.ipAddress);
  const [nodeType, setNodeType] = useState(
    NODE_TYPE.filter((type) =>
      type.includes(props.node.nodeType.split("_").at(0).toLowerCase())
    )
  );

  const addNodeHandler = (e) => {
    e.preventDefault();

    const node = {
      id: props.node.id,
      nodeName: nodeName,
      ipAddress: ipAddress,
      nodeType: nodeType,
    };

    dispatch(networkActions.editNode(node));
    handleClose();
  };
  const handleClose = () => {
    props.setEditNode(false);
  };
  return (
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
            label={"Node-Name"}
            size={"small"}
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            margin={"normal"}
            variant={"outlined"}
            label={"IP-Address"}
            size={"small"}
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
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
            save
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color={"error"} size={"small"}>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
