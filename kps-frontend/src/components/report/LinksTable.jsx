import { DeleteRounded } from "@mui/icons-material";
import {
  Box,
  Button,
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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ExportIcon from "../../images/table-export.svg";
import { networkActions } from "../../store/network";

const LinksTable = () => {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.network.links);
  return (
    <Box
      mt={"2rem"}
      display="flex"
      flexDirection={"column"}
      gap={2}
      alignItems={"end"}
    >
      <Button size={"small"} variant={"outlined"} color={"info"}>
        export fibers
        <img
          src={ExportIcon}
          style={{ marginLeft: "8px" }}
          width={"18px"}
          alt=""
        />
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Link-Label</TableCell>
              <TableCell>From-Node</TableCell>
              <TableCell>To-Node</TableCell>
              <TableCell>Length</TableCell>
              <TableCell>No.Of Spaces</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links.map((link) => (
              <TableRow
                key={link.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {link.id}
                </TableCell>
                <TableCell>{link.label}</TableCell>
                <TableCell>
                  {link.fromNode} : {link.fromEdge}
                </TableCell>
                <TableCell>
                  {link.toNode} : {link.toEdge}
                </TableCell>
                <TableCell>{link.length}</TableCell>
                <TableCell>{link.noOfSpaces}</TableCell>
                <TableCell>
                  <Tooltip title="Delete node">
                    <IconButton
                      onClick={(e) => {
                        dispatch(networkActions.deleteLink(link.label));
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

export default LinksTable;
