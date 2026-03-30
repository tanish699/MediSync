import Navbar from '../components/Navbar';

const navLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/family', label: 'Family' },
];

const members = [
  { name: 'Sarah (You)', role: 'Admin • Full Access', emoji: '👩' },
  { name: 'David Miller', role: 'Caregiver • Full Access', emoji: '👨' },
  { name: 'Emma Miller', role: 'Family Member • Limited', emoji: '👧' },
  { name: 'Arthur Miller', role: 'Patient • Health View', emoji: '👴' },
];

const profileMenuItems = [
  { icon: '👤', label: 'Personal Info' },
  { icon: '🔔', label: 'Notification Preferences' },
  { icon: '🔒', label: 'Security & Privacy' },
];

export default function Family() {


  return (
    <div className="page-layout">
      <Navbar links={navLinks} />
      <div className="content-area">
        <div className="family-layout">

          {/* Left — Profile card */}
          <div>
            <div className="profile-card">
              <div className="profile-avatar-wrap">
                <div className="profile-avatar">👩</div>
                <button className="profile-edit-btn">✏️</button>
              </div>
              <div className="profile-name">Sarah Miller</div>
              <div className="profile-role">Primary Care Coordinator</div>

              <ul className="profile-menu">
                {profileMenuItems.map((item) => (
                  <li key={item.label}>
                    <a href="#">
                      <span>
                        <span className="profile-menu-icon">{item.icon}</span>
                        {item.label}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>›</span>
                    </a>
                  </li>
                ))}
              </ul>

              <button className="btn btn-primary invite-btn">
                👥+ Invite a Member
              </button>
              <button className="create-family-btn">
                👥+ Create a New Family
              </button>
            </div>
          </div>

          {/* Right — Family panel */}
          <div className="family-right">
            <div className="family-right-header">
              <div>
                <h2>The Miller Family</h2>
                <p>4 Active Members • Household Hub</p>
              </div>
              <a href="#" className="settings-link">⚙️ Family Settings</a>
            </div>

            {/* Member grid */}
            <div className="member-grid">
              {members.map((m) => (
                <div key={m.name} className="member-card">
                  <div className="member-av">{m.emoji}</div>
                  <div>
                    <div className="member-name">{m.name}</div>
                    <div className="member-role">{m.role}</div>
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
