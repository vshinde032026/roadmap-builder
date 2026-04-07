import type { RoadmapTreeNode } from './buildTree';

type Props = {
  root: RoadmapTreeNode;
};

export function RoadmapTreeView({ root }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <TreeNode node={root} depth={0} />
    </div>
  );
}

function TreeNode({ node, depth }: { node: RoadmapTreeNode; depth: number }) {
  const titleSize =
    depth === 0 ? 'text-2xl font-bold' : depth === 1 ? 'text-lg font-semibold' : 'text-base font-medium';

  return (
    <div className={depth === 0 ? '' : 'mt-4 border-l-2 border-gray-200 pl-4'}>
      <h3 className={`${titleSize} text-gray-900`}>{node.node.title}</h3>
      {node.node.description && (
        <p className="mt-1 text-sm text-gray-600">{node.node.description}</p>
      )}
      {node.children.length > 0 && (
        <div className="mt-2">
          {node.children.map((child) => (
            <TreeNode key={child.node.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
