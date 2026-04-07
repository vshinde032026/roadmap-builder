import type { RoadmapNode } from '@/lib/api/roadmaps';

export type RoadmapTreeNode = {
  node: RoadmapNode;
  children: RoadmapTreeNode[];
};

/**
 * Convert a flat list of roadmap nodes into a nested tree using parent_id.
 * Returns the root tree node, or null if no root is found.
 */
export function buildTree(nodes: RoadmapNode[]): RoadmapTreeNode | null {
  const byId = new Map<string, RoadmapTreeNode>();
  for (const node of nodes) {
    byId.set(node.id, { node, children: [] });
  }

  let root: RoadmapTreeNode | null = null;
  for (const node of nodes) {
    const entry = byId.get(node.id)!;
    if (node.parent_id === null) {
      root = entry;
    } else {
      const parent = byId.get(node.parent_id);
      if (parent) parent.children.push(entry);
    }
  }
  return root;
}
