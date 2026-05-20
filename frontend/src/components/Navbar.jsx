import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ links }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="topnav">
      <div className="topnav-row">
        <NavLink to="/dashboard" className="topnav-logo">
          <img src="/favicon.svg" alt="MediSync" style={{ height: 42, objectFit: 'contain' }} />
        </NavLink>

        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      <ul className={`topnav-links${mobileOpen ? ' mobile-open' : ''}`}>
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
