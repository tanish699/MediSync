import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        const { data } = await api.post('/users/register', { username, email, password });
        login(data.user);
      } else {
        const { data } = await api.post('/users/login', { email, password });
        login(data.user);
      }
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong. Is the server running?';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left-bg" />
        <div className="login-card-overlay">
          <div className="logo-row" style={{ justifyContent: 'center', marginBottom: 20 }}>
            <img src="/favicon.svg" alt="MediSync" style={{ height: 120, objectFit: 'contain' }} />
          </div>
          <p className="tagline">Your family's health, kept in one safe place.</p>
          <p className="sub">Manage medicines, reminders, and family care records from one calm workspace.</p>
          <div className="trust-row">
            <span className="trust-pill">Family profiles</span>
            <span className="trust-pill">Dose tracking</span>
            <span className="trust-pill">Inventory alerts</span>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-wrap">
          <h1>{isRegister ? 'Create Account' : 'Welcome Home'}</h1>
          <p className="sub">{isRegister ? 'Set up your family health hub.' : 'Sign in to coordinate care with your loved ones.'}</p>

          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">👤</span>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Your full name"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

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
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-row-label">
                <label>Password</label>
                {!isRegister && <a href="#">Forgot?</a>}
              </div>
              <div className="input-icon-wrap">
                <span className="input-icon">🔒</span>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            {!isRegister && (
              <div className="checkbox-row">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Keep me signed in on this device</label>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? '⏳ Please wait...' : (isRegister ? 'Create Account →' : 'Sign In →')}
            </button>
          </form>

          <p className="login-footer">
            {isRegister ? (
              <>Already have an account?{' '}<button onClick={() => { setIsRegister(false); setError(''); }} className="link-button">Sign In</button></>
            ) : (
              <>Do not have an account yet?{' '}<button onClick={() => { setIsRegister(true); setError(''); }} className="link-button">Create Account</button></>
            )}
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
