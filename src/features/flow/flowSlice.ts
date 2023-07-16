import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nodesState, edgesState } from "./state";
import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  OnConnect,
} from "reactflow";

export interface NodesState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
}

enum MarkerType {
  Arrow = "arrow",
  ArrowClosed = "arrowclosed",
}

export interface NodeData {
  values: string[] | number[];
  label: string;
}

export interface NodeUpdate {
  id: string;
  data: number[];
}

export const flowSlice = createSlice({
  name: "flow",
  initialState: { nodes: nodesState, edges: edgesState },
  reducers: {
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },

    onAddNode: (state) => {
      const lastNode: Node = state.nodes[state.nodes.length - 1];
      state.nodes.push({
        id: `${state.nodes.length + 1}`,
        type: "selector",
        data: {
          label: state.nodes.length.toString(),
          values: (lastNode.data as NodeData).values,
        },
        position: {
          x: lastNode.position.x + 100,
          y: lastNode.position.y + 200,
        },
      });
      state.edges.push({
        id: `e-${state.edges.length + 1}-${state.edges.length + 2}`,
        source: `${state.nodes.length - 1}`,
        target: `${state.nodes.length}`,
        type: "step",
        markerEnd: { type: MarkerType.Arrow, width: 20, height: 20 },
      });
    },

    onUpdateNode: (state, action: PayloadAction<NodeUpdate>) => {
      state.nodes = state.nodes.map((node, index) => {
        if (index >= +action.payload.id - 1) {
          return {
            ...node,
            data: {
              ...(node.data as NodeData),
              values: action.payload.data,
            },
          };
        }
        return node;
      });
    },

    resetNodes: (state) => {
      state.nodes = nodesState;
      state.edges = edgesState;
    },
  },
});

export const {
  onNodesChange,
  onEdgesChange,
  onAddNode,
  onUpdateNode,
  resetNodes,
} = flowSlice.actions;

export default flowSlice.reducer;
