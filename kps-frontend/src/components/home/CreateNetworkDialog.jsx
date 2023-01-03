import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { networkActions } from "../../store/network";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CreateNetwork = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [networkName, setNetworkName] = useState("");
  const onNetworkClickHandler = (e) => {
    e.preventDefault();
    dispatch(networkActions.createNetwork(networkName));
    navigate("/network/-1/" + networkName);
  };
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      fullWidth
      maxWidth={"xs"}
      scroll={"paper"}
    >
      <DialogTitle>
        <Typography
          variant={"h4"}
          align={"center"}
          sx={{
            color: "rgb(255 255 255/0.8)",
            fontWeight: "200",
            textTransform: "uppercase",
            letterSpacing: "8px",
          }}
        >
          New Network
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={onNetworkClickHandler}>
          <TextField
            required
            autoFocus
            fullWidth
            margin={"dense"}
            variant={"outlined"}
            label={"Network Name"}
            size={"small"}
            value={networkName}
            onChange={(e) => setNetworkName(e.target.value)}
          />

          <Button
            type={"submit"}
            color={"success"}
            size={"small"}
            fullWidth
            variant={"outlined"}
            sx={{ mt: "1rem" }}
          >
            Create
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color={"error"} size={"small"}>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNetwork;
