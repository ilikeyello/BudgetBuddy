// Settings page — profile, connected accounts, preferences

const SettingsToggle = ({ label, value, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
    <span style={{ fontSize: 14, color: '#2A2A3A' }}>{label}</span>
    <div onClick={() => onChange(!value)} style={{
      width: 46, height: 28, borderRadius: 14, cursor: 'pointer',
      background: value ? '#6DCAA8' : '#DDDBD6',
      padding: 3, transition: 'background 0.25s',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 11, background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        transform: value ? 'translateX(18px)' : 'translateX(0)',
        transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
      }} />
    </div>
  </div>
);

const SettingsRow = ({ label, value, icon, onClick, danger }) => (
  <div onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0',
    cursor: onClick ? 'pointer' : 'default',
  }}>
    {icon && (
      <div style={{ width: 32, height: 32, borderRadius: 10, background: danger ? '#E0899E22' : '#EEECE7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14 }}>
        {icon}
      </div>
    )}
    <span style={{ flex: 1, fontSize: 14, color: danger ? '#D04040' : '#2A2A3A', fontWeight: danger ? 500 : 400 }}>{label}</span>
    {value && <span style={{ fontSize: 13, color: '#8A8A9A' }}>{value}</span>}
    {onClick && !danger && (
      <svg width="7" height="12" viewBox="0 0 7 12" style={{ flexShrink: 0 }}>
        <path d="M1 1l5 5-5 5" stroke="#C0C0D0" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </div>
);

const SettingsSection = ({ title, children }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 12, fontWeight: 600, color: '#8A8A9A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{title}</div>
    <div style={{ background: '#fff', borderRadius: 16, padding: '2px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
      {React.Children.map(children, (child, i) => (
        <React.Fragment key={i}>
          {child}
          {i < React.Children.count(children) - 1 && <div style={{ height: 1, background: '#F0EDE8' }} />}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const SettingsPage = ({ tweaks }) => {
  const hf = tweaks?.headingFont || 'Space Grotesk';
  const accent = ACCENT_THEMES[tweaks?.accent || 'Lime'];
  const [pushNotifs, setPushNotifs] = React.useState(true);
  const [weeklyReport, setWeeklyReport] = React.useState(true);
  const [billAlerts, setBillAlerts] = React.useState(true);
  const [biometrics, setBiometrics] = React.useState(false);

  return (
    <div style={{ height: '100%', overflow: 'auto', background: '#F7F5F0' }}>
      <div style={{ padding: '60px 20px 20px' }}>
        <AnimateIn delay={0}>
          <div style={{ fontFamily: hf, fontSize: 26, fontWeight: 700, color: '#2A2A3A', marginBottom: 20 }}>Settings</div>
        </AnimateIn>

        {/* Profile card */}
        <AnimateIn delay={60}>
          <div style={{ background: '#1C1C2E', borderRadius: 20, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src="uploads/budget_buddy.png" alt="Profile" style={{
              width: 50, height: 50, objectFit: 'contain', flexShrink: 0,
              borderRadius: 25, background: 'rgba(255,255,255,0.1)',
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>Alex Morgan</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>alex.morgan@email.com</div>
            </div>
            <svg width="7" height="12" viewBox="0 0 7 12"><path d="M1 1l5 5-5 5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </AnimateIn>

        {/* Connected Accounts */}
        <AnimateIn delay={120}>
          <SettingsSection title="Connected Accounts">
            <SettingsRow icon="🏦" label="Chase Checking" value="••4821" onClick={() => {}} />
            <SettingsRow icon="💳" label="Amex Credit Card" value="••3094" onClick={() => {}} />
            <div style={{ padding: '12px 0' }}>
              <button style={{
                width: '100%', padding: '10px', border: `1.5px dashed ${accent.primary}60`,
                background: accent.bg, borderRadius: 12, cursor: 'pointer',
                fontSize: 13, fontWeight: 600, color: accent.onPrimary,
                fontFamily: "'DM Sans'", transition: 'transform 0.12s',
              }}
              onPointerDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                + Connect Account
              </button>
            </div>
          </SettingsSection>
        </AnimateIn>

        {/* Notifications */}
        <AnimateIn delay={180}>
          <SettingsSection title="Notifications">
            <SettingsToggle label="Push notifications" value={pushNotifs} onChange={setPushNotifs} />
            <SettingsToggle label="Weekly spending report" value={weeklyReport} onChange={setWeeklyReport} />
            <SettingsToggle label="Bill due alerts" value={billAlerts} onChange={setBillAlerts} />
          </SettingsSection>
        </AnimateIn>

        {/* Preferences */}
        <AnimateIn delay={240}>
          <SettingsSection title="Preferences">
            <SettingsRow label="Budget period" value="Monthly" onClick={() => {}} />
            <SettingsRow label="Currency" value="USD ($)" onClick={() => {}} />
            <SettingsRow label="Start of month" value="1st" onClick={() => {}} />
          </SettingsSection>
        </AnimateIn>

        {/* Security */}
        <AnimateIn delay={300}>
          <SettingsSection title="Security">
            <SettingsToggle label="Face ID / Biometrics" value={biometrics} onChange={setBiometrics} />
            <SettingsRow label="Change passcode" onClick={() => {}} />
          </SettingsSection>
        </AnimateIn>

        {/* About */}
        <AnimateIn delay={360}>
          <SettingsSection title="About">
            <SettingsRow label="Help & Support" onClick={() => {}} />
            <SettingsRow label="Privacy Policy" onClick={() => {}} />
            <SettingsRow label="App version" value="1.0.0" />
          </SettingsSection>
        </AnimateIn>

        <AnimateIn delay={420}>
          <div style={{ padding: '0 0 8px' }}>
            <button style={{
              width: '100%', padding: '14px', border: 'none',
              background: '#D0404015', borderRadius: 14, cursor: 'pointer',
              fontSize: 14, fontWeight: 600, color: '#D04040',
              fontFamily: "'DM Sans'", transition: 'transform 0.12s',
            }}
            onPointerDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
              Sign Out
            </button>
          </div>
        </AnimateIn>

        <div style={{ height: 70 }} />
      </div>
    </div>
  );
};

Object.assign(window, { SettingsPage });
