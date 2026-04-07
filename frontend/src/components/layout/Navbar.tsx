import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/roadmaps', label: 'Roadmaps' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-lg font-bold text-gray-900">
          Roadmap Builder
        </NavLink>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6">
            {links.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `text-sm font-medium transition ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
