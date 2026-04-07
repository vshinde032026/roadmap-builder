import { api } from '@/lib/api-client';
import type { Roadmap, RoadmapCreate } from './types';

export const listRoadmaps = () => api.get<Roadmap[]>('/roadmaps');
export const getRoadmap = (id: string) => api.get<Roadmap>(`/roadmaps/${id}`);
export const createRoadmap = (data: RoadmapCreate) => api.post<Roadmap>('/roadmaps', data);
export const updateRoadmap = (id: string, data: Partial<RoadmapCreate>) =>
  api.patch<Roadmap>(`/roadmaps/${id}`, data);
export const deleteRoadmap = (id: string) => api.delete<void>(`/roadmaps/${id}`);
