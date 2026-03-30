import { useState } from 'react';
import Navbar from '../components/Navbar';

const navLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/family', label: 'Family' },
];

const initialMeds = [
  {
    name: 'Lisinopril',
    dose: '10mg Tablet • Oral',
    resident: 'James (Dad)',
    residentDot: 'green',
    current: 42, total: 60,
    icon: '💊', iconBg: 'teal',
    low: false,
  },
  {
    name: 'Amoxicillin',
    dose: '500mg Capsule • Oral',
    resident: 'Lily (Child)',
    residentDot: 'red',
    current: 3, total: 21,
    icon: '⚠️', iconBg: 'red',
    low: true,
  },
  {
    name: 'Multivitamin',
    dose: 'Gummy • Oral',
    resident: 'Household',
    residentDot: 'yellow',
    current: 85, total: 100,
    icon: '💊', iconBg: 'teal',
    low: false,
  },
  {
    name: 'Eye Drops',
    dose: '0.05% Solution • Topical',
    resident: 'Sarah (Mom)',
    residentDot: 'purple',
    current: 15, total: 30,
    icon: '💧', iconBg: 'teal',
    low: false,
  },
];

const filters = ['Everyone', 'Sarah', 'James', 'Lily'];

export default function Inventory() {
  const [activeFilter, setActiveFilter] = useState('Everyone');
  const [search, setSearch] = useState('');

  const meds = initialMeds.filter(m => {
    const matchesFilter = activeFilter === 'Everyone' || m.resident.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-layout">
      <Navbar links={navLinks} />
      <div className="content-area">
        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36 }}>
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1>Medicine Cabinet</h1>
            <p>Detailed inventory for the Miller Household.</p>
          </div>
          <button className="btn btn-primary" style={{ padding: '12px 24px', flexShrink: 0, marginTop: 8 }}>
            + Add Medicine
          </button>
        </div>

        <div className="inventory-layout">
          {/* Left sidebar */}
          <div className="inv-sidebar">
            <div className="inv-search-card">
              <div className="section-title">SEARCH RECORDS</div>
              <div className="search-input-wrap" style={{ marginBottom: 20 }}>
                <span className="search-icon">🔍</span>
                <input
                  className="search-input"
                  placeholder="Ibuprofen, etc..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="section-title">FILTER BY RESIDENT</div>
              <div className="filter-chips">
                {filters.map(f => (
                  <button
                    key={f}
                    className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
                    onClick={() => setActiveFilter(f)}
                  >{f}</button>
                ))}
              </div>

              <div className="low-stock-row" style={{ marginTop: 16 }}>
                <span className="low-stock-label">Low Stock Alerts</span>
                <span className="low-stock-badge">3</span>
              </div>
            </div>
          </div>

          {/* Medication table */}
          <div>
            <div className="med-table-header">
              <span>MEDICATION &amp; DOSAGE</span>
              <span>RESIDENT</span>
              <span>REMAINING</span>
              <span>ACTIONS</span>
            </div>

            {meds.map((med, i) => {
              const pct = Math.round((med.current / med.total) * 100);
              const unit = med.dose.includes('ml') ? 'ml' : 'Units';
              return (
                <div key={i} className="med-row">
                  {/* Name col */}
                  <div className="med-name-col">
                    <div className={`med-icon med-icon-${med.iconBg}`}>{med.icon}</div>
                    <div>
                      <div className="med-name">{med.name}</div>
                      <div className="med-dose">{med.dose}</div>
                    </div>
                  </div>

                  {/* Resident */}
                  <div>
                    <div className="resident-tag">
                      <span className={`dot dot-${med.residentDot}`} />
                      {med.resident}
                    </div>
                  </div>

                  {/* Remaining */}
                  <div>
                    <div className={`med-remaining-num ${med.low ? 'low' : 'ok'}`}>
                      {med.current} / {med.total} {unit}
                    </div>
                    <div className="progress-bar" style={{ width: 120 }}>
                      <div
                        className={`progress-fill ${med.low ? 'fill-red' : 'fill-green'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="med-actions">
                    <button className="icon-btn">{med.low ? '🔄' : '✏️'}</button>
                    <button className="icon-btn">⋮</button>
                  </div>
                </div>
              );
            })}

            <button className="show-more-row">
              ∨ Show All Medication (12 more)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
