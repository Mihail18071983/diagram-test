import { useMemo } from "react";
import { NodeTypes } from "reactflow";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { onNodesChange, onEdgesChange, resetNodes } from "./flowSlice";
import ReactFlow from "reactflow";
import { onAddNode } from "./flowSlice";
import CustomNode from "../../components/CustomNode";
import "reactflow/dist/style.css";



export default function ReactFlowFeature() {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.flow.nodes);
  const edges = useAppSelector((state) => state.flow.edges);
  const nodeTypes: NodeTypes = useMemo(() => ({ selector: CustomNode }), []);
  const handleConnect = () => { 
    dispatch(onAddNode())
  }


  return (
    <>
      <button onClick={() => dispatch(resetNodes())}>Cкинути в початковий стан</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(e) => dispatch(onNodesChange(e))}
        onEdgesChange={(e) => dispatch(onEdgesChange(e))}
        nodeTypes={nodeTypes}
        onConnectEnd={handleConnect}
      />
    </>
  );
}
