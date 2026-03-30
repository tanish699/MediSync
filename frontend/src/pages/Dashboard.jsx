import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const navLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/family', label: 'Family' },
];

const reminders = [
  { time: '08:00 AM', for: 'David', name: 'Lisinopril', dose: '10mg Tablet • With food', done: false, icon: '💊' },
  { time: '09:30 AM', for: 'Emma', name: 'Vitamin D3', dose: '2000 IU Softgel', done: false, icon: '🧪' },
  { time: '07:00 AM', for: 'Sarah', name: 'Metformin', dose: 'Taken at 07:05 AM', done: true, icon: '✅' },
];

export default function Dashboard() {
  return (
    <div className="page-layout">
      <Navbar links={navLinks} />

      <div className="content-area">
        {/* Hero banner */}
        <div className="dash-hero" style={{ marginBottom: 28 }}>
          <h1>Good morning, Sarah.</h1>
          <p>Everything is on track today. You have 3 reminders remaining for the household.</p>
        </div>

        <div className="dash-content" style={{ padding: 0 }}>
          {/* Left column */}
          <div>
            {/* Today's reminders */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>Today's Reminders</h2>
                <Link to="/reminders" className="full-schedule-link">Full Schedule →</Link>
              </div>

              {reminders.map((r, i) => (
                <div key={i} className={`reminder-item ${r.done ? 'logged' : ''}`}>
                  <div className="med-icon med-icon-teal">{r.icon}</div>
                  <div className="reminder-info">
                    <div className="reminder-meta">{r.time} · {r.for}</div>
                    <div className="reminder-name">{r.name}</div>
                    <div className="reminder-dose">{r.dose}</div>
                  </div>
                  {r.done
                    ? <span style={{ fontSize: 13, color: '#9dbdb7', fontWeight: 600 }}>Logged</span>
                    : <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: 14 }}>Take</button>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="dash-right-col">
            {/* Urgent alerts */}
            <div className="alert-card">
              <h3>⚠️ Urgent Alerts</h3>
              <div className="alert-item danger">
                <div className="alert-name">Missed Dose: David</div>
                <div className="alert-desc">Evening Insulin was not logged yesterday at 9:00 PM.</div>
                <button className="alert-link">Resolve Now</button>
              </div>
              <div className="alert-item warning">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="alert-name">Low Inventory</div>
                  <span className="badge badge-red" style={{ fontSize: 10 }}>3 DAYS LEFT</span>
                </div>
                <div className="alert-desc">Atorvastatin for Sarah is running low.</div>
                <button className="alert-link teal">Order Refill</button>
              </div>
            </div>
          </div>

          {/* Action cards — Full width row */}
          <div className="dash-action-cards" style={{ gridColumn: '1 / -1', gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div className="action-card teal">
              <div className="action-card-icon">👥</div>
              <h3>Invite Family</h3>
              <p>Coordinate care effortlessly by adding family members to your hearth.</p>
              <a href="#" className="action-card-link">Send Invite →</a>
            </div>
            <div className="action-card mint">
              <div className="action-card-icon">💊</div>
              <h3>Add Medicine</h3>
              <p>Record new prescriptions or over-the-counter medications to your inventory.</p>
              <a href="/inventory" className="action-card-link">Add New Medicine →</a>
            </div>
            <div className="action-card" style={{ background: '#e8eceb' }}>
              <div className="action-card-icon">⏰</div>
              <h3>Add Reminder</h3>
              <p>Set up personalized dose notifications for any medication or health task.</p>
              <a href="/reminders" className="action-card-link">Set New Reminder →</a>
            </div>
          </div>
        </div>
      </div>

      {/* <button className="fab">+</button> */}
    </div>
  );
}
