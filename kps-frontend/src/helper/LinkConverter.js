import { MarkerType } from "reactflow";

const LinkConverter = (label, source, target) => {
  return {
    id: label,
    source: source,
    target: target,
    label: label,
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed },
  };
};

export default LinkConverter;
