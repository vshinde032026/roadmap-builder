import { useQuery } from '@tanstack/react-query';
import { generateRoadmap } from '@/lib/api/roadmaps';

export function useGenerateRoadmap(objective: string) {
  return useQuery({
    queryKey: ['roadmap-generate', objective],
    queryFn: () => generateRoadmap(objective),
    enabled: objective.trim().length >= 3,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
