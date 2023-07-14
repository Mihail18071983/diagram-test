import { useCallback, useMemo } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import Dropdown from "../DropDown";
import { onAddNode, onUpdateNode } from "../../features/flow/flowSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./index.module.scss";

interface CustomNodeProps {
  id: string;
  data: {
    values: number[];
  };
}

export default function CustomNode(props: CustomNodeProps) {
  const dispatch = useAppDispatch();
  const updateNodeInternals = useUpdateNodeInternals();

  const lastNodeIndex = useAppSelector((state) => state.flow.nodes).length;

  const nodeId = useMemo(() => {
    return props.id;
  }, [props.id]);

  const onChange = useCallback(
    (items: number[]) => {
      dispatch(onUpdateNode({ id: nodeId, data: items }));
      updateNodeInternals(nodeId);
    },
    [dispatch, nodeId, updateNodeInternals]
  );

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isValidConnection={(connection) => connection.source === nodeId}
      />
      <Handle
        type="target"
        position={Position.Left}
        isValidConnection={(connection) => connection.source === nodeId}
      />
      <Handle
        type="target"
        position={Position.Right}
        isValidConnection={(connection) => connection.source === nodeId}
      />
      <div className={styles.container}>
        <Dropdown onChange={onChange} savedValues={props.data.values} />
        {+props.id === lastNodeIndex && (
          <button className={styles.addNode} onClick={() => dispatch(onAddNode())}>Add Node</button>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
