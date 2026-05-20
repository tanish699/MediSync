import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import Navbar from '../components/Navbar';

const navLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/family', label: 'Family' },
];

const profileMenuItems = [
  { icon: '⚙️', label: 'Account Settings' },
  { icon: '🔒', label: 'Privacy & Sharing' },
  { icon: '📊', label: 'Health Reports' },
];

function AddMemberModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSave({ name, relationship, date_of_birth: dateOfBirth, blood_group: bloodGroup, medical_history: medicalHistory });
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add member');
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">x</button>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div className="state-mark">👨‍👩‍👧‍👦</div>
          <h2 style={{ marginBottom: 4 }}>Add Family Member</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Add someone to your care circle.</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="muted-label">Name *</label>
            <input autoFocus required className="form-input" placeholder="e.g. David Miller" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="muted-label">Relationship</label>
            <input className="form-input" placeholder="e.g. Father, Mother, Child" value={relationship} onChange={e => setRelationship(e.target.value)} />
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="muted-label">Date of Birth</label>
              <input type="date" className="form-input" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="muted-label">Blood Group</label>
              <input className="form-input" placeholder="e.g. O+" value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="muted-label">Medical History</label>
            <textarea className="form-input" placeholder="Allergies, conditions, notes..." value={medicalHistory} onChange={e => setMedicalHistory(e.target.value)} rows={3} />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={saving}>
              {saving ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Family() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/'); return; }

    const fetchMembers = async () => {
      try {
        const { data } = await api.get(`/family/user/${user.id}`);
        setMembers(data);
      } catch (err) {
        console.error('Error fetching family:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [user, navigate]);

  useEffect(() => {
    document.body.style.overflow = showAdd ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showAdd]);

  const handleAddMember = async (memberData) => {
    await api.post('/family', { user_id: user.id, ...memberData });
    const { data: updated } = await api.get(`/family/user/${user.id}`);
    setMembers(updated);
  };

  const initialsForRelationship = (rel) => {
    if (!rel) return '👤';
    const r = rel.toLowerCase();
    if (r.includes('father') || r.includes('dad') || r.includes('husband')) return '👨';
    if (r.includes('mother') || r.includes('mom') || r.includes('wife')) return '👩';
    if (r.includes('child') || r.includes('son') || r.includes('daughter')) return '🧒';
    if (r.includes('grand')) return '👴';
    return '👤';
  };

  return (
    <div className="page-layout">
      <Navbar links={navLinks} />
      <div className="content-area">
        <div className="workspace-grid">
          <aside>
            <div className="card family-card">
              <div className="avatar-lg">👤</div>
              <h3>{user?.username || 'User'}</h3>
              <p style={{ color: 'var(--primary-600)', fontWeight: 600 }}>Primary Care Coordinator</p>

              <ul className="profile-menu">
                {profileMenuItems.map((item) => (
                  <li key={item.label} style={{ marginBottom: 8 }}>
                    <a href="#">
                      <span className="med-icon med-icon-gray" style={{ width: 32, height: 32, marginRight: 12 }}>{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <button className="btn btn-primary btn-full" onClick={() => setShowAdd(true)}>
                👨‍👩‍👧 Add Family Member
              </button>
            </div>
          </aside>

          <main>
            <div className="page-header">
              <h1>{user?.username ? `${user.username}'s Family` : 'My Family'}</h1>
              <p>{members.length} Member{members.length !== 1 ? 's' : ''}</p>
            </div>

            {loading ? (
              <div className="loading-state">Loading family members...</div>
            ) : members.length === 0 ? (
              <div className="empty-state">
                <div className="state-mark">👨‍👩‍👧‍👦</div>
                <p style={{ marginBottom: 8, fontWeight: 600 }}>No family members yet.</p>
                <p>Click <strong>"Add Family Member"</strong> to get started.</p>
              </div>
            ) : (
              <div className="family-grid">
                {members.map((m) => (
                  <div key={m.id} className="card family-card">
                    <div className="avatar-lg">{initialsForRelationship(m.relationship)}</div>
                    <h3>{m.name}</h3>
                    <p>{m.relationship || 'Family Member'}</p>

                    <div className="med-stats" style={{ textAlign: 'left', marginTop: 16 }}>
                      {m.blood_group && <div className="stat-row"><span className="stat-label">Blood Group</span><span className="stat-val">{m.blood_group}</span></div>}
                      {m.date_of_birth && <div className="stat-row"><span className="stat-label">DOB</span><span className="stat-val">{new Date(m.date_of_birth).toLocaleDateString()}</span></div>}
                      {m.medical_history && <div style={{ fontSize: 13, color: 'var(--text-muted)' }}><strong>History:</strong> {m.medical_history}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {showAdd && <AddMemberModal onClose={() => setShowAdd(false)} onSave={handleAddMember} />}
    </div>
  );
}
