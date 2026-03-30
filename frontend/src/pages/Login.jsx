import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-left">
        <div className="login-left-bg" />
        <div className="login-left-illustration">🏠</div>
        <div className="login-card-overlay">
          <div className="logo-row">
            <div className="logo-icon">🏠</div>
            <h2>The Hearth</h2>
          </div>
          <p className="tagline">Your family's health, kept in one safe place.</p>
          <p className="sub">Join over 10,000 families who trust The Hearth to manage medications, appointments, and wellness together.</p>
          <div className="avatar-stack">
            <div className="av">👨</div>
            <div className="av">👩</div>
            <div className="av">👧</div>
            <div className="av av-count">+10k</div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-form-wrap">
          <h1>Welcome Home</h1>
          <p className="sub">Sign in to coordinate care with your loved ones.</p>

          <div className="social-row">
            <button className="social-btn">
              <span>🔵</span> Google
            </button>
            <button className="social-btn">
              <span>🍎</span> Apple ID
            </button>
          </div>

          <div className="divider">OR CONTINUE WITH EMAIL</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-icon-wrap">
                <span className="input-icon">✉️</span>
                <input
                  className="form-input"
                  type="email"
                  placeholder="name@family.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-row-label">
                <label>Password</label>
                <a href="#">Forgot?</a>
              </div>
              <div className="input-icon-wrap">
                <span className="input-icon">🔒</span>
                <input
                  className="form-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="checkbox-row">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me signed in on this device</label>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Sign In
            </button>
          </form>

          <p className="login-footer">
            Don't have an account yet?{' '}
            <Link to="/dashboard">Start a Family Circle</Link>
          </p>

          <div className="login-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
}
