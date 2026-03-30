import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const navLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/family', label: 'Family' },
];

const members = ['Everyone (Household)', 'Sarah (Mom)', 'James (Dad)', 'Emma', 'Arthur', 'Lily (Child)'];
const forms = ['Tablet', 'Capsule', 'Liquid', 'Softgel', 'Gummy', 'Inhaler', 'Drops', 'Cream/Gel', 'Injection', 'Patch'];
const routes = ['Oral', 'Topical', 'Inhaled', 'Injectable', 'Sublingual', 'Nasal'];

export default function AddMedicine() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    medForm: '',
    route: '',
    resident: '',
    currentQty: '',
    totalQty: '',
    expiryDate: '',
    notes: '',
    lowStockAlert: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/inventory'), 1500);
  };

  return (
    <div className="page-layout">
      <Navbar links={navLinks} />

      <div className="content-area" style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Back */}
        <button
          onClick={() => navigate('/inventory')}
          style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          ← Back to Inventory
        </button>

        <div className="page-header" style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28 }}>Add Medicine</h1>
          <p>Record a new prescription or over-the-counter item to the cabinet.</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
            <h2 style={{ color: 'var(--primary)', marginBottom: 8 }}>Medicine Added!</h2>
            <p style={{ color: 'var(--text-muted)' }}>Redirecting you back to the cabinet…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Medicine Name */}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Medicine Name
              </label>
              <div className="input-icon-wrap">
                <span className="input-icon">💊</span>
                <input
                  required
                  className="form-input"
                  placeholder="e.g. Amoxicillin"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                />
              </div>
            </div>

            {/* Dosage + Form row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Dosage Strength
                </label>
                <div className="input-icon-wrap">
                  <span className="input-icon">⚗️</span>
                  <input
                    required
                    className="form-input"
                    placeholder="e.g. 500mg"
                    value={form.dosage}
                    onChange={e => set('dosage', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Form
                </label>
                <div className="input-icon-wrap">
                  <span className="input-icon">🏷️</span>
                  <select
                    required
                    className="form-input"
                    value={form.medForm}
                    onChange={e => set('medForm', e.target.value)}
                    style={{ appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="">Select…</option>
                    {forms.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Route */}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Route of Administration
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {routes.map(r => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => set('route', r)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 20,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      background: form.route === r ? 'var(--primary)' : 'var(--surface-2)',
                      color: form.route === r ? '#fff' : 'var(--text-secondary)',
                      transition: 'all 0.15s',
                    }}
                  >{r}</button>
                ))}
              </div>
            </div>

            {/* Assigned to */}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Assigned To
              </label>
              <div className="input-icon-wrap">
                <span className="input-icon">👤</span>
                <select
                  required
                  className="form-input"
                  value={form.resident}
                  onChange={e => set('resident', e.target.value)}
                  style={{ appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="">Select family member…</option>
                  {members.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* Quantity row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Current Qty
                </label>
                <div className="input-icon-wrap">
                  <span className="input-icon">🔢</span>
                  <input
                    required
                    type="number"
                    min="0"
                    className="form-input"
                    placeholder="42"
                    value={form.currentQty}
                    onChange={e => set('currentQty', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Pack Size
                </label>
                <div className="input-icon-wrap">
                  <span className="input-icon">📦</span>
                  <input
                    required
                    type="number"
                    min="1"
                    className="form-input"
                    placeholder="60"
                    value={form.totalQty}
                    onChange={e => set('totalQty', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Expiry Date
                </label>
                <div className="input-icon-wrap">
                  <span className="input-icon">📅</span>
                  <input
                    type="date"
                    className="form-input"
                    value={form.expiryDate}
                    onChange={e => set('expiryDate', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Low stock alert toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '14px 18px', background: 'var(--surface-2)', borderRadius: 12 }}>
              <input
                type="checkbox"
                id="lowStock"
                checked={form.lowStockAlert}
                onChange={e => set('lowStockAlert', e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <label htmlFor="lowStock" style={{ fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                🔔 Notify me when stock runs low
              </label>
            </div>

            {/* Notes */}
            <div className="form-group" style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Notes (optional)
              </label>
              <textarea
                className="form-input"
                placeholder="Prescription details, storage instructions…"
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                rows={3}
                style={{ resize: 'vertical', paddingTop: 12, fontFamily: 'inherit' }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" onClick={() => navigate('/inventory')} style={{ flex: 1, padding: '14px', borderRadius: 12, border: 'none', background: 'var(--surface-2)', fontWeight: 700, fontSize: 15, cursor: 'pointer', color: 'var(--text-secondary)' }}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '14px', fontSize: 15 }}>
                ✓ Add to Cabinet
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
