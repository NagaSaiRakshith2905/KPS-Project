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

import * as XLSX from "xlsx";

const NavBar = (props) => {
  const navigate = useNavigate();
  const { id, networkName } = useParams();

  const isNetworkCreated = useSelector(
    (state) => state.network.isNetworkCreated
  );
  const isNetworkUpdated = useSelector(
    (state) => state.network.isNetworkUpdated
  );
  const network = useSelector((state) => state.network);

  const exportDataHandler = (e) => {
    e.preventDefault();
    const temp = [];
    network.nodes.forEach((node) => {
      const name = node.nodeName;
      node.edges.forEach((edge) => {
        const value = { nodeName: name, ...edge };
        temp.push(value);
      });
    });

    const nodes = XLSX.utils.json_to_sheet(network.nodes);
    const fibers = XLSX.utils.json_to_sheet(network.links);
    const edges = XLSX.utils.json_to_sheet(temp);
    const wb = {
      Sheets: { nodes: nodes, fibers: fibers, edges: edges },
      SheetNames: ["nodes", "fibers", "edges"],
    };
    XLSX.writeFile(wb, "CompleteReport.xlsx");
  };

  const setShowAddCircuitHandle = (e) => {
    props.setShowAddCircuit(true);
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
                onClick={exportDataHandler}
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
                  if (isNetworkCreated && !isNetworkUpdated)
                    alert("Already saved!");
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NavBar;
