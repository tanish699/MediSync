import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const navLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/family', label: 'Family' },
];

const days = ['MO','TU','WE','TH','FR','SA','SU'];
const dates = [23, 24, 25, 26, 27, 28, 29];

const morningItems = [
  {
    name: 'Lisinopril 10mg',
    for: 'Sarah',
    time: '08:00 AM',
    taken: true,
    loggedAt: '08:04 AM',
    icon: '💊',
    iconBg: 'teal',
  },
  {
    name: 'Ventolin Inhaler',
    for: 'Leo',
    time: '09:30 AM',
    taken: false,
    icon: '⚕️',
    iconBg: 'red',
    urgent: true,
  },
];

const afternoonItems = [
  {
    name: 'Multivitamin',
    for: 'Grandma',
    time: '01:00 PM',
    inHours: 'In 2 hours',
    icon: '💊',
    iconBg: 'gray',
  },
];

export default function Reminders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Schedule');
  const [items, setItems] = useState({ morning: morningItems });

  const confirmDose = (name) => {
    setItems(prev => ({
      ...prev,
      morning: prev.morning.map(i =>
        i.name === name ? { ...i, taken: true, loggedAt: 'Just now' } : i
      )
    }));
  };

  return (
    <div className="page-layout">
      <Navbar links={navLinks} />
      <div className="content-area">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36 }}>
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1>Today's Care</h1>
            <p>Manage your family's health journey with gentleness. 4 doses remaining for today.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/reminders/add')} style={{ padding: '12px 24px', flexShrink: 0, marginTop: 8 }}>
            + Add Reminder
          </button>
        </div>

        <div className="reminders-layout">
          {/* Left column */}
          <div>
            {/* Calendar */}
            <div className="cal-card">
              <div className="cal-header">
                <h3>October 2023</h3>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="cal-nav">‹</button>
                  <button className="cal-nav">›</button>
                </div>
              </div>
              <div className="cal-grid">
                {days.map(d => <div key={d} className="cal-dow">{d}</div>)}
                {dates.map(d => (
                  <div key={d} className={`cal-day ${d === 25 ? 'active' : ''}`}>{d}</div>
                ))}
              </div>
            </div>

            {/* Adherence */}
            <div className="adherence-card">
              <div className="adherence-label">Weekly Adherence</div>
              <div className="adherence-pct">94%</div>
              <div className="adherence-bar">
                <div className="adherence-fill" style={{ width: '94%' }} />
              </div>
              <div className="adherence-msg">Your family is staying on track. Keep up the great care!</div>
            </div>

            {/* Toggle */}
            <div className="toggle-tabs">
              {['Schedule', 'History'].map(t => (
                <button
                  key={t}
                  className={`toggle-tab ${activeTab === t ? 'active' : ''}`}
                  onClick={() => setActiveTab(t)}
                >{t}</button>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Morning */}
            <div className="time-section">
              <div className="time-section-header">☀️ Morning</div>

              {items.morning.map((item, i) => (
                <div key={i} className={`rem-item ${item.urgent ? 'urgent-border' : ''}`}>
                  <div className={`med-icon med-icon-${item.iconBg}`}>{item.icon}</div>
                  <div className="rem-item-info">
                    <div className="rem-item-name">{item.name}</div>
                    <div className="rem-item-for">
                      <span className="av-xs">👤</span>
                      For {item.for} • {item.time}
                    </div>
                  </div>
                  {item.taken ? (
                    <div style={{ textAlign: 'right' }}>
                      <div className="badge badge-green">✅ Taken</div>
                      <div style={{ fontSize: 11, color: '#9dbdb7', marginTop: 4 }}>Logged at {item.loggedAt}</div>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary"
                      style={{ padding: '10px 20px', borderRadius: 10 }}
                      onClick={() => confirmDose(item.name)}
                    >
                      Confirm Dose
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Afternoon */}
            <div className="time-section">
              <div className="time-section-header">🌤️ Afternoon</div>

              {afternoonItems.map((item, i) => (
                <div key={i} className="rem-item">
                  <div className={`med-icon med-icon-${item.iconBg}`}>{item.icon}</div>
                  <div className="rem-item-info">
                    <div className="rem-item-name">{item.name}</div>
                    <div className="rem-item-for">
                      <span className="av-xs">👤</span>
                      For {item.for} • {item.time}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9dbdb7', fontSize: 13, fontWeight: 600 }}>
                    🕐 {item.inHours}
                  </div>
                </div>
              ))}
            </div>




          </div>
        </div>
      </div>
    </div>
  );
}
