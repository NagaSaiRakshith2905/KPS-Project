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

export default function AddLink(props) {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.network.nodes);
  const links = useSelector((state) => state.network.links);
  const isNetworkCreated = useSelector(
    (state) => state.network.isNetworkCreated
  );

  const [linkLength, setLinkLength] = useState();
  const [noOfSpaces, setNoOfSpaces] = useState();

  const [fromNode, setFromNode] = useState();
  const [fromNodeList, setFromNodeList] = useState(nodes);

  const [toNode, setToNode] = useState();
  const [toNodeList, setToNodeList] = useState(nodes);

  const addLinkHandler = (e) => {
    e.preventDefault();
    const temp = [
      ...links.filter(
        (link) => link.fromNode === fromNode && link.toNode === toNode
      ),
    ];
    if (temp.length > 0) {
      alert("Link for these nodes already exists!");
    } else {
      const edges1 = nodes.find((node) => node.nodeName === fromNode).edges;
      const edges2 = nodes.find((node) => node.nodeName === toNode).edges;
      let edge1, edge2;
      for (var i = 0; i < edges1.length; i++) {
        if (edges1[i].isAvailable) {
          edge1 = edges1[i].edgeName;
          break;
        }
      }
      for (i = 0; i < edges2.length; i++) {
        if (edges2[i].isAvailable) {
          edge2 = edges2[i].edgeName;
          break;
        }
      }
      const newLink = {
        id: -1,
        label: `${fromNode + "->" + toNode}`,
        fromNode: fromNode,
        toNode: toNode,
        fromEdge: edge1,
        toEdge: edge2,
        length: linkLength,
        noOfSpaces: noOfSpaces,
      };
      dispatch(networkActions.setLinks(newLink));
      if (isNetworkCreated) dispatch(networkActions.setIsNetworkUpdated(true));
      handleClose();
    }
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
    props.setOpenAddLink(false);
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
          <form onSubmit={addLinkHandler}>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item md={6}>
                <TextField
                  select
                  required
                  fullWidth
                  variant={"outlined"}
                  size={"small"}
                  label="Select From Node"
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
                  label="Select To Node"
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

              <Grid item md={6}>
                <TextField
                  required
                  fullWidth
                  type={"number"}
                  variant={"outlined"}
                  label={"No.Of Spaces"}
                  size={"small"}
                  value={noOfSpaces}
                  onChange={(e) => setNoOfSpaces(e.target.value)}
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  required
                  fullWidth
                  type={"number"}
                  variant={"outlined"}
                  label={"Fiber Length"}
                  size={"small"}
                  value={linkLength}
                  onChange={(e) => setLinkLength(e.target.value)}
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
