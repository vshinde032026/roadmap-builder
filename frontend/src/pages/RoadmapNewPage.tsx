import { Link, useSearchParams } from 'react-router-dom';
import { RoadmapGraph } from '@/features/roadmaps/RoadmapGraph';
import { FIXTURE_ROADMAP } from '@/features/roadmaps/fixtures';

export default function RoadmapNewPage() {
  const [params] = useSearchParams();
  const objective = params.get('objective')?.trim() ?? '';

  if (!objective) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-gray-600">No objective provided.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Back to start
        </Link>
      </section>
    );
  }

  // TODO: replace with useGenerateRoadmap(objective) once UI work settles.
  const data = FIXTURE_ROADMAP;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <Link to="/" className="text-sm text-blue-600 hover:underline">
        ← Start over
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">Roadmap for:</h1>
      <p className="mt-2 text-xl text-gray-700">{objective}</p>

      <div className="mt-8">
        <RoadmapGraph nodes={data.nodes} />
      </div>
    </section>
  );
}
