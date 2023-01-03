import { createSlice } from "@reduxjs/toolkit";
const networkSlice = createSlice({
  name: "network",
  initialState: {
    isNetworkCreated: false,
    isNetworkUpdated: false,
    networkId: "",
    networkName: "",
    nodes: [],
    links: [],
    circuits: [],
  },
  reducers: {
    createNetwork(state, action) {
      state.isNetworkCreated = false;
      state.networkId = -1;
      state.networkName = action.payload;
      state.nodes = [];
      state.links = [];
      state.circuits = [];
    },
    setIsNetworkCreated(state, action) {
      state.isNetworkCreated = action.payload;
    },
    setIsNetworkUpdated(state, action) {
      state.isNetworkUpdated = action.payload;
    },
    setNetworkId(state, action) {
      state.networkId = action.payload;
    },
    setNetworkName(state, action) {
      state.networkName = action.payload;
      state.networkId = -1;
    },
    setNodes(state, action) {
      const node = action.payload;
      state.nodes = [...state.nodes, node];
    },
    setNodeXY(state, action) {
      const pos = action.payload;
      const node = state.nodes.find((n) => n.nodeName === pos.label);
      node.x = pos.x;
      node.y = pos.y;
    },
    setLinks(state, action) {
      const link = action.payload;
      state.links = [...state.links, link];

      const fromNodeIndex = state.nodes.findIndex(
        (n) => n.nodeName === link.fromNode
      );
      const fromEdgeIndex = state.nodes[fromNodeIndex].edges.findIndex(
        (e) => e.edgeName === link.fromEdge
      );
      state.nodes[fromNodeIndex].edges[fromEdgeIndex].isAvailable = false;

      const toNodeIndex = state.nodes.findIndex(
        (n) => n.nodeName === link.toNode
      );
      const toEdgeIndex = state.nodes[toNodeIndex].edges.findIndex(
        (e) => e.edgeName === link.toEdge
      );
      state.nodes[toNodeIndex].edges[toEdgeIndex].isAvailable = false;
    },
    setNetwork(state, action) {
      const network = action.payload;
      state.networkId = network.id;
      state.networkName = network.networkName;
      state.nodes = [...network.nodes];
      state.links = [...network.links];
      state.circuits = [...network.circuits];
    },
    setCircuit(state, action) {
      state.circuits = [...action.payload];
    },
    editNode(state, action) {
      const data = action.payload;
      const node = state.nodes.find((n) => n.id === data.id);
      node.nodeName = data.nodeName;
      node.ipAddress = data.ipAddress;
      node.nodeType = data.nodeType;
      state.isNetworkUpdated = true;
    },
    deleteNode(state, action) {
      const nodeName = action.payload;
      const updatedNodes = [
        ...state.nodes.filter((n) => n.nodeName !== nodeName),
      ];
      const updatedLinks = [
        ...state.links.filter(
          (l) => l.fromNode !== nodeName && l.toNode !== nodeName
        ),
      ];
      state.links = [...updatedLinks];
      state.nodes = [...updatedNodes];
      state.isNetworkUpdated = true;
    },
    deleteLink(state, action) {
      const label = action.payload;
      const updatedLinks = [...state.links.filter((l) => l.label !== label)];
      state.links = [...updatedLinks];
      state.isNetworkUpdated = true;
    },
    clearNetwork(state) {
      state.isNetworkCreated = false;
      state.isNetworkUpdated = false;
      state.networkId = "";
      state.networkName = "";
      state.nodes = [];
      state.links = [];
    },
  },
});

export const networkActions = networkSlice.actions;

export default networkSlice;
