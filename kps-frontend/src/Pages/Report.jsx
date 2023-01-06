import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircuitDialog from "../components/AddCircuitDialog";
import LoadinDailog from "../components/LoadinDailog";
import EdgesTable from "../components/report/EdgesTable";
import LinksTable from "../components/report/LinksTable";
import NavBar from "../components/report/NavBar";
import NodesTable from "../components/report/NodesTable";

const Report = () => {
  const [value, setValue] = useState("node");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddCircuit, setShowAddCircuit] = useState(false);
  const [udp, setUdp] = useState();
  useEffect(() => {
    document.title = "KPS | Report";
  });
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      {isLoading && <LoadinDailog />}
      {showAddCircuit && (
        <AddCircuitDialog
          udp={udp}
          setUdp={setUdp}
          open={showAddCircuit}
          setShowAddCircuit={setShowAddCircuit}
          setisLoading={setIsLoading}
        />
      )}
      <NavBar setShowAddCircuit={setShowAddCircuit} />
      <Box
        sx={{
          padding: "2rem",
          width: "min(100% , 1000px)",
          marginInline: "auto",
          height: "92vh",
        }}
      >
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          row
          onChange={(e) => setValue(e.target.value)}
        >
          <FormControlLabel value="node" control={<Radio />} label="Nodes" />
          <FormControlLabel value="link" control={<Radio />} label="Fibers" />
          <FormControlLabel value="edge" control={<Radio />} label="Edges" />
        </RadioGroup>
        {value === "node" && <NodesTable />}
        {value === "link" && <LinksTable />}
        {value === "edge" && <EdgesTable />}
      </Box>
    </Box>
  );
};

export default Report;
