import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddCircuitDialog from "../components/analysis/AddCircuitDialog";
import CirciutCard from "../components/analysis/CircuitCard";
import Navbar from "../components/analysis/Navbar";
import LoadinDailog from "../components/LoadinDailog";

const Analysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const circuits = useSelector((state) => state.network.circuits);
  const [showAddCircuit, setShowAddCircuit] = useState(false);
  useEffect(() => {
    document.title = "KPS | Analysis";
  }, []);
  return (
    <Box width={"100%"} height={"100vh"} sx={{ overflowY: "scroll" }}>
      {isLoading && <LoadinDailog />}
      {showAddCircuit && (
        <AddCircuitDialog
          open={showAddCircuit}
          setShowAddCircuit={setShowAddCircuit}
        />
      )}
      <Navbar
        setShowAddCircuit={setShowAddCircuit}
        setisLoading={setIsLoading}
      />
      <Box
        sx={{
          padding: "2rem",
          width: "min(100% , 1000px)",
          marginInline: "auto",
          height: "92vh",
        }}
      >
        {circuits.map((circuit) => {
          return <CirciutCard circuit={circuit} />;
        })}
      </Box>
    </Box>
  );
};

export default Analysis;
