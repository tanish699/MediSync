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

export default function Inventory() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [meds, setMeds] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/'); return; }

    const fetchInventory = async () => {
      try {
        const { data } = await api.get(`/inventory/user/${user.id}`);
        setMeds(data);
      } catch (err) {
        console.error('Error fetching inventory:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`/inventory/${id}`);
      setMeds(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const filtered = meds.filter(m =>
    m.item_name.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockCount = meds.filter(m => m.quantity < 10).length;

  return (
    <div className="page-layout">
      <Navbar links={navLinks} />
      <div className="content-area">
        <div className="page-toolbar">
          <div className="page-header">
            <h1>Medicine Cabinet</h1>
            <p>Your complete household medicine inventory.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/inventory/add')}>+ Add Medicine</button>
        </div>

        <div className="workspace-grid">
          <aside>
            <div className="card surface-panel">
              <span className="muted-label">Search Records</span>
              <div className="input-icon-wrap" style={{ marginBottom: 'var(--space-5)' }}>
                <span className="input-icon">🔍</span>
                <input
                  className="form-input"
                  placeholder="Search medicines..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="alert-item warning">
                <div className="alert-name">Low Stock Alerts</div>
                <div className="badge badge-red">{lowStockCount}</div>
              </div>
            </div>
          </aside>

          <main>
            {loading ? (
              <div className="loading-state">Loading inventory...</div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <div className="state-mark">💊</div>
                <p style={{ marginBottom: 8, fontWeight: 600 }}>No medicines in your cabinet yet.</p>
                <p>Click <strong>"+ Add Medicine"</strong> to get started.</p>
              </div>
            ) : (
              <div className="med-grid">
                {filtered.map((med) => {
                  const isLow = med.quantity < 10;
                  return (
                    <div key={med.id} className="card med-card">
                      <div className="med-header">
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <div className={`med-icon ${isLow ? 'med-icon-red' : 'med-icon-teal'}`}>
                            {isLow ? '⚠️' : '💊'}
                          </div>
                          <div>
                            <div className="med-title">{med.item_name}</div>
                            <div className="med-desc">{med.family_member_name ? `For ${med.family_member_name}` : 'Household'}</div>
                          </div>
                        </div>
                        <button className="icon-btn icon-btn-danger" onClick={() => handleDelete(med.id)} title="Delete">🗑️</button>
                      </div>

                      <div className="med-stats">
                        <div className="stat-row">
                          <span className="stat-label">Quantity</span>
                          <span className={`stat-val ${isLow ? 'badge badge-red' : ''}`}>{med.quantity} {med.unit || 'Units'}</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Dosage</span>
                          <span className="stat-val">{med.dosage || '-'}</span>
                        </div>
                        {med.expiry_date && (
                          <div className="stat-row">
                            <span className="stat-label">Expiry Date</span>
                            <span className="stat-val">{new Date(med.expiry_date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
