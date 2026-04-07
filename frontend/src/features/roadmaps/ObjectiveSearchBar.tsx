import { useState, type FormEvent } from 'react';

const MIN_LEN = 3;
const MAX_LEN = 200;

type Props = {
  onSubmit: (objective: string) => void;
  initialValue?: string;
};

export function ObjectiveSearchBar({ onSubmit, initialValue = '' }: Props) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length < MIN_LEN) {
      setError(`Please enter at least ${MIN_LEN} characters.`);
      return;
    }
    setError(null);
    onSubmit(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-2 py-2 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. Become a frontend developer"
          maxLength={MAX_LEN}
          aria-label="Learning objective"
          className="flex-1 bg-transparent px-4 py-2 text-base outline-none focus:outline-none focus-visible:outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Generate
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}
