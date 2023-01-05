import {
  Box,
  Button,
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
import ExportIcon from "../../images/table-export.svg";
import { useSelector } from "react-redux";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import * as XLSX from "xlsx";

const EdgesTable = () => {
  const nodes = useSelector((state) => state.network.nodes);
  const [node, setNode] = useState(nodes.at(0).nodeName);
  const [edges, setEdges] = useState(nodes.at(0).edges);

  // const tableRef = useRef(null);

  // const { onDownload } = useDownloadExcel({
  //   currentTableRef: tableRef.current,
  //   filename: "Edges Data",
  //   sheet: "Edges Data",
  // });

  const nodeChangeHandler = (e) => {
    setNode(e.target.value);
    const temp = nodes.filter((val) => val.nodeName === e.target.value);
    setEdges(temp[0].edges);
  };

  const exportEdgesHandler =(e) => {
    e.preventDefault();
    const names = [];
    const values = {};
    nodes.forEach(node => {
      names.push(node.nodeName)
      const temp = node.nodeName
      values[temp]=XLSX.utils.json_to_sheet(node.edges)
    });
   const wb = {Sheets:values, SheetNames:names}
   XLSX.writeFile(wb, "EdgesData.xlsx");
  }

  // const handleOnExport = () => {
  //   console.log(exportEdgesHandler.temp)
  // }
  return (
    <Box mt={"2rem"} display="flex" flexDirection={"column"} gap={2}>
      <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
        <TextField
          select
          variant={"outlined"}
          size={"small"}
          label="Select Node"
          sx={{ width: "300px" }}
          value={node}
          onChange={nodeChangeHandler}
        >
          {nodes.map((node, index) => (
            <MenuItem key={index} value={node.nodeName}>
              {node.nodeName}
            </MenuItem>
          ))}
        </TextField>
        <Button size={"small"} variant={"outlined"} color={"info"} onClick = {exportEdgesHandler}>
          export edges
          <img
            src={ExportIcon}
            style={{ marginLeft: "8px" }}
            width={"18px"}
            alt=""
          />
        </Button>
      </Stack>
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
    </Box>
  );
};

export default EdgesTable;
