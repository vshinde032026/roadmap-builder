import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { listRoadmaps } from '@/features/roadmaps/api';

export default function RoadmapsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['roadmaps'],
    queryFn: listRoadmaps,
  });

  if (isLoading) return <p>Loading roadmaps…</p>;
  if (error) return <p role="alert">Failed to load roadmaps.</p>;

  return (
    <section>
      <h1>Roadmaps</h1>
      <ul>
        {data?.map((r) => (
          <li key={r.id}>
            <Link to={`/roadmaps/${r.id}`}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
