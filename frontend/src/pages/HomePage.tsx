import { useNavigate } from 'react-router-dom';
import { ObjectiveSearchBar } from '@/features/roadmaps/ObjectiveSearchBar';

const EXAMPLES = [
  'Become a frontend developer',
  'Learn data engineering',
  'Get started with 3D printing',
  'Master technical product management',
];

export default function HomePage() {
  const navigate = useNavigate();

  function handleSubmit(objective: string) {
    navigate(`/roadmap/new?objective=${encodeURIComponent(objective)}`);
  }

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        What do you want to learn?
      </h1>
      <p className="mb-10 max-w-xl text-lg text-gray-600">
        Type any objective and we'll build you a personalized roadmap with the best free resources from across the web.
      </p>

      <ObjectiveSearchBar onSubmit={handleSubmit} />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-gray-500">Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => handleSubmit(ex)}
            className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 transition hover:border-blue-400 hover:text-blue-600"
          >
            {ex}
          </button>
        ))}
      </div>
    </section>
  );
}
