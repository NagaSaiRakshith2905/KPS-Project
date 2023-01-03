const NodeConverter = (x, y, label) => {
  return {
    id: label,
    position: { x: x, y: y },
    data: { label: label },
    style: {
      width: "75px",
      height: "75px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff",
      color: "#000",
      border: "none",
      boxShadow: "none",
    },
  };
};
export default NodeConverter;
