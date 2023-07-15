import { useCallback, useMemo } from "react";
import { Handle, Position } from "reactflow";
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

  const lastNodeIndex = useAppSelector((state) => state.flow.nodes).length;

  const nodeId = useMemo(() => {
    return props.id;
  }, [props.id]);

  const onChange = useCallback(
    (items: number[]) => {
      dispatch(onUpdateNode({ id: nodeId, data: items }));
    },
    [dispatch, nodeId]
  );

  return (
    <>
      <Handle type="source" position={Position.Right} id={nodeId} />
      <Handle
        type="target"
        position={Position.Left}
        isValidConnection={(connection) => connection.source === nodeId}
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#6b5375' }}
      />
      <div className={styles.container}>
        <Dropdown onChange={onChange} savedValues={props.data.values} />
        {+props.id === lastNodeIndex && (
          <button
            className={styles.addNode}
            onClick={() => dispatch(onAddNode())}
          >
            Add Node
          </button>
        )}
      </div>
    </>
  );
}
