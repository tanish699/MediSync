import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const navLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/family', label: 'Family' },
];

const members = [
  { name: 'Sarah (You)', role: 'Admin • Full Access', emoji: '👩' },
  { name: 'David Miller', role: 'Caregiver • Full Access', emoji: '👨' },
  { name: 'Emma Miller', role: 'Family Member • Limited', emoji: '👧' },
  { name: 'Arthur Miller', role: 'Patient • Health View', emoji: '👴' },
];

const profileMenuItems = [
  { icon: '👤', label: 'Personal Info' },
  { icon: '🔔', label: 'Notification Preferences' },
  { icon: '🔒', label: 'Security & Privacy' },
];

/* ── helpers ── */
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

/* ── Join Family Modal ── */
function JoinFamilyModal({ onClose }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [joined, setJoined] = useState(false);

  const handleChange = (val) => {
    setCode(val.toUpperCase().slice(0, 6));
    setError('');
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (code.length < 6) { setError('Please enter the full 6-character code.'); return; }
    setJoined(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {joined ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h2 style={{ color: 'var(--primary)', marginBottom: 8 }}>You're In!</h2>
            <p style={{ color: 'var(--text-muted)' }}>You've successfully joined the family circle.</p>
            <button className="btn btn-primary" style={{ marginTop: 24, width: '100%' }} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>👨‍👩‍👧</div>
              <h2 style={{ marginBottom: 4 }}>Join a Family Circle</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Ask an admin for the 6-character invite code.</p>
            </div>

            <form onSubmit={handleJoin}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Family Code
                </label>
                <input
                  autoFocus
                  className="form-input code-input"
                  placeholder="A1B2C3"
                  maxLength={6}
                  value={code}
                  onChange={e => handleChange(e.target.value)}
                  style={{ textAlign: 'center', letterSpacing: '0.35em', fontSize: 26, fontWeight: 800, textTransform: 'uppercase' }}
                />
                {error && <p style={{ color: '#e05c5c', fontSize: 13, marginTop: 6 }}>{error}</p>}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>
                Codes are case-insensitive and valid for 7 days.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: 'var(--surface-2)', fontWeight: 700, cursor: 'pointer', color: 'var(--text-secondary)' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '12px' }}>Join →</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Create Family Modal ── */
function CreateFamilyModal({ onClose }) {
  const [familyCode] = useState(generateCode);
  const [copied, setCopied] = useState(false);
  const [familyName, setFamilyName] = useState('');
  const [done, setDone] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(familyCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
            <h2 style={{ color: 'var(--primary)', marginBottom: 8 }}>Family Created!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Share the code below with your family members.</p>
            <div className="code-display">{familyCode}</div>
            <button className="btn btn-primary" style={{ marginTop: 20, width: '100%' }} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🏡</div>
              <h2 style={{ marginBottom: 4 }}>Create a Family Circle</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>A unique invite code will be generated for your family.</p>
            </div>

            <form onSubmit={handleCreate}>
              <div className="form-group" style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Family Name
                </label>
                <div className="input-icon-wrap">
                  <span className="input-icon">🏠</span>
                  <input
                    autoFocus
                    required
                    className="form-input"
                    placeholder="e.g. The Miller Family"
                    value={familyName}
                    onChange={e => setFamilyName(e.target.value)}
                  />
                </div>
              </div>

              {/* Generated code preview */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Your Invite Code
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="code-display" style={{ flex: 1, margin: 0 }}>{familyCode}</div>
                  <button
                    type="button"
                    onClick={copyCode}
                    style={{ padding: '10px 16px', borderRadius: 10, border: 'none', background: copied ? 'var(--primary)' : 'var(--surface-2)', color: copied ? '#fff' : 'var(--text-secondary)', fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }}
                  >
                    {copied ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                  Share this code with family members so they can join.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: 'var(--surface-2)', fontWeight: 700, cursor: 'pointer', color: 'var(--text-secondary)' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '12px' }}>Create Family →</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function Family() {
  const [showJoin, setShowJoin] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  // Lock body scroll when a modal is open
  useEffect(() => {
    document.body.style.overflow = (showJoin || showCreate) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showJoin, showCreate]);

  return (
    <div className="page-layout">
      <Navbar links={navLinks} />
      <div className="content-area">
        <div className="family-layout">

          {/* Left — Profile card */}
          <div>
            <div className="profile-card">
              <div className="profile-avatar-wrap">
                <div className="profile-avatar">👩</div>
                <button className="profile-edit-btn">✏️</button>
              </div>
              <div className="profile-name">Sarah Miller</div>
              <div className="profile-role">Primary Care Coordinator</div>

              <ul className="profile-menu">
                {profileMenuItems.map((item) => (
                  <li key={item.label}>
                    <a href="#">
                      <span>
                        <span className="profile-menu-icon">{item.icon}</span>
                        {item.label}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>›</span>
                    </a>
                  </li>
                ))}
              </ul>

              <button className="btn btn-primary invite-btn" onClick={() => setShowJoin(true)}>
                👥 Invite a Member
              </button>
              <button className="create-family-btn" onClick={() => setShowCreate(true)}>
                👥 Create a New Family
              </button>
            </div>
          </div>

          {/* Right — Family panel */}
          <div className="family-right">
            <div className="family-right-header">
              <div>
                <h2>The Miller Family</h2>
                <p>4 Active Members • Household Hub</p>
              </div>
              <a href="#" className="settings-link">⚙️ Family Settings</a>
            </div>

            {/* Member grid */}
            <div className="member-grid">
              {members.map((m) => (
                <div key={m.name} className="member-card">
                  <div className="member-av">{m.emoji}</div>
                  <div>
                    <div className="member-name">{m.name}</div>
                    <div className="member-role">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Modals */}
      {showJoin   && <JoinFamilyModal   onClose={() => setShowJoin(false)}   />}
      {showCreate && <CreateFamilyModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}
