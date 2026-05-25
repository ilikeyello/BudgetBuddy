// Goals page — savings goals with progress and AI tips

const GoalCard = ({ goal, tweaks, delay = 0 }) => {
  const hf = tweaks?.headingFont || 'Space Grotesk';
  const accent = ACCENT_THEMES[tweaks?.accent || 'Lime'];
  const pct = Math.round((goal.saved / goal.target) * 100);
  const [expanded, setExpanded] = React.useState(false);

  return (
    <AnimateIn delay={delay} y={16}>
      <div onClick={() => setExpanded(!expanded)}
        style={{
          background: '#fff', borderRadius: 20, padding: '18px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
          cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
          overflow: 'hidden',
        }}
        onPointerDown={e => { e.currentTarget.style.transform = 'scale(0.98)'; }}
        onPointerUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ProgressRing progress={pct} size={56} strokeWidth={5} color={goal.color} delay={delay}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#2A2A3A', fontFamily: hf }}>{pct}%</span>
          </ProgressRing>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CategoryIcon letter={goal.letter} color={goal.color} size={28} />
              <span style={{ fontFamily: hf, fontSize: 16, fontWeight: 600, color: '#2A2A3A' }}>{goal.name}</span>
            </div>
            <div style={{ fontSize: 13, color: '#8A8A9A', marginTop: 4 }}>
              <span style={{ fontWeight: 600, color: '#2A2A3A' }}>{formatCurrency(goal.saved, false)}</span>
              {' '}/{' '}{formatCurrency(goal.target, false)}
            </div>
          </div>
        </div>

        {/* Details row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <div style={{ flex: 1, background: goal.color + '18', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#8A8A9A', fontWeight: 500 }}>Monthly</div>
            <div style={{ fontFamily: hf, fontSize: 15, fontWeight: 600, color: '#2A2A3A', marginTop: 1 }}>{formatCurrency(goal.monthlyContrib, false)}</div>
          </div>
          <div style={{ flex: 1, background: goal.color + '18', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#8A8A9A', fontWeight: 500 }}>Target Date</div>
            <div style={{ fontFamily: hf, fontSize: 15, fontWeight: 600, color: '#2A2A3A', marginTop: 1 }}>{goal.projectedDate}</div>
          </div>
        </div>

        {/* AI tip — expandable */}
        <div style={{
          display: 'grid',
          gridTemplateRows: expanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ marginTop: 12, padding: '10px 12px', background: accent.bg, borderRadius: 12, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <img src="uploads/budget_buddy.png" alt="" style={{ width: 24, height: 24, objectFit: 'contain', flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 12, color: '#4A4A5A', lineHeight: 1.5 }}>{goal.aiTip}</div>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <button style={{ flex: 1, border: 'none', background: '#1C1C2E', color: '#fff', padding: '9px', borderRadius: 12, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans'", transition: 'transform 0.12s' }}
                onPointerDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
                onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                Boost savings
              </button>
              <button style={{ flex: 1, border: '1.5px solid #E5E3DE', background: 'transparent', color: '#5A5A6A', padding: '9px', borderRadius: 12, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans'", transition: 'transform 0.12s' }}
                onPointerDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
                onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                Keep current
              </button>
            </div>
          </div>
        </div>

        {/* Expand hint */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <svg width="14" height="8" viewBox="0 0 14 8" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
            <path d="M2 2l5 4 5-4" stroke="#C0C0D0" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </AnimateIn>
  );
};

const GoalsPage = ({ tweaks }) => {
  const hf = tweaks?.headingFont || 'Space Grotesk';
  const accent = ACCENT_THEMES[tweaks?.accent || 'Lime'];
  const totalSaved = GOALS_DATA.reduce((s, g) => s + g.saved, 0);
  const totalTarget = GOALS_DATA.reduce((s, g) => s + g.target, 0);
  const totalPct = Math.round((totalSaved / totalTarget) * 100);

  return (
    <div style={{ height: '100%', overflow: 'auto', background: '#F7F5F0' }}>
      <div style={{ padding: '60px 20px 20px' }}>
        {/* Header */}
        <AnimateIn delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ fontFamily: hf, fontSize: 26, fontWeight: 700, color: '#2A2A3A' }}>Your Goals</div>
            <button style={{ width: 36, height: 36, borderRadius: 18, background: '#1C1C2E', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.12s' }}
              onPointerDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
              onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
              <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 3v10M3 8h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </AnimateIn>

        {/* Summary card */}
        <AnimateIn delay={80}>
          <div style={{ background: '#1C1C2E', borderRadius: 20, padding: '18px 20px', marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>Total saved</div>
                <div style={{ fontFamily: hf, fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 2 }}>{formatCurrency(totalSaved, false)}</div>
              </div>
              <div style={{ fontSize: 13, color: accent.primary, fontWeight: 600, background: accent.primary + '20', padding: '4px 10px', borderRadius: 10 }}>{totalPct}%</div>
            </div>
            <ProgressBar progress={totalPct} color={accent.primary} height={6} bgColor="rgba(255,255,255,0.1)" />
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>of {formatCurrency(totalTarget, false)} total goal</div>
          </div>
        </AnimateIn>

        {/* Goal cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {GOALS_DATA.map((goal, i) => (
            <GoalCard key={goal.id} goal={goal} tweaks={tweaks} delay={160 + i * 100} />
          ))}
        </div>

        {/* Bottom spacer for floating tab bar */}
        <div style={{ height: 70 }} />
      </div>
    </div>
  );
};

Object.assign(window, { GoalsPage });
