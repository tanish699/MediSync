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

const frequencies = ['Once', 'Once daily', 'Twice daily', 'Three times daily', 'Every other day', 'Weekly', 'As needed'];

export default function AddReminder() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [form, setForm] = useState({
    title: '',
    familyMemberId: '',
    inventoryItemId: '',
    date: '',
    time: '',
    frequency: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/'); return; }
    Promise.all([
      api.get(`/family/user/${user.id}`),
      api.get(`/inventory/user/${user.id}`),
    ]).then(([famRes, invRes]) => {
      setFamilyMembers(famRes.data);
      setInventoryItems(invRes.data);
    }).catch(err => console.error('Error fetching data:', err));
  }, [user, navigate]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const reminderTime = `${form.date} ${form.time}:00`;

      await api.post('/reminders', {
        user_id: user.id,
        family_member_id: form.familyMemberId || null,
        inventory_item_id: form.inventoryItemId || null,
        title: form.title,
        description: form.notes || null,
        reminder_time: reminderTime,
        frequency: form.frequency || 'Once',
      });

      setSubmitted(true);
      setTimeout(() => navigate('/reminders'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create reminder');
      setSaving(false);
    }
  };

  return (
    <div className="page-layout">
      <Navbar links={navLinks} />

      <div className="content-area narrow">
        <button onClick={() => navigate('/reminders')} className="back-link">
          Back to Reminders
        </button>

        <div className="page-header">
          <h1>New Reminder</h1>
          <p>Set up a personalized dose schedule for a family member.</p>
        </div>

        {submitted ? (
          <div className="success-state">
            <div className="state-mark">OK</div>
            <h2 style={{ color: 'var(--primary-700)', marginBottom: 8 }}>Reminder Created</h2>
            <p>Redirecting you back to the schedule...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card surface-panel">
            {error && <div className="error-banner">{error}</div>}

            <div className="form-group">
              <label className="muted-label">Reminder Title</label>
              <div className="input-icon-wrap">
                <span className="input-icon">💊</span>
                <input required className="form-input" placeholder="e.g. Take Lisinopril 10mg" value={form.title} onChange={e => set('title', e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="muted-label">For</label>
              <div className="input-icon-wrap">
                <span className="input-icon">👤</span>
                <select className="form-input" value={form.familyMemberId} onChange={e => set('familyMemberId', e.target.value)}>
                  <option value="">Myself</option>
                  {familyMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="muted-label">Linked Medicine (optional)</label>
              <div className="input-icon-wrap">
                <span className="input-icon">🔗</span>
                <select className="form-input" value={form.inventoryItemId} onChange={e => set('inventoryItemId', e.target.value)}>
                  <option value="">None</option>
                  {inventoryItems.map(i => <option key={i.id} value={i.id}>{i.item_name} ({i.quantity} remaining)</option>)}
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="muted-label">Date</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">📅</span>
                  <input required type="date" className="form-input" value={form.date} onChange={e => set('date', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="muted-label">Time</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">⏰</span>
                  <input required type="time" className="form-input" value={form.time} onChange={e => set('time', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="muted-label">Frequency</label>
              <div className="chip-group">
                {frequencies.map(f => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => set('frequency', f)}
                    className={`chip ${form.frequency === f ? 'active' : ''}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="muted-label">Notes (optional)</label>
              <textarea className="form-input" placeholder="Any special instructions..." value={form.notes} onChange={e => set('notes', e.target.value)} rows={3} />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate('/reminders')} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={saving}>
                {saving ? 'Saving...' : 'Create Reminder'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
