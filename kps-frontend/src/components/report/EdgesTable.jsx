import {
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const EdgesTable = () => {
  const nodes = useSelector((state) => state.network.nodes);
  const [node, setNode] = useState(nodes.at(0).nodeName);
  const [edges, setEdges] = useState(nodes.at(0).edges);
  const nodeChangeHandler = (e) => {
    setNode(e.target.value);
    const temp = nodes.filter((val) => val.nodeName === e.target.value);
    setEdges(temp[0].edges);
  };
  return (
    <Stack gap={2} mt={"2rem"}>
      <TextField
        select
        variant={"outlined"}
        size={"small"}
        label="Select Node"
        value={node}
        onChange={nodeChangeHandler}
      >
        {nodes.map((node, index) => (
          <MenuItem key={index} value={node.nodeName}>
            {node.nodeName}
          </MenuItem>
        ))}
      </TextField>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Edge-Name</TableCell>
              <TableCell>Is-Available</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {edges.map((edge) => (
              <TableRow
                key={edge.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {edge.id}
                </TableCell>
                <TableCell>{edge.edgeName}</TableCell>
                <TableCell>{edge.isAvailable ? "YES" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default EdgesTable;
