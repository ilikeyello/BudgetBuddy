// Auth page — sign in/sign up with feature highlights and animations

const FeaturePill = ({ icon, text, color, delay }) => (
  <AnimateIn delay={delay} y={20}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
      background: color + '18', borderRadius: 40, border: `1px solid ${color}30`,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 14, background: color + '30',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, flexShrink: 0,
      }}>{icon}</div>
      <span style={{ fontSize: 13, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap' }}>{text}</span>
    </div>
  </AnimateIn>
);

const FloatingOrb = ({ size, color, top, left, delay }) => (
  <div style={{
    position: 'absolute', top, left, width: size, height: size,
    borderRadius: '50%', background: color,
    filter: 'blur(40px)', opacity: 0.35, pointerEvents: 'none',
    animation: `orbFloat 6s ease-in-out ${delay}s infinite alternate`,
  }} />
);

const AuthPage = ({ tweaks, onSignIn }) => {
  const hf = tweaks?.headingFont || 'Space Grotesk';
  const accent = ACCENT_THEMES[tweaks?.accent || 'Lime'];
  const [mode, setMode] = React.useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [formAnim, setFormAnim] = React.useState(0);

  const switchMode = (m) => {
    setMode(m);
    setFormAnim(k => k + 1);
  };

  const inputStyle = {
    width: '100%', height: 48, borderRadius: 14, border: '1.5px solid rgba(255,255,255,0.1)',
    padding: '0 16px', fontSize: 14, outline: 'none', background: 'rgba(255,255,255,0.06)',
    fontFamily: "'DM Sans'", color: '#fff', boxSizing: 'border-box',
    transition: 'border-color 0.25s',
  };

  const chatIcon = <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M17 9c0 4-3 7-7 7-1 0-2-.2-3-.7L3 17l1.3-3.2C3.5 12.6 3 11.3 3 10 3 6 6 3 10 3s7 3 7 6z" stroke={accent.primary} strokeWidth="1.6" strokeLinecap="round" fill="none"/></svg>;
  const syncIcon = <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M14 4a7 7 0 11-4-1.5M14 4V1M14 4h-3" stroke="#B5A3DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  const targetIcon = <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#6DCAA8" strokeWidth="1.6"/><circle cx="10" cy="10" r="3.5" stroke="#6DCAA8" strokeWidth="1.4"/><circle cx="10" cy="10" r="1" fill="#6DCAA8"/></svg>;
  const chartIcon = <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="10" width="3.5" height="7" rx="1" stroke="#E8A882" strokeWidth="1.4" fill="none"/><rect x="8.25" y="6" width="3.5" height="11" rx="1" stroke="#E8A882" strokeWidth="1.4" fill="none"/><rect x="14.5" y="3" width="3.5" height="14" rx="1" stroke="#E8A882" strokeWidth="1.4" fill="none"/></svg>;

  const features = [
    { icon: chatIcon, text: 'AI budget coach', color: accent.primary },
    { icon: syncIcon, text: 'Auto-categorize', color: '#B5A3DB' },
    { icon: targetIcon, text: 'Smart goals', color: '#6DCAA8' },
    { icon: chartIcon, text: 'Debt strategies', color: '#E8A882' },
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#1C1C2E', position: 'relative', overflow: 'hidden',
    }}>
      {/* Floating background orbs */}
      <FloatingOrb size={180} color={accent.primary} top="-40px" left="-50px" delay={0} />
      <FloatingOrb size={140} color="#B5A3DB" top="120px" left="260px" delay={2} />
      <FloatingOrb size={100} color="#6DCAA8" top="380px" left="-20px" delay={4} />

      {/* Top section — branding + features */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '70px 24px 20px', position: 'relative', zIndex: 1 }}>
        {/* Logo mark */}
        {/* Mascot hero with speech bubble */}
        <AnimateIn delay={100} y={24}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16 }}>
            <div style={{ position: 'relative', flexShrink: 0, marginTop: 8 }}>
              <img src="uploads/budget_buddy.png" alt="Budget Buddy" style={{
                width: 100, height: 100, objectFit: 'contain',
                filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.25))',
              }} />
            </div>
            <div style={{ position: 'relative', marginTop: 20 }}>
              <div style={{
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '14px 14px 14px 4px', padding: '10px 14px',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: hf, lineHeight: 1.4, display: 'block' }}>Ready to make your wallet happy? 🎉</span>
              </div>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={200} y={24}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontFamily: hf, fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: -0.3 }}>BudgetBuddy</span>
          </div>
        </AnimateIn>

        {/* Headline */}
        <AnimateIn delay={280} y={24}>
          <div style={{ fontFamily: hf, fontSize: 30, fontWeight: 700, color: '#fff', lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 8 }}>
            Your money,{' '}
            <span style={{ color: accent.primary }}>smarter.</span>
          </div>
        </AnimateIn>

        <AnimateIn delay={360} y={20}>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: 20, maxWidth: 300 }}>
            AI-powered budgeting that learns your habits, tracks your goals, and helps you crush debt.
          </div>
        </AnimateIn>

        {/* Feature pills — two rows */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {features.map((f, i) => (
            <FeaturePill key={i} {...f} delay={440 + i * 80} />
          ))}
        </div>
      </div>

      {/* Bottom section — auth form */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', borderRadius: '28px 28px 0 0',
        padding: '24px 24px 40px', position: 'relative', zIndex: 1,
        border: '1px solid rgba(255,255,255,0.06)', borderBottom: 'none',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      }}>
        {/* Mode tabs */}
        <div style={{
          display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: 14,
          padding: 3, marginBottom: 20,
        }}>
          {['signin', 'signup'].map(m => (
            <button key={m} onClick={() => switchMode(m)} style={{
              flex: 1, padding: '10px', border: 'none', borderRadius: 12,
              background: mode === m ? accent.primary : 'transparent',
              color: mode === m ? accent.onPrimary : 'rgba(255,255,255,0.4)',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'DM Sans'", transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
            }}>
              {m === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Form fields */}
        <div key={formAnim} style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'pageIn 0.3s ease' }}>
          {mode === 'signup' && (
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="Full name" style={inputStyle}
              onFocus={e => e.target.style.borderColor = accent.primary}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
          )}
          <input value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email address" type="email" style={inputStyle}
            onFocus={e => e.target.style.borderColor = accent.primary}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
          <input value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" type="password" style={inputStyle}
            onFocus={e => e.target.style.borderColor = accent.primary}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />

          {/* Submit button */}
          <button onClick={onSignIn} style={{
            width: '100%', height: 50, borderRadius: 14, border: 'none',
            background: accent.primary, color: accent.onPrimary,
            fontSize: 16, fontWeight: 700, cursor: 'pointer',
            fontFamily: hf, marginTop: 4,
            boxShadow: `0 4px 20px ${accent.primary}40`,
            transition: 'transform 0.12s, box-shadow 0.2s',
          }}
          onPointerDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; e.currentTarget.style.boxShadow = `0 2px 10px ${accent.primary}30`; }}
          onPointerUp={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 4px 20px ${accent.primary}40`; }}>
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Social buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { name: 'Google', letter: 'G', bg: '#fff', color: '#333' },
              { name: 'Apple', letter: '', bg: '#fff', color: '#000' },
            ].map((s, i) => (
              <button key={i} style={{
                flex: 1, height: 46, borderRadius: 12, border: 'none',
                background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)',
                fontSize: 14, fontWeight: 500, cursor: 'pointer',
                fontFamily: "'DM Sans'", display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8,
                transition: 'background 0.2s, transform 0.12s',
              }}
              onPointerDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
              onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                {s.name === 'Apple' ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="rgba(255,255,255,0.7)">
                    <path d="M12.7 8.4c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.2 0 2-1 2.7-2.1.9-1.2 1.2-2.4 1.2-2.5 0 0-2.3-.9-2.7-3.4zM10.5 2.3c.6-.7 1-1.7.9-2.7-.8 0-1.9.6-2.5 1.3-.5.6-1 1.7-.9 2.6.9.1 1.9-.5 2.5-1.2z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M15.5 8.2c0-.6-.1-1.2-.2-1.7H8v3.2h4.2c-.2 1-.7 1.8-1.5 2.4v2h2.4c1.4-1.3 2.4-3.2 2.4-5.9z" fill="#4285F4"/>
                    <path d="M8 16c2 0 3.7-.7 5-1.9l-2.4-2c-.7.5-1.5.7-2.6.7-2 0-3.7-1.3-4.3-3.2H1.2v2c1.3 2.6 3.9 4.4 6.8 4.4z" fill="#34A853"/>
                    <path d="M3.7 9.6c-.2-.5-.2-1 0-1.5v-2H1.2C.4 7.4 0 8.7 0 10s.4 2.6 1.2 3.9l2.5-2z" fill="#FBBC05"/>
                    <path d="M8 3.2c1.1 0 2.1.4 2.9 1.1l2.2-2.2C11.7.8 10 0 8 0 5.1 0 2.5 1.8 1.2 4.4l2.5 2c.6-1.9 2.3-3.2 4.3-3.2z" fill="#EA4335"/>
                  </svg>
                )}
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {mode === 'signin' && (
          <button style={{ display: 'block', margin: '14px auto 0', background: 'none', border: 'none', color: accent.primary, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans'" }}>
            Forgot password?
          </button>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { AuthPage });
