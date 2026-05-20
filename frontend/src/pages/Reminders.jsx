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

export default function Reminders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Schedule');

  useEffect(() => {
    if (!user) { navigate('/'); return; }

    const fetchReminders = async () => {
      try {
        const { data } = await api.get(`/reminders/user/${user.id}`);
        setReminders(data);
      } catch (err) {
        console.error('Error fetching reminders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, [user, navigate]);

  const confirmDose = async (id) => {
    try {
      await api.put(`/reminders/${id}/complete`);
      setReminders(prev => prev.map(r => r.id === id ? { ...r, is_completed: true } : r));
    } catch (err) {
      console.error('Error completing reminder:', err);
    }
  };

  const pending = reminders.filter(r => !r.is_completed);
  const completed = reminders.filter(r => r.is_completed);
  const adherencePct = reminders.length > 0
    ? Math.round((completed.length / reminders.length) * 100)
    : 0;

  const reminderMeta = (item, includeDate = false) => {
    const time = new Date(item.reminder_time);
    const parts = [];
    if (item.family_member_name) parts.push(`For ${item.family_member_name}`);
    if (includeDate) parts.push(time.toLocaleDateString());
    parts.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    if (item.frequency && item.frequency !== 'Once') parts.push(item.frequency);
    return parts.join(' - ');
  };

  return (
    <div className="page-layout">
      <Navbar links={navLinks} />
      <div className="content-area">
        <div className="page-toolbar">
          <div className="page-header">
            <h1>Today's Care</h1>
            <p>Manage your family's health journey. {pending.length} dose{pending.length !== 1 ? 's' : ''} remaining.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/reminders/add')}>+ Add Reminder</button>
        </div>

        <div className="workspace-grid">
          <aside>
            <div className="card surface-panel">
              <span className="muted-label">Overall Adherence</span>
              <div className="gradient-text" style={{ fontSize: 48, fontWeight: 800, marginBottom: 'var(--space-4)', lineHeight: 1 }}>{adherencePct}%</div>
              <div className="progress-bar" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="progress-fill" style={{ width: `${adherencePct}%` }} />
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                {adherencePct >= 80
                  ? 'Great job. Your family is staying on track.'
                  : adherencePct >= 50
                  ? 'Good progress. Keep up the care.'
                  : reminders.length === 0
                  ? 'Add your first reminder to start tracking.'
                  : 'Some doses are pending. Stay consistent.'}
              </p>
            </div>

            <div className="chip-group" style={{ marginTop: 'var(--space-6)' }}>
              {['Schedule', 'History'].map(t => (
                <button
                  key={t}
                  type="button"
                  className={`chip ${activeTab === t ? 'active' : ''}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </aside>

          <main>
            {loading ? (
              <div className="loading-state">Loading reminders...</div>
            ) : reminders.length === 0 ? (
              <div className="empty-state">
                <div className="state-mark">📝</div>
                <p style={{ marginBottom: 8, fontWeight: 600 }}>No reminders yet.</p>
                <p>Click <strong>"+ Add Reminder"</strong> to create your first schedule.</p>
              </div>
            ) : activeTab === 'Schedule' ? (
              <>
                {pending.length > 0 && (
                  <section style={{ marginBottom: 'var(--space-8)' }}>
                    <div className="section-title"><span className="med-icon med-icon-red">⏳</span> Pending ({pending.length})</div>
                    {pending.map((item) => (
                      <div key={item.id} className="reminder-item">
                        <div className="med-icon med-icon-red">💊</div>
                        <div className="reminder-info">
                          <div className="reminder-name">{item.title}</div>
                          <div className="reminder-dose">{reminderMeta(item)}</div>
                        </div>
                        <button className="btn btn-primary" onClick={() => confirmDose(item.id)}>Confirm Dose</button>
                      </div>
                    ))}
                  </section>
                )}

                {completed.length > 0 && (
                  <section>
                    <div className="section-title"><span className="med-icon med-icon-teal">✅</span> Completed ({completed.length})</div>
                    {completed.map((item) => (
                      <div key={item.id} className="reminder-item logged">
                        <div className="med-icon med-icon-teal">✅</div>
                        <div className="reminder-info">
                          <div className="reminder-name">{item.title}</div>
                          <div className="reminder-dose">{reminderMeta(item)}</div>
                        </div>
                        <div className="badge badge-green">Taken</div>
                      </div>
                    ))}
                  </section>
                )}
              </>
            ) : (
              <section>
                <div className="section-title"><span className="med-icon med-icon-gray">📋</span> All Reminders</div>
                {reminders.map((item) => (
                  <div key={item.id} className="reminder-item">
                    <div className={`med-icon ${item.is_completed ? 'med-icon-teal' : 'med-icon-red'}`}>
                      {item.is_completed ? '✅' : '⏳'}
                    </div>
                    <div className="reminder-info">
                      <div className="reminder-name">{item.title}</div>
                      <div className="reminder-dose">{reminderMeta(item, true)}</div>
                    </div>
                    <div className={`badge ${item.is_completed ? 'badge-green' : 'badge-red'}`}>
                      {item.is_completed ? 'Done' : 'Pending'}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
