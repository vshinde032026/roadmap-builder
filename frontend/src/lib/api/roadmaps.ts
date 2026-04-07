import { api } from '@/lib/api-client';

export type RoadmapNode = {
  id: string;
  title: string;
  description: string;
  parent_id: string | null;
};

export type RoadmapGenerateResponse = {
  objective: string;
  nodes: RoadmapNode[];
};

export function generateRoadmap(objective: string) {
  return api.post<RoadmapGenerateResponse>('/roadmaps/generate', { objective });
}
