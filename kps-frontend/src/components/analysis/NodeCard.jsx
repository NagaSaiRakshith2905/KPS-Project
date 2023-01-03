import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NodeCard = (props) => {
  const links = useSelector((state) => state.network.links);
  const [values, setValues] = useState([]);
  useEffect(() => {
    const len = props.nodes.length;
    setValues([]);
    for (var i = 0; i < len - 1; i++) {
      const temp = i;
      const val = links.find(
        (link) =>
          link.fromNode === props.nodes.at(temp).nodeName &&
          link.toNode === props.nodes.at(temp + 1).nodeName
      );
      setValues((prev) => {
        return [...prev, val];
      });
      console.log(val);
    }
  }, [links, props.nodes]);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgcolor={"rgb(52, 61, 75)"}
      width={"fit-content"}
      p={2}
      borderRadius={1}
    >
      {values.map((value, index) => (
        <Typography>
          {value.fromNode} : {value.fromEdge} ---{value.weight}--{`>`}{" "}
          {value.toEdge} : {value.toNode}
        </Typography>
      ))}
    </Box>
  );
};

export default NodeCard;
