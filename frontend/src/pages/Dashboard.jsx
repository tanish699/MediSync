import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import Navbar from '../components/Navbar';

const navLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/family', label: 'Family' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/'); return; }

    const fetchData = async () => {
      try {
        const [remRes, invRes] = await Promise.all([
          api.get(`/reminders/user/${user.id}`),
          api.get(`/inventory/user/${user.id}`),
        ]);
        setReminders(remRes.data);
        setInventory(invRes.data);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, navigate]);

  const lowStockItems = inventory.filter(i => i.quantity < 10);
  const pendingReminders = reminders.filter(r => !r.is_completed);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleComplete = async (id) => {
    try {
      await api.put(`/reminders/${id}/complete`);
      setReminders(prev => prev.map(r => r.id === id ? { ...r, is_completed: true } : r));
    } catch (err) {
      console.error('Error completing reminder:', err);
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="page-layout">
      <Navbar links={navLinks} />

      <div className="content-area">
        <section className="dash-hero">
          <div className="dash-hero-top">
            <div>
              <h1>{getGreeting()}, {user?.username || 'there'}. 👋</h1>
              <p>
                {pendingReminders.length > 0
                  ? `You have ${pendingReminders.length} reminder${pendingReminders.length > 1 ? 's' : ''} remaining.`
                  : 'All caught up. No pending reminders.'}
                {lowStockItems.length > 0 && ` ${lowStockItems.length} medicine${lowStockItems.length > 1 ? 's are' : ' is'} running low.`}
              </p>
            </div>
            <button onClick={handleSignOut} className="hero-signout">Sign Out</button>
          </div>
        </section>

        {loading ? (
          <div className="loading-state">Loading your dashboard...</div>
        ) : (
          <div className="dash-content">
            <div>
              <div className="reminders-header">
                <h2>Your Reminders</h2>
                <Link to="/reminders" className="full-schedule-link">Full Schedule</Link>
              </div>

              {reminders.length === 0 ? (
                <div className="empty-state">
                  <div className="state-mark">📝</div>
                  <p>No reminders yet. <Link to="/reminders/add" className="text-link">Create one</Link></p>
                </div>
              ) : (
                reminders.slice(0, 5).map((r) => (
                  <div key={r.id} className={`reminder-item ${r.is_completed ? 'logged' : ''}`}>
                    <div className={`med-icon ${r.is_completed ? 'med-icon-teal' : 'med-icon-red'}`}>
                      {r.is_completed ? '✅' : '💊'}
                    </div>
                    <div className="reminder-info">
                      <div className="reminder-meta">
                        {new Date(r.reminder_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {r.family_member_name && ` - ${r.family_member_name}`}
                      </div>
                      <div className="reminder-name">{r.title}</div>
                      <div className="reminder-dose">{r.description || r.frequency}</div>
                    </div>
                    {r.is_completed
                      ? <span className="badge badge-green">Logged</span>
                      : <button className="btn btn-primary" onClick={() => handleComplete(r.id)}>Take</button>
                    }
                  </div>
                ))
              )}
            </div>

            <aside className="dash-right-col">
              <div className="alert-card">
                <h3><span className="alert-heading-mark">⚠️</span> Alerts</h3>
                {lowStockItems.length > 0 ? (
                  lowStockItems.map(item => (
                    <div key={item.id} className="alert-item warning">
                      <div className="alert-name">Low Inventory</div>
                      <div className="alert-desc">{item.item_name}{item.family_member_name ? ` for ${item.family_member_name}` : ''} is running low.</div>
                      <div className="badge badge-red">{item.quantity} left</div>
                      <div><Link to="/inventory" className="alert-link teal">View Inventory</Link></div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="state-mark">✅</div>
                    <p>No alerts. Everything looks good.</p>
                  </div>
                )}
              </div>
            </aside>

            <div className="dash-action-cards">
              <Link to="/family" className="action-card">
                <div className="action-card-icon care">👥</div>
                <h3>Manage Family</h3>
                <p>Add family members and coordinate care together.</p>
                <span className="action-card-link">Go to Family</span>
              </Link>
              <Link to="/inventory/add" className="action-card">
                <div className="action-card-icon meds">💊</div>
                <h3>Add Medicine</h3>
                <p>Record prescriptions or over-the-counter medication.</p>
                <span className="action-card-link">Add Medicine</span>
              </Link>
              <Link to="/reminders/add" className="action-card">
                <div className="action-card-icon time">⏰</div>
                <h3>Add Reminder</h3>
                <p>Set up personalized dose notifications.</p>
                <span className="action-card-link">Set Reminder</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
