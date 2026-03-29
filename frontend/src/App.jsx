import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/example')
      .then((res) => {
        setApiMessage(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        setError('Could not reach backend. Is the server running?');
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <div className="badge">React + Express + MySQL</div>
          <h1>Fullstack Starter</h1>
          <p className="subtitle">
            A modern fullstack boilerplate ready for development
          </p>
        </div>
      </header>

      <main className="main">
        <div className="card">
          <div className="card-icon">🚀</div>
          <h2>Backend Status</h2>
          {loading && <p className="status loading">Connecting to Express server…</p>}
          {error && <p className="status error">⚠️ {error}</p>}
          {apiMessage && <p className="status success">✅ {apiMessage}</p>}
        </div>

        <div className="grid">
          <div className="feature-card">
            <span className="feature-icon">⚛️</span>
            <h3>React</h3>
            <p>Vite-powered frontend with hot module replacement</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🛠️</span>
            <h3>Express</h3>
            <p>REST API backend with CORS, dotenv & nodemon</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🗄️</span>
            <h3>MySQL</h3>
            <p>mysql2 connection pool — configure via .env</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
