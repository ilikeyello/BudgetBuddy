// Debts page — debt cards, payoff strategy, AI tips

const DebtCard = ({ debt, tweaks, delay = 0 }) => {
  const hf = tweaks?.headingFont || 'Space Grotesk';
  const paidOff = debt.originalBalance - debt.currentBalance;
  const paidPct = Math.round((paidOff / debt.originalBalance) * 100);
  const isHighPriority = debt.priority === 1;
  const accent = ACCENT_THEMES[tweaks?.accent || 'Lime'];

  return (
    <AnimateIn delay={delay} y={16}>
      <div style={{
        background: '#fff', borderRadius: 20, padding: '18px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
        border: isHighPriority ? `2px solid ${accent.primary}` : '2px solid transparent',
        position: 'relative', overflow: 'hidden',
      }}>
        {isHighPriority && (
          <div style={{
            position: 'absolute', top: 12, right: -24, background: accent.primary, color: accent.onPrimary,
            fontSize: 9, fontWeight: 700, padding: '3px 30px', transform: 'rotate(45deg)',
            textTransform: 'uppercase', letterSpacing: 0.5,
          }}>Priority</div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <CategoryIcon letter={debt.letter} color={debt.color} size={40} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: hf, fontSize: 16, fontWeight: 600, color: '#2A2A3A' }}>{debt.name}</div>
            <div style={{ fontSize: 12, color: '#E0899E', fontWeight: 600, marginTop: 1 }}>{debt.apr}% APR</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: hf, fontSize: 20, fontWeight: 700, color: '#2A2A3A' }}>{formatCurrency(debt.currentBalance, false)}</div>
            <div style={{ fontSize: 11, color: '#8A8A9A' }}>remaining</div>
          </div>
        </div>

        <ProgressBar progress={paidPct} color={debt.color} height={6} delay={delay} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 11, color: '#8A8A9A' }}>{paidPct}% paid off</span>
          <span style={{ fontSize: 11, color: '#8A8A9A' }}>{formatCurrency(debt.originalBalance, false)} original</span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <div style={{ flex: 1, background: '#EEECE7', borderRadius: 12, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#8A8A9A', fontWeight: 500 }}>Min Payment</div>
            <div style={{ fontFamily: hf, fontSize: 16, fontWeight: 600, color: '#2A2A3A', marginTop: 2 }}>{formatCurrency(debt.minPayment, false)}<span style={{ fontSize: 11, color: '#8A8A9A', fontWeight: 400 }}>/mo</span></div>
          </div>
          {debt.recommendedPayment !== debt.minPayment && (
            <div style={{ flex: 1, background: accent.bg, borderRadius: 12, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: accent.onPrimary, fontWeight: 500 }}>Recommended</div>
              <div style={{ fontFamily: hf, fontSize: 16, fontWeight: 600, color: '#2A2A3A', marginTop: 2 }}>{formatCurrency(debt.recommendedPayment, false)}<span style={{ fontSize: 11, color: '#8A8A9A', fontWeight: 400 }}>/mo</span></div>
            </div>
          )}
        </div>
      </div>
    </AnimateIn>
  );
};

const DebtsPage = ({ tweaks }) => {
  const hf = tweaks?.headingFont || 'Space Grotesk';
  const accent = ACCENT_THEMES[tweaks?.accent || 'Lime'];
  const totalDebt = DEBTS_DATA.reduce((s, d) => s + d.currentBalance, 0);
  const totalOriginal = DEBTS_DATA.reduce((s, d) => s + d.originalBalance, 0);
  const totalPaid = totalOriginal - totalDebt;
  const paidPct = Math.round((totalPaid / totalOriginal) * 100);
  const [showStrategy, setShowStrategy] = React.useState(false);

  const sorted = [...DEBTS_DATA].sort((a, b) => a.priority - b.priority);

  return (
    <div style={{ height: '100%', overflow: 'auto', background: '#F7F5F0' }}>
      <div style={{ padding: '60px 20px 20px' }}>
        {/* Header */}
        <AnimateIn delay={0}>
          <div style={{ fontFamily: hf, fontSize: 26, fontWeight: 700, color: '#2A2A3A', marginBottom: 18 }}>Your Debts</div>
        </AnimateIn>

        {/* Total summary */}
        <AnimateIn delay={80}>
          <div style={{ background: '#1C1C2E', borderRadius: 20, padding: '18px 20px', marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>Total remaining</div>
                <div style={{ fontFamily: hf, fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 2 }}>{formatCurrency(totalDebt, false)}</div>
              </div>
              <div style={{ fontSize: 13, color: accent.primary, fontWeight: 600, background: accent.primary + '20', padding: '4px 10px', borderRadius: 10 }}>{paidPct}% paid</div>
            </div>
            <ProgressBar progress={paidPct} color={accent.primary} height={6} bgColor="rgba(255,255,255,0.1)" />
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>Monthly total: {formatCurrency(DEBTS_DATA.reduce((s, d) => s + d.minPayment, 0), false)}/mo minimum</div>
          </div>
        </AnimateIn>

        {/* AI Strategy card */}
        <AnimateIn delay={160}>
          <div onClick={() => setShowStrategy(!showStrategy)}
            style={{ background: accent.bg, borderRadius: 20, padding: '16px 18px', marginBottom: 18, cursor: 'pointer', border: `1.5px solid ${accent.primary}30`, transition: 'transform 0.2s' }}
            onPointerDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <img src="uploads/budget_buddy.png" alt="" style={{ width: 30, height: 30, objectFit: 'contain', flexShrink: 0 }} />
              <div style={{ fontFamily: hf, fontSize: 15, fontWeight: 600, color: '#2A2A3A' }}>Smart Payoff Plan</div>
            </div>
            <div style={{ fontSize: 13, color: '#4A4A5A', lineHeight: 1.5 }}>
              Using the <strong>avalanche method</strong> (highest interest first) could save you <strong style={{ color: accent.onPrimary }}>$3,240</strong> in interest.
            </div>
            <div style={{
              display: 'grid',
              gridTemplateRows: showStrategy ? '1fr' : '0fr',
              transition: 'grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {/* Strategy comparison */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: '12px', textAlign: 'center', border: `2px solid ${accent.primary}` }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: accent.onPrimary, textTransform: 'uppercase', letterSpacing: 0.5 }}>Avalanche</div>
                      <div style={{ fontFamily: hf, fontSize: 16, fontWeight: 700, color: '#2A2A3A', marginTop: 4 }}>Mar 2029</div>
                      <div style={{ fontSize: 11, color: '#6DCAA8', fontWeight: 600, marginTop: 2 }}>Save $3,240</div>
                    </div>
                    <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#8A8A9A', textTransform: 'uppercase', letterSpacing: 0.5 }}>Snowball</div>
                      <div style={{ fontFamily: hf, fontSize: 16, fontWeight: 700, color: '#2A2A3A', marginTop: 4 }}>Jun 2029</div>
                      <div style={{ fontSize: 11, color: '#8A8A9A', fontWeight: 500, marginTop: 2 }}>Save $1,890</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: '#6A6A7A', lineHeight: 1.5 }}>
                    <strong>Avalanche:</strong> Pay minimums on everything, put extra toward highest-interest debt first. Saves the most money.
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10, gap: 4 }}>
              <span style={{ fontSize: 11, color: accent.onPrimary, fontWeight: 500 }}>{showStrategy ? 'Less' : 'See full plan'}</span>
              <svg width="12" height="7" viewBox="0 0 12 7" style={{ transform: showStrategy ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                <path d="M2 2l4 3 4-3" stroke={accent.onPrimary} strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </AnimateIn>

        {/* Priority order label */}
        <AnimateIn delay={240}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#2A2A3A', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Priority Order</span>
            <div style={{ flex: 1, height: 1, background: '#E5E3DE' }}></div>
          </div>
        </AnimateIn>

        {/* Debt cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {sorted.map((debt, i) => (
            <DebtCard key={debt.id} debt={debt} tweaks={tweaks} delay={300 + i * 100} />
          ))}
        </div>

        <div style={{ height: 70 }} />
      </div>
    </div>
  );
};

Object.assign(window, { DebtsPage });
