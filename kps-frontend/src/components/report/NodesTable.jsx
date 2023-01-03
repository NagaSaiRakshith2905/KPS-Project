import { DeleteRounded, EditRounded } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditNode from "./EditNode";
import { networkActions } from "../../store/network";

const NodesTable = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.network.nodes);
  const [editNodeOpen, setEditNodeOpen] = useState(false);
  const [editData, setEditData] = useState({});
  return (
    <Box mt={"2rem"}>
      {editNodeOpen && (
        <EditNode
          open={editNodeOpen}
          setEditNode={setEditNodeOpen}
          node={editData}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Node-Name</TableCell>
              <TableCell>IP-Address</TableCell>
              <TableCell>Node-Type</TableCell>
              <TableCell>x</TableCell>
              <TableCell>y</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((node) => (
              <TableRow
                key={node.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {node.id}
                </TableCell>
                <TableCell>{node.nodeName}</TableCell>
                <TableCell>{node.ipAddress}</TableCell>
                <TableCell>{node.nodeType}</TableCell>
                <TableCell>{node.x}</TableCell>
                <TableCell>{node.y}</TableCell>
                <TableCell>
                  <Tooltip title="Edit node">
                    <IconButton
                      onClick={(e) => {
                        setEditData(node);
                        setEditNodeOpen(true);
                      }}
                    >
                      <EditRounded />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete node">
                    <IconButton
                      onClick={(e) => {
                        dispatch(networkActions.deleteNode(node.nodeName));
                      }}
                    >
                      <DeleteRounded />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NodesTable;
