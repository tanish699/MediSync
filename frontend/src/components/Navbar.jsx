import { NavLink } from 'react-router-dom';

export default function Navbar({ links }) {
  return (
    <nav className="topnav">
      <NavLink to="/" className="topnav-logo">MediSync</NavLink>
      <ul className="topnav-links">
        {links.map(l => (
          <li key={l.to}>
            <NavLink to={l.to} className={({ isActive }) => isActive ? 'active' : ''}>
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
      
    </nav>
  );
}
