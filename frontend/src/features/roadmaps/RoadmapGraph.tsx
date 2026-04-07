import { useMemo } from 'react';
import { ReactFlow, Background, Controls, type NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import type { RoadmapNode } from '@/lib/api/roadmaps';
import { layoutRoadmap } from './layoutGraph';

type Props = {
  nodes: RoadmapNode[];
  onNodeClick?: (node: RoadmapNode) => void;
};

export function RoadmapGraph({ nodes, onNodeClick }: Props) {
  const { nodes: flowNodes, edges: flowEdges } = useMemo(
    () => layoutRoadmap(nodes),
    [nodes],
  );

  const handleClick: NodeMouseHandler = (_, flowNode) => {
    if (!onNodeClick) return;
    const original = nodes.find((n) => n.id === flowNode.id);
    if (original) onNodeClick(original);
  };

  return (
    <div className="h-[80vh] w-full rounded-lg border border-gray-200 bg-white">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodeClick={handleClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
      >
        <Background gap={20} color="#e5e7eb" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
