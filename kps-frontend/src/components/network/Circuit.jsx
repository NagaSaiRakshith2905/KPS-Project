import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import LinkConverter from "../../helper/LinkConverter";
import { networkActions } from "../../store/network";
import NodeConverter from "../../helper/NodeConverter";
import { Box } from "@mui/material";
import { LegendToggleOutlined } from "@mui/icons-material";

const Circuit = () => {
  const dispatch = useDispatch();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const nodeList = useSelector((state) => state.network.nodes);
  const linksList = useSelector((state) => state.network.links);

  useEffect(() => {
    if (nodeList) {
      nodeList.forEach((node) => {
        const newNode = NodeConverter(node.x, node.y, node.nodeName);
        setNodes((prev) => {
          return [...prev, newNode];
        });
      });
    }
    if (linksList) {
      linksList.forEach((link) => {
        const newLink = LinkConverter(link.label, link.fromNode, link.toNode);
        setEdges((prev) => {
          return [...prev, newLink];
        });
      });
    }
  }, [nodeList, linksList, setNodes, setEdges]);

  useEffect(() => {
    const timer = setTimeout(() => {
      nodes.forEach((node) => {
        const position = {
          label: node.data.label,
          x: Math.floor(node.position.x),
          y: Math.floor(node.position.y),
        };
        dispatch(networkActions.setNodeXY(position));
      });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [nodes, dispatch]);

  const onConnect = useCallback((params) => {
    const edges1 = nodeList.find(
      (node) => node.nodeName === params.source
    ).edges;
    const edges2 = nodeList.find(
      (node) => node.nodeName === params.target
    ).edges;
    let edge1, edge2;
    for (var i = 0; i < edges1.length; i++) {
      if (edges1[i].isAvailable) {
        edge1 = edges1[i].edgeName;
        break;
      }
    }
    for (i = 0; i < edges2.length; i++) {
      if (edges2[i].isAvailable) {
        edge2 = edges2[i].edgeName;
        break;
      }
    }
    const newLink = {
      id: -1,
      label: `${params.source + "->" + params.target}`,
      fromNode: params.source,
      toNode: params.target,
      fromEdge: edge1,
      toEdge: edge2,
      length: 10,
      noOfSpaces: 16,
    };
    dispatch(networkActions.setLinks(newLink));
    // setEdges((eds) => {
    //   console.log(eds);
    //   addEdge(params, eds);
    // });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "84vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: "rgba(34, 40, 49,0.5)",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeClick={(e) => console.log(e.target.innerText)}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Box>
    </Box>
  );
};

export default Circuit;
