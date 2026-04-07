import type { Edge, Node, Position } from '@xyflow/react';
import type { RoadmapNode } from '@/lib/api/roadmaps';
import { buildTree } from './buildTree';

/**
 * Layout strategy (roadmap.sh-inspired, two-level data):
 * - Root + major topics form a vertical "spine" centered at x = 0.
 * - Each major topic's sub-topics form a tight cluster to the RIGHT,
 *   centered vertically on that major topic.
 * - Spine y advances by max(MIN_SPINE_GAP, sub-cluster height + padding),
 *   so sub-topic clusters never overlap each other.
 */

const SPINE_X = 0;
const SUB_X = 360;
const NODE_WIDTH = 240;
const SUB_NODE_HEIGHT = 50;
const MAJOR_NODE_HEIGHT = 64;
const SUB_Y_GAP = 12; // gap between sub nodes
const MIN_SPINE_GAP = 110; // floor between consecutive spine nodes
const SPINE_PADDING = 40; // extra breathing room when sub-cluster is tall

type Built = { nodes: Node[]; edges: Edge[] };

export function layoutRoadmap(nodes: RoadmapNode[]): Built {
  const root = buildTree(nodes);
  if (!root) return { nodes: [], edges: [] };

  const out: Built = { nodes: [], edges: [] };
  let y = 0;

  // Root sits at the top of the spine.
  out.nodes.push(makeMainNode(root.node, SPINE_X, y, true));
  y += MIN_SPINE_GAP;

  for (const major of root.children) {
    const subCount = major.children.length;
    const clusterHeight =
      subCount > 0 ? subCount * SUB_NODE_HEIGHT + (subCount - 1) * SUB_Y_GAP : 0;
    const rowHeight = Math.max(MIN_SPINE_GAP, clusterHeight + SPINE_PADDING);

    // Center the major node vertically inside its row.
    const majorY = y + rowHeight / 2 - MAJOR_NODE_HEIGHT / 2;
    out.nodes.push(makeMainNode(major.node, SPINE_X, majorY, false));
    out.edges.push(makeSpineEdge(root.node.id, major.node.id));

    // Center the sub cluster on the same y as the major node.
    if (subCount > 0) {
      const clusterTop = majorY + MAJOR_NODE_HEIGHT / 2 - clusterHeight / 2;
      major.children.forEach((sub, i) => {
        const subY = clusterTop + i * (SUB_NODE_HEIGHT + SUB_Y_GAP);
        out.nodes.push(makeSubNode(sub.node, SUB_X, subY));
        out.edges.push(makeSubEdge(major.node.id, sub.node.id));
      });
    }

    y += rowHeight;
  }

  // Connect spine: root → first major → second major → ...
  for (let i = 0; i < root.children.length - 1; i++) {
    out.edges.push(
      makeSpineEdge(root.children[i]!.node.id, root.children[i + 1]!.node.id),
    );
  }

  return out;
}

function makeMainNode(
  node: RoadmapNode,
  x: number,
  y: number,
  isRoot: boolean,
): Node {
  return {
    id: node.id,
    position: { x, y },
    data: { label: node.title },
    type: 'default',
    sourcePosition: 'bottom' as Position,
    targetPosition: 'top' as Position,
    style: {
      background: isRoot ? '#1f2937' : '#facc15',
      color: isRoot ? '#ffffff' : '#1f2937',
      border: '2px solid #1f2937',
      borderRadius: 6,
      padding: '12px 16px',
      fontWeight: 700,
      fontSize: 14,
      width: NODE_WIDTH,
      height: MAJOR_NODE_HEIGHT,
      textAlign: 'center',
      boxShadow: '3px 3px 0 #1f2937',
    },
  };
}

function makeSubNode(node: RoadmapNode, x: number, y: number): Node {
  return {
    id: node.id,
    position: { x, y },
    data: { label: node.title },
    type: 'default',
    sourcePosition: 'left' as Position,
    targetPosition: 'left' as Position,
    style: {
      background: '#fde68a',
      color: '#1f2937',
      border: '1.5px solid #1f2937',
      borderRadius: 6,
      padding: '8px 12px',
      fontWeight: 500,
      fontSize: 12,
      width: NODE_WIDTH,
      height: SUB_NODE_HEIGHT,
      textAlign: 'center',
      lineHeight: '1.3',
    },
  };
}

function makeSpineEdge(source: string, target: string): Edge {
  return {
    id: `e-${source}-${target}`,
    source,
    target,
    type: 'straight',
    style: { stroke: '#2563eb', strokeWidth: 2.5 },
  };
}

function makeSubEdge(source: string, target: string): Edge {
  return {
    id: `e-${source}-${target}`,
    source,
    target,
    type: 'smoothstep',
    style: { stroke: '#2563eb', strokeWidth: 1.5, strokeDasharray: '4 4' },
  };
}
