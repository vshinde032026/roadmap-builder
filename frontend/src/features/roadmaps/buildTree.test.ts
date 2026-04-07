import { describe, it, expect } from 'vitest';
import { buildTree } from './buildTree';
import type { RoadmapNode } from '@/lib/api/roadmaps';

const n = (id: string, parent_id: string | null): RoadmapNode => ({
  id,
  title: id,
  description: '',
  parent_id,
});

describe('buildTree', () => {
  it('builds a nested tree from flat nodes', () => {
    const tree = buildTree([n('n1', null), n('n2', 'n1'), n('n3', 'n1'), n('n4', 'n2')]);
    expect(tree).not.toBeNull();
    expect(tree!.node.id).toBe('n1');
    expect(tree!.children).toHaveLength(2);
    expect(tree!.children[0]!.node.id).toBe('n2');
    expect(tree!.children[0]!.children[0]!.node.id).toBe('n4');
    expect(tree!.children[1]!.node.id).toBe('n3');
  });

  it('returns null when no root is found', () => {
    expect(buildTree([n('n1', 'missing')])).toBeNull();
  });

  it('returns null for empty input', () => {
    expect(buildTree([])).toBeNull();
  });
});
