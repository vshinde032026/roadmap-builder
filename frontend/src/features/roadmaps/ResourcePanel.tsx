import { useEffect, useState } from 'react';
import { listClips, type Clip } from '@/lib/api/clips';
import type { RoadmapNode } from '@/lib/api/roadmaps';

type ResourceType = 'Video' | 'Article' | 'Course' | 'Official';

type Resource = {
  type: ResourceType;
  title: string;
  url: string;
};

const TYPE_STYLES: Record<ResourceType, string> = {
  Official: 'bg-blue-100 text-blue-700',
  Course: 'bg-green-100 text-green-700',
  Video: 'bg-red-100 text-red-700',
  Article: 'bg-yellow-100 text-yellow-700',
};

// Placeholder resources until we wire the backend search.
function fakeResources(node: RoadmapNode): Resource[] {
  const q = encodeURIComponent(node.title);
  return [
    { type: 'Official', title: `${node.title} — official docs`, url: `https://www.google.com/search?q=${q}+official+docs` },
    { type: 'Course', title: `Free course: ${node.title}`, url: `https://www.google.com/search?q=${q}+free+course` },
    { type: 'Video', title: `${node.title} crash course`, url: `https://www.youtube.com/results?search_query=${q}+crash+course` },
    { type: 'Article', title: `${node.title} — guide`, url: `https://www.google.com/search?q=${q}+guide` },
  ];
}

type Props = {
  node: RoadmapNode | null;
  onClose: () => void;
};

export function ResourcePanel({ node, onClose }: Props) {
  const [clips, setClips] = useState<Clip[]>([]);

  useEffect(() => {
    if (!node) return;
    let cancelled = false;
    listClips()
      .then((data) => {
        if (!cancelled) setClips(data);
      })
      .catch(() => {
        /* ignore — clips are optional */
      });
    return () => {
      cancelled = true;
    };
  }, [node]);

  if (!node) return null;
  const resources = fakeResources(node);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
        aria-hidden
      />
      {/* Panel */}
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-xl"
        role="dialog"
        aria-label={`Resources for ${node.title}`}
      >
        <header className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Resources</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">{node.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {node.description && (
            <p className="mb-6 text-sm leading-relaxed text-gray-600">{node.description}</p>
          )}

          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
              ♥ Free Resources
            </span>
          </div>

          <ul className="space-y-2">
            {resources.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2 transition hover:border-blue-400 hover:bg-blue-50"
                >
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-semibold ${TYPE_STYLES[r.type]}`}
                  >
                    {r.type}
                  </span>
                  <span className="flex-1 text-sm text-gray-800 underline-offset-2 hover:underline">
                    {r.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {clips.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700">
                  ✂ Saved snippets
                </span>
              </div>
              <ul className="space-y-3">
                {clips.map((c) => {
                  const host = (() => {
                    try {
                      return new URL(c.url).hostname;
                    } catch {
                      return c.url;
                    }
                  })();
                  return (
                    <li key={c.id}>
                      <a
                        href={c.fragment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-md border border-gray-200 p-3 transition hover:border-purple-400 hover:bg-purple-50"
                      >
                        <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${host}&sz=16`}
                            alt=""
                            width={14}
                            height={14}
                          />
                          <span className="truncate">{c.title || host}</span>
                        </div>
                        <p className="text-sm leading-snug text-gray-800 line-clamp-4">
                          “{c.selected_text}”
                        </p>
                        {c.screenshot && (
                          <img
                            src={c.screenshot}
                            alt=""
                            className="mt-2 w-full rounded border border-gray-200"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
