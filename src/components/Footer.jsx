import React from 'react';

// 👉 STEP 1: Import your actual app logo here:
import appLogo from '/src/assets/AppLogo/Logo.png';
// const appLogo = null; // 👈 Remove this line once you uncomment the import above!

export default function Footer() {
  return (
    <footer style={{ background: '#1c1c1e' }} className="text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* 👉 STEP 2: The logo will automatically appear here once imported */}
              {appLogo ? (
                <img src={appLogo} alt="MediSync" className="w-11 h-11 rounded-[14px] shadow-lg object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #55B685, #3a9669)' }}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
              <span className="text-2xl font-bold">
                Medi<span style={{ color: '#55B685' }}>Sync</span>
              </span>
            </div>
            <p className="text-sm max-w-xs" style={{ color: '#8e8e93' }}>
              Your family's routine, synchronized. The ultimate daily organizer for iOS.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#55B685' }}>
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://tanish699.github.io/MediSyncDocumentation/support.html"
                    target="_blank" rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: '#8e8e93' }}>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="mailto:support.medisync@gmail.com"
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: '#8e8e93' }}>
                    support.medisync@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#55B685' }}>
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://tanish699.github.io/MediSyncDocumentation/privacy.html"
                    target="_blank" rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: '#8e8e93' }}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://tanish699.github.io/MediSyncDocumentation/support.html"
                    target="_blank" rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: '#8e8e93' }}>
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* App Store Badge + Copyright */}
        <div className="flex flex-col items-center gap-6">
          {/* App Store Badge */}
          <a
            href="https://apps.apple.com/in/app/medisync-health-platform/id6760579694"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-3.5 rounded-2xl border transition-all duration-200 hover:scale-105 hover:shadow-xl group"
            style={{
              background: 'rgba(255,255,255,0.05)',
              borderColor: 'rgba(255,255,255,0.12)',
            }}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <p className="text-xs" style={{ color: '#8e8e93' }}>Now Available On</p>
              <p className="text-base font-bold text-white">App Store</p>
            </div>
          </a>

          <p className="text-sm text-center" style={{ color: '#48484a' }}>
            © {new Date().getFullYear()} MediSync. All rights reserved. Made with ❤️ for families.
          </p>
        </div>
      </div>
    </footer>
  );
}
