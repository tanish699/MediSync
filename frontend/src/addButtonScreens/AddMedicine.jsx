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

const forms = ['Tablet', 'Capsule', 'Liquid', 'Softgel', 'Gummy', 'Inhaler', 'Drops', 'Cream/Gel', 'Injection', 'Patch'];
const routes = ['Oral', 'Topical', 'Inhaled', 'Injectable', 'Sublingual', 'Nasal'];

export default function AddMedicine() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    medForm: '',
    route: '',
    familyMemberId: '',
    currentQty: '',
    expiryDate: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/'); return; }
    api.get(`/family/user/${user.id}`)
      .then(res => setFamilyMembers(res.data))
      .catch(err => console.error('Error fetching family:', err));
  }, [user, navigate]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const itemName = `${form.name}${form.dosage ? ' ' + form.dosage : ''}${form.medForm ? ' ' + form.medForm : ''}`;
      const unit = form.route || form.medForm || null;

      await api.post('/inventory', {
        user_id: user.id,
        family_member_id: form.familyMemberId || null,
        item_name: itemName,
        quantity: parseInt(form.currentQty) || 0,
        unit: unit,
        expiry_date: form.expiryDate || null,
        description: form.notes || null,
      });

      setSubmitted(true);
      setTimeout(() => navigate('/inventory'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add medicine');
      setSaving(false);
    }
  };

  return (
    <div className="page-layout">
      <Navbar links={navLinks} />

      <div className="content-area narrow">
        <button onClick={() => navigate('/inventory')} className="back-link">
          Back to Inventory
        </button>

        <div className="page-header">
          <h1>Add Medicine</h1>
          <p>Record a new prescription or over-the-counter item to the cabinet.</p>
        </div>

        {submitted ? (
          <div className="success-state">
            <div className="state-mark">✅</div>
            <h2 style={{ color: 'var(--primary-700)', marginBottom: 8 }}>Medicine Added</h2>
            <p>Redirecting you back to the cabinet...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card surface-panel">
            {error && <div className="error-banner">{error}</div>}

            <div className="form-group">
              <label className="muted-label">Medicine Name</label>
              <div className="input-icon-wrap">
                <span className="input-icon">💊</span>
                <input required className="form-input" placeholder="e.g. Amoxicillin" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="muted-label">Dosage Strength</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">⚖️</span>
                  <input className="form-input" placeholder="e.g. 500mg" value={form.dosage} onChange={e => set('dosage', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="muted-label">Form</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">📦</span>
                  <select className="form-input" value={form.medForm} onChange={e => set('medForm', e.target.value)}>
                    <option value="">Select...</option>
                    {forms.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="muted-label">Route of Administration</label>
              <div className="chip-group">
                {routes.map(r => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => set('route', r)}
                    className={`chip ${form.route === r ? 'active' : ''}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="muted-label">Assigned To</label>
              <div className="input-icon-wrap">
                <span className="input-icon">👤</span>
                <select className="form-input" value={form.familyMemberId} onChange={e => set('familyMemberId', e.target.value)}>
                  <option value="">Household (General)</option>
                  {familyMembers.map(m => <option key={m.id} value={m.id}>{m.name} ({m.relationship || 'Family'})</option>)}
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="muted-label">Quantity</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">🔢</span>
                  <input required type="number" min="0" className="form-input" placeholder="42" value={form.currentQty} onChange={e => set('currentQty', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="muted-label">Expiry Date</label>
                <div className="input-icon-wrap">
                  <span className="input-icon">📅</span>
                  <input type="date" className="form-input" value={form.expiryDate} onChange={e => set('expiryDate', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="muted-label">Notes (optional)</label>
              <textarea className="form-input" placeholder="Prescription details, storage instructions..." value={form.notes} onChange={e => set('notes', e.target.value)} rows={3} />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate('/inventory')} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={saving}>
                {saving ? 'Saving...' : 'Add to Cabinet'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
