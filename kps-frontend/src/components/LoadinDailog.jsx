import { Box, CircularProgress, Dialog } from "@mui/material";
import React from "react";

const LoadinDailog = (props) => {
  return (
    <Dialog open={props.open} keepMounted scroll={"paper"}>
      <Box p={"1rem"} width={"min-content"}>
        <CircularProgress color={"info"} />
      </Box>
    </Dialog>
  );
};

export default LoadinDailog;
