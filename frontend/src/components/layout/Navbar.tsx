import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/roadmaps', label: 'Roadmaps' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">Roadmap Builder</div>
      <nav aria-label="Primary">
        <ul className="navbar__links">
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
