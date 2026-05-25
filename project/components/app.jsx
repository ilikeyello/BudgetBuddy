// App shell — tab navigation + page transitions

const TabIcon = ({ type, active, accent }) => {
  const c = active ? accent : 'rgba(255,255,255,0.45)';
  const box = { width: 22, height: 22, display: 'block' };
  if (type === 'chat') return (
    <svg {...box} viewBox="0 0 24 24" fill="none">
      <path d="M20 11.5c0 4.7-3.6 8.5-8 8.5-1.3 0-2.5-.3-3.6-.8L4 21l1.5-3.8C4.6 15.8 4 14.2 4 12.5 4 7.8 7.6 4 12 4s8 3.8 8 7.5z"
        stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
  if (type === 'goals') return (
    <svg {...box} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="5" stroke={c} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="1.5" fill={c} />
    </svg>
  );
  if (type === 'debts') return (
    <svg {...box} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="3" stroke={c} strokeWidth="1.8" fill="none" />
      <path d="M3 10.5h18" stroke={c} strokeWidth="1.8" />
      <path d="M7 15h3.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
  // settings — gear icon
  return (
    <svg {...box} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.8" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const TabBar = ({ activeTab, onTabChange, tweaks }) => {
  const accent = ACCENT_THEMES[tweaks?.accent || 'Lime'];
  const tabs = [
    { id: 'chat', label: 'Chat' },
    { id: 'goals', label: 'Goals' },
    { id: 'debts', label: 'Debts' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div style={{
      position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: 4,
      padding: '5px', background: '#1C1C2E',
      borderRadius: 28, zIndex: 50,
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    }}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button key={tab.id} onClick={() => onTabChange(tab.id)} style={{
            display: 'flex', alignItems: 'center', gap: isActive ? 7 : 0,
            background: isActive ? accent.primary : 'transparent',
            border: 'none', cursor: 'pointer',
            padding: isActive ? '14px 18px 14px 14px' : '14px 14px',
            borderRadius: 22,
            transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
            overflow: 'hidden',
          }}>
            <TabIcon type={tab.id} active={isActive} accent={isActive ? accent.onPrimary : undefined} />
            <span style={{
              fontSize: 13, fontWeight: 600,
              color: accent.onPrimary,
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: 'nowrap',
              width: isActive ? 'auto' : 0,
              opacity: isActive ? 1 : 0,
              overflow: 'hidden',
              transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease',
            }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const BudgetBuddyApp = ({ tweaks }) => {
  const [activeTab, setActiveTab] = React.useState('chat');
  const [animKey, setAnimKey] = React.useState(0);
  const [signedIn, setSignedIn] = React.useState(false);
  const [onboarded, setOnboarded] = React.useState(false);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setAnimKey(k => k + 1);
  };

  if (!signedIn) {
    return <AuthPage tweaks={tweaks} onSignIn={() => setSignedIn(true)} />;
  }

  if (!onboarded) {
    return <OnboardingPage tweaks={tweaks} onComplete={() => setOnboarded(true)} />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'chat': return <ChatPage tweaks={tweaks} onGoalsNavigate={() => handleTabChange('goals')} />;
      case 'goals': return <GoalsPage tweaks={tweaks} />;
      case 'debts': return <DebtsPage tweaks={tweaks} />;
      case 'settings': return <SettingsPage tweaks={tweaks} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F5F0', position: 'relative' }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', minHeight: 0 }}>
        <div key={animKey} style={{ width: '100%', height: '100%', animation: 'pageIn 0.3s ease' }}>
          {renderPage()}
        </div>
      </div>
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} tweaks={tweaks} />
    </div>
  );
};

Object.assign(window, { BudgetBuddyApp, TabBar });
