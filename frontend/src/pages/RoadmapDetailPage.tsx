import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRoadmap } from '@/features/roadmaps/api';

export default function RoadmapDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['roadmap', id],
    queryFn: () => getRoadmap(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading…</p>;
  if (error || !data) return <p role="alert">Roadmap not found.</p>;

  return (
    <article>
      <h1>{data.title}</h1>
      {data.description && <p>{data.description}</p>}
    </article>
  );
}
