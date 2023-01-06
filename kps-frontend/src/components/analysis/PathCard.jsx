import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ExpandMoreRounded } from "@mui/icons-material";
import NodeCard from "./NodeCard";

const PathCard = (props) => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: "1rem",
        py: "0.5rem",
        mb: "1rem",
        backgroundColor: "rgba(34, 40, 49,0.5)",
        cursor: "pointer",
      }}
    >
      <Accordion
        sx={{ backgroundColor: "#222831" }}
        expanded={expanded === props.path.id}
        onChange={handleChange(props.path.id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreRounded />}
          id="panel1bh-header"
        >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography
              variant={"body2"}
              sx={{
                color: "rgb(255 255 255/0.5)",
                fontWeight: "200",
                minWidth: "8rem",
              }}
            >
              {props.index === 0 ? "Shortest-Path" : " "}
            </Typography>
            <Divider orientation="vertical" variant={"fullWidth"} flexItem />
            <Box display={"flex"} gap={1}>
              {props.path.nodes.map((node, index) => (
                <Typography variant={"subtitle1"}>
                  {node.nodeName}{" "}
                  {index < props.path.nodes.length - 1 && " -> "}
                </Typography>
              ))}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={1}>
            <NodeCard nodes={props.path.nodes} />
            <Typography>Total Weight : {props.path.totalWeight}</Typography>
            <Typography>Space Occupied : {props.path.spaceOccupied}</Typography>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PathCard;
