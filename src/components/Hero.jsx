import React, { useEffect, useRef } from 'react';

// Import actual screenshot
import homeImage from '/src/assets/AppScreenShots/GettingStarted.png';function HeroIPhone() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow ring */}
      <div
        className="absolute w-72 h-72 rounded-full animate-pulse-ring"
        style={{ background: 'radial-gradient(circle, rgba(85,182,133,0.25) 0%, transparent 70%)' }}
      />

      {/* Floating iPhone */}
      <div className="relative animate-float" style={{ zIndex: 10 }}>
        {/* iPhone shell */}
        <div className="relative w-[230px] h-[498px] rounded-[50px] border-[7px] border-gray-800 bg-gray-900 shadow-[0_40px_80px_rgba(0,0,0,0.45)] overflow-hidden">
          {/* Screen */}
          <div className="absolute inset-0 rounded-[44px] overflow-hidden bg-white">
            <img src={homeImage} alt="MediSync App Screen" className="absolute inset-0 w-full h-full object-cover z-10" />
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute -left-[9px] top-24 w-[6px] h-9 bg-gray-700 rounded-l-sm" />
        <div className="absolute -left-[9px] top-36 w-[6px] h-14 bg-gray-700 rounded-l-sm" />
        <div className="absolute -left-[9px] top-52 w-[6px] h-14 bg-gray-700 rounded-l-sm" />
        <div className="absolute -right-[9px] top-32 w-[6px] h-16 bg-gray-700 rounded-r-sm" />
      </div>

      {/* Floating notification bubble */}
      <div
        className="absolute top-8 -right-4 md:-right-8 px-3 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-float"
        style={{
          background: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          animationDelay: '1s',
          zIndex: 20,
        }}
      >
        <span className="text-base">🔔</span>
        <div>
          <p className="text-[10px] font-bold" style={{ color: '#1c1c1e' }}>Time for Morning Walk!</p>
          <p className="text-[9px]" style={{ color: '#8e8e93' }}>MediSync Reminder</p>
        </div>
      </div>

      {/* Family badge */}
      <div
        className="absolute bottom-16 -left-4 md:-left-10 px-3 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-float"
        style={{
          background: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          animationDelay: '2s',
          zIndex: 20,
        }}
      >
        <span className="text-base">👨‍👩‍👧‍👦</span>
        <div>
          <p className="text-[10px] font-bold" style={{ color: '#1c1c1e' }}>3 Family Members</p>
          <p className="text-[9px]" style={{ color: '#8e8e93' }}>All synced</p>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20"
      style={{ background: 'linear-gradient(160deg, #f7fff9 0%, #eafbf0 40%, #f2f2f7 100%)' }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #55B685 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #5E5CE6 0%, transparent 70%)', transform: 'translate(-40%, 40%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
              style={{ background: '#e8f8ef', color: '#55B685', border: '1px solid #c0e8d0' }}>
              <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: '#55B685' }} />
              Now Available On App Store
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-balance mb-6"
              style={{ color: '#1c1c1e' }}
            >
              Your Family&rsquo;s
              <br />
              Routine, <span style={{
                background: 'linear-gradient(135deg, #55B685, #3a9669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Synchronized.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl leading-relaxed mb-10 max-w-lg" style={{ color: '#3c3c43' }}>
              The ultimate family organizer and daily companion.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary */}
              <a
                href="https://apps.apple.com/in/app/medisync-health-platform/id6760579694"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-7 py-4 rounded-2xl font-semibold text-base text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
                style={{ background: 'linear-gradient(135deg, #1c1c1e, #3a3a3c)' }}
              >
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] opacity-70 leading-none mb-0.5">Now Available On</p>
                  <p className="text-base font-bold leading-none">App Store</p>
                </div>
              </a>

              {/* Secondary */}
              <a
                href="#features"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base border-2 transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ borderColor: '#55B685', color: '#55B685', background: 'rgba(85,182,133,0.06)' }}
              >
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-14">
              {[
                { value: '4', label: 'Activity Types' },
                { value: '∞', label: 'Family Members' },
                { value: '24/7', label: 'Cloud Sync' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-black" style={{ color: '#55B685' }}>{stat.value}</p>
                  <p className="text-sm" style={{ color: '#8e8e93' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: iPhone Mockup */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <HeroIPhone />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <p className="text-xs font-medium" style={{ color: '#8e8e93' }}>Scroll to explore</p>
        <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-gray-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
