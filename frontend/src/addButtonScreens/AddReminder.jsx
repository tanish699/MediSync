import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const navLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/family', label: 'Family' },
];

const members = ['Sarah', 'David', 'Emma', 'Arthur', 'Grandma', 'Leo'];
const frequencies = ['Once daily', 'Twice daily', 'Three times daily', 'Every other day', 'Weekly', 'As needed'];

export default function AddReminder() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    medicineName: '',
    member: '',
    date: '',
    time: '',
    frequency: '',
    notes: '',
    withFood: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/reminders'), 1500);
  };

  return (
    <div className="page-layout">
      <Navbar links={navLinks} />

      <div className="content-area" style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Back */}
        <button
          onClick={() => navigate('/reminders')}
          style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          ← Back to Reminders
        </button>

        <div className="page-header" style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28 }}>New Reminder</h1>
          <p>Set up a personalised dose schedule for a family member.</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
            <h2 style={{ color: 'var(--primary)', marginBottom: 8 }}>Reminder Created!</h2>
            <p style={{ color: 'var(--text-muted)' }}>Redirecting you back to the schedule…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Medicine Name */}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Medicine / Item Name
              </label>
              <div className="input-icon-wrap">
                <span className="input-icon">💊</span>
                <input
                  required
                  className="form-input"
                  placeholder="e.g. Lisinopril 10mg"
                  value={form.medicineName}
                  onChange={e => set('medicineName', e.target.value)}
                />
              </div>
            </div>

            {/* Family Member */}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                For
              </label>
              <div className="input-icon-wrap">
                <span className="input-icon">👤</span>
                <select
                  required
                  className="form-input"
                  value={form.member}
                  onChange={e => set('member', e.target.value)}
                  style={{ appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="">Select family member…</option>
                  {members.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* Date + Time row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Start Date
                </label>
                <div className="input-icon-wrap">
                  <span className="input-icon">📅</span>
                  <input
                    required
                    type="date"
                    className="form-input"
                    value={form.date}
                    onChange={e => set('date', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Time
                </label>
                <div className="input-icon-wrap">
                  <span className="input-icon">⏰</span>
                  <input
                    required
                    type="time"
                    className="form-input"
                    value={form.time}
                    onChange={e => set('time', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Frequency */}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Frequency
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {frequencies.map(f => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => set('frequency', f)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 20,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      background: form.frequency === f ? 'var(--primary)' : 'var(--surface-2)',
                      color: form.frequency === f ? '#fff' : 'var(--text-secondary)',
                      transition: 'all 0.15s',
                    }}
                  >{f}</button>
                ))}
              </div>
            </div>

            {/* With food toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '14px 18px', background: 'var(--surface-2)', borderRadius: 12 }}>
              <input
                type="checkbox"
                id="withFood"
                checked={form.withFood}
                onChange={e => set('withFood', e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <label htmlFor="withFood" style={{ fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                🥗 Take with food
              </label>
            </div>

            {/* Notes */}
            <div className="form-group" style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Notes (optional)
              </label>
              <textarea
                className="form-input"
                placeholder="Any special instructions…"
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                rows={3}
                style={{ resize: 'vertical', paddingTop: 12, fontFamily: 'inherit' }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" onClick={() => navigate('/reminders')} style={{ flex: 1, padding: '14px', borderRadius: 12, border: 'none', background: 'var(--surface-2)', fontWeight: 700, fontSize: 15, cursor: 'pointer', color: 'var(--text-secondary)' }}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '14px', fontSize: 15 }}>
                ✓ Create Reminder
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
