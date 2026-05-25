// Onboarding — conversational AI setup flow

const OB_FIXED = [
  { name: 'Rent / Mortgage', letter: 'R', color: '#B5A3DB' },
  { name: 'Car Payment', letter: 'C', color: '#7EB8E0' },
  { name: 'Insurance', letter: 'I', color: '#6DCAA8' },
  { name: 'Phone Bill', letter: 'P', color: '#E0899E' },
  { name: 'Internet / Utilities', letter: 'W', color: '#C8E450' },
  { name: 'Subscriptions', letter: 'S', color: '#E8A882' },
  { name: 'Student Loans', letter: 'L', color: '#8BC34A' },
];

const OB_FLEX = [
  { name: 'Food & Dining', letter: 'F', color: '#E8A882', pct: 20, desc: 'Groceries & eating out' },
  { name: 'Transport', letter: 'T', color: '#7EB8E0', pct: 12, desc: 'Gas, transit, rideshares' },
  { name: 'Shopping', letter: 'S', color: '#6DCAA8', pct: 10, desc: 'Clothing, household items' },
  { name: 'Entertainment', letter: 'E', color: '#E0899E', pct: 8, desc: 'Streaming, hobbies, fun' },
  { name: 'Health', letter: 'H', color: '#B5A3DB', pct: 8, desc: 'Gym, wellness, medical' },
  { name: 'Savings', letter: '$', color: '#8BC34A', pct: 30, desc: 'Emergency fund & goals' },
];

const ADD_CAT_COLORS = ['#B5A3DB', '#E8A882', '#7EB8E0', '#6DCAA8', '#E0899E', '#C8E450', '#8BC34A'];

/* ── Bank Connection Card ── */
const BankConnectCard = ({ accent, hf, onConnect, onSkip }) => {
  const [loading, setLoading] = React.useState(false);
  const [acted, setActed] = React.useState(false);

  const doConnect = () => {
    if (acted) return;
    setActed(true); setLoading(true);
    setTimeout(onConnect, 2000);
  };
  const doSkip = () => { if (acted) return; setActed(true); onSkip(); };

  return (
    <div style={{
      background: '#fff', borderRadius: 18, padding: 18, marginTop: 6,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12,
          background: `linear-gradient(135deg, ${accent.primary}20, ${accent.primary}40)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 1.5L3.5 4.5v4c0 4.5 2.8 8.7 6.5 10 3.7-1.3 6.5-5.5 6.5-10v-4L10 1.5z"
              stroke={accent.primary} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            <path d="M7.5 10.5l2 2 3-3.5" stroke={accent.primary} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: `'${hf}'`, fontSize: 14, fontWeight: 600, color: '#2A2A3A' }}>
            Secure Bank Connection
          </div>
          <div style={{ fontSize: 11, color: '#9A9AAA', marginTop: 1 }}>
            Powered by Plaid · 256-bit encryption
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {['Chase', 'BofA', 'Wells', 'Citi', '1,000+ more'].map((b, i) => (
          <div key={i} style={{
            padding: '6px 10px', borderRadius: 8, background: '#F7F5F0',
            fontSize: 11, fontWeight: 500, color: i === 4 ? '#9A9AAA' : '#6A6A7A',
            fontFamily: "'DM Sans'",
          }}>{b}</div>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
          <div style={{
            width: 28, height: 28, border: `3px solid ${accent.primary}30`,
            borderTopColor: accent.primary, borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto',
          }} />
          <div style={{ fontSize: 13, color: '#6A6A7A', marginTop: 10 }}>Connecting securely...</div>
        </div>
      ) : (
        <React.Fragment>
          <button onClick={doConnect} style={{
            width: '100%', height: 44, borderRadius: 14, border: 'none',
            background: accent.primary, color: accent.onPrimary,
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
            fontFamily: `'${hf}'`,
            boxShadow: `0 3px 12px ${accent.primary}35`,
            transition: 'transform 0.12s',
          }}
          onPointerDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
            Connect Bank Account
          </button>
          <button onClick={doSkip} style={{
            display: 'block', width: '100%', background: 'none', border: 'none',
            color: '#9A9AAA', fontSize: 13, fontWeight: 500, padding: '12px 0 4px',
            cursor: 'pointer', fontFamily: "'DM Sans'",
          }}>Skip — I'll enter manually</button>
        </React.Fragment>
      )}
    </div>
  );
};

/* ── Income Input Card ── */
const IncomeInputCard = ({ accent, hf, onSubmit }) => {
  const [val, setVal] = React.useState('');
  const parsed = parseInt(val) || 0;
  const display = parsed ? parsed.toLocaleString('en-US') : '';

  return (
    <div style={{
      background: '#fff', borderRadius: 18, padding: 18, marginTop: 6,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <div style={{ fontSize: 12, color: '#9A9AAA', fontWeight: 500, marginBottom: 10 }}>
        Monthly take-home pay
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 2, marginBottom: 16,
        borderBottom: `2px solid ${parsed ? accent.primary : '#E5E3DE'}`,
        paddingBottom: 8, transition: 'border-color 0.3s',
      }}>
        <span style={{ fontFamily: `'${hf}'`, fontSize: 32, fontWeight: 700, color: parsed ? '#2A2A3A' : '#D0D0D0' }}>$</span>
        <input value={display} onChange={e => setVal(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder="0" autoFocus inputMode="numeric"
          style={{
            flex: 1, fontSize: 32, fontWeight: 700, fontFamily: `'${hf}'`,
            border: 'none', outline: 'none', color: '#2A2A3A',
            background: 'transparent', padding: 0, minWidth: 0,
          }} />
      </div>
      <button onClick={() => parsed > 0 && onSubmit(parsed)} disabled={!parsed}
        style={{
          width: '100%', height: 44, borderRadius: 14, border: 'none',
          background: parsed ? accent.primary : '#E5E3DE',
          color: parsed ? accent.onPrimary : '#9A9AAA',
          fontSize: 14, fontWeight: 600,
          cursor: parsed ? 'pointer' : 'default',
          fontFamily: `'${hf}'`, transition: 'all 0.25s',
        }}
        onPointerDown={e => parsed && (e.currentTarget.style.transform = 'scale(0.97)')}
        onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
        Continue
      </button>
    </div>
  );
};

/* ── Fixed Expenses Card ── */
const FixedExpensesCard = ({ accent, hf, income, onSubmit }) => {
  const [items, setItems] = React.useState(
    OB_FIXED.map(f => ({ ...f, enabled: false, amount: '' }))
  );
  const [adding, setAdding] = React.useState(false);
  const [newName, setNewName] = React.useState('');

  const total = items.filter(e => e.enabled).reduce((s, e) => s + (parseInt(e.amount) || 0), 0);

  const toggle = i => setItems(p => p.map((e, j) =>
    j === i ? { ...e, enabled: !e.enabled } : e
  ));
  const setAmt = (i, v) => setItems(p => p.map((e, j) =>
    j === i ? { ...e, amount: v.replace(/[^0-9]/g, '') } : e
  ));

  const addCustom = () => {
    if (!newName.trim()) return;
    setItems(p => [...p, {
      name: newName.trim(),
      letter: newName.trim()[0].toUpperCase(),
      color: ADD_CAT_COLORS[p.length % ADD_CAT_COLORS.length],
      enabled: true, amount: '',
    }]);
    setNewName('');
    setAdding(false);
  };

  return (
    <div style={{
      background: '#fff', borderRadius: 18, padding: 16, marginTop: 6,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ fontFamily: `'${hf}'`, fontSize: 15, fontWeight: 600, color: '#2A2A3A' }}>
          Fixed Expenses
        </div>
        <div style={{ fontSize: 12, color: '#9A9AAA', fontWeight: 500 }}>
          {formatCurrency(income, false)}/mo income
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#9A9AAA', marginBottom: 12 }}>
        Toggle on bills that stay the same each month
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 8px', borderRadius: 12,
            background: item.enabled ? '#F7F5F0' : 'transparent',
            transition: 'all 0.25s',
          }}>
            <div onClick={() => toggle(i)} style={{
              width: 22, height: 22, borderRadius: 7, cursor: 'pointer',
              background: item.enabled ? item.color : 'transparent',
              border: item.enabled ? 'none' : '2px solid #D5D3CE',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', flexShrink: 0,
            }}>
              {item.enabled && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 6l2.5 2.5L9.5 4" stroke="#fff" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>

            <div style={{
              flex: 1, fontSize: 13, fontWeight: 500,
              color: item.enabled ? '#2A2A3A' : '#9A9AAA',
              transition: 'color 0.2s',
            }}>
              {item.name}
            </div>

            {item.enabled && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#9A9AAA' }}>$</span>
                <input value={item.amount ? parseInt(item.amount).toLocaleString('en-US') : ''}
                  onChange={e => setAmt(i, e.target.value)}
                  placeholder="0" inputMode="numeric"
                  style={{
                    width: 56, fontSize: 14, fontWeight: 600, fontFamily: `'${hf}'`,
                    border: 'none', outline: 'none', color: '#2A2A3A',
                    background: 'transparent', padding: '4px 0',
                    borderBottom: `1.5px solid ${accent.primary}40`,
                    textAlign: 'right',
                  }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add expense */}
      {adding ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginTop: 8,
          padding: '6px 8px', background: '#F7F5F0', borderRadius: 12,
        }}>
          <input value={newName} onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustom()}
            placeholder="Expense name" autoFocus
            style={{
              flex: 1, fontSize: 13, border: 'none', outline: 'none',
              padding: '6px 0', fontFamily: "'DM Sans'",
              color: '#2A2A3A', background: 'transparent',
            }} />
          <button onClick={addCustom} disabled={!newName.trim()} style={{
            padding: '5px 12px', borderRadius: 8, border: 'none',
            background: newName.trim() ? accent.primary : '#E5E3DE',
            color: newName.trim() ? accent.onPrimary : '#9A9AAA',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>Add</button>
          <button onClick={() => { setAdding(false); setNewName(''); }} style={{
            width: 26, height: 26, borderRadius: 8, border: 'none',
            background: '#E5E3DE', color: '#6A6A7A', fontSize: 13,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', lineHeight: 1,
          }}>✕</button>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} style={{
          width: '100%', marginTop: 8, padding: '9px', borderRadius: 12,
          border: `1.5px dashed ${accent.primary}50`, background: accent.bg + '80',
          fontSize: 12, fontWeight: 600, color: accent.onPrimary,
          cursor: 'pointer', fontFamily: "'DM Sans'",
          transition: 'transform 0.12s',
        }}
        onPointerDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
        onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
          + Add Expense
        </button>
      )}

      {/* Total summary */}
      {total > 0 && (
        <div style={{
          marginTop: 10, padding: '8px 10px', background: '#F7F5F0',
          borderRadius: 10, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: '#6A6A7A' }}>
            Fixed total · {formatCurrency(income - total, false)} remaining
          </span>
          <span style={{ fontFamily: `'${hf}'`, fontSize: 15, fontWeight: 600, color: '#2A2A3A' }}>
            {formatCurrency(total, false)}
          </span>
        </div>
      )}

      <button onClick={() => onSubmit(total)} style={{
        width: '100%', height: 44, borderRadius: 14, border: 'none',
        background: accent.primary, color: accent.onPrimary,
        fontSize: 14, fontWeight: 600, cursor: 'pointer',
        fontFamily: `'${hf}'`, marginTop: 12,
        boxShadow: `0 3px 12px ${accent.primary}35`,
        transition: 'transform 0.12s',
      }}
      onPointerDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
      onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
        Continue
      </button>
    </div>
  );
};

/* ── Allocation Card ── */
const AllocationCard = ({ accent, hf, flexIncome, onComplete }) => {
  const [cats, setCats] = React.useState(
    OB_FLEX.map(c => ({
      ...c, enabled: true,
      amount: Math.round(flexIncome * c.pct / 100 / 50) * 50,
    }))
  );
  const [adding, setAdding] = React.useState(false);
  const [newName, setNewName] = React.useState('');

  const total = cats.filter(c => c.enabled).reduce((s, c) => s + c.amount, 0);
  const remaining = flexIncome - total;
  const pctUsed = Math.min(100, (total / flexIncome) * 100);
  const toggle = i => setCats(p => p.map((c, j) => j === i ? { ...c, enabled: !c.enabled } : c));
  const adjust = (i, d) => setCats(p => p.map((c, j) => j === i ? { ...c, amount: Math.max(0, c.amount + d) } : c));

  const addCategory = () => {
    if (!newName.trim()) return;
    setCats(p => [...p, {
      name: newName.trim(),
      letter: newName.trim()[0].toUpperCase(),
      color: ADD_CAT_COLORS[p.length % ADD_CAT_COLORS.length],
      enabled: true, amount: 100, desc: 'Custom category',
    }]);
    setNewName('');
    setAdding(false);
  };

  const stepBtnStyle = {
    width: 26, height: 26, borderRadius: 8,
    border: '1.5px solid #E5E3DE', background: '#fff',
    cursor: 'pointer', fontSize: 16, color: '#6A6A7A',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    lineHeight: 1, padding: 0,
  };

  return (
    <div style={{
      background: '#fff', borderRadius: 18, padding: 16, marginTop: 6,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ fontFamily: `'${hf}'`, fontSize: 15, fontWeight: 600, color: '#2A2A3A' }}>
          Flexible Spending
        </div>
        <div style={{ fontSize: 12, color: '#9A9AAA', fontWeight: 500 }}>
          {formatCurrency(flexIncome, false)} available
        </div>
      </div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '4px 10px 4px 7px', background: accent.bg,
        borderRadius: 20, marginBottom: 12,
      }}>
        <span style={{ fontSize: 12 }}>✨</span>
        <span style={{ fontSize: 11, fontWeight: 500, color: '#6A6A7A' }}>
          AI-suggested amounts
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {cats.map((cat, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 8px', borderRadius: 12,
            background: cat.enabled ? '#F7F5F0' : 'transparent',
            opacity: cat.enabled ? 1 : 0.4,
            transition: 'all 0.25s',
          }}>
            <div onClick={() => toggle(i)} style={{
              width: 22, height: 22, borderRadius: 7, cursor: 'pointer',
              background: cat.enabled ? cat.color : 'transparent',
              border: cat.enabled ? 'none' : '2px solid #D5D3CE',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', flexShrink: 0,
            }}>
              {cat.enabled && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 6l2.5 2.5L9.5 4" stroke="#fff" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#2A2A3A', lineHeight: 1.2 }}>{cat.name}</div>
              <div style={{ fontSize: 10, color: '#AAAABC', lineHeight: 1.3 }}>{cat.desc}</div>
            </div>

            {cat.enabled && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                <button onClick={() => adjust(i, -50)} style={stepBtnStyle}>−</button>
                <span style={{
                  fontFamily: `'${hf}'`, fontSize: 13, fontWeight: 600,
                  color: '#2A2A3A', minWidth: 48, textAlign: 'center',
                }}>{formatCurrency(cat.amount, false)}</span>
                <button onClick={() => adjust(i, 50)} style={stepBtnStyle}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add category */}
      {adding ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginTop: 8,
          padding: '6px 8px', background: '#F7F5F0', borderRadius: 12,
        }}>
          <input value={newName} onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCategory()}
            placeholder="Category name" autoFocus
            style={{
              flex: 1, fontSize: 13, border: 'none', outline: 'none',
              padding: '6px 0', fontFamily: "'DM Sans'",
              color: '#2A2A3A', background: 'transparent',
            }} />
          <button onClick={addCategory} disabled={!newName.trim()} style={{
            padding: '5px 12px', borderRadius: 8, border: 'none',
            background: newName.trim() ? accent.primary : '#E5E3DE',
            color: newName.trim() ? accent.onPrimary : '#9A9AAA',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>Add</button>
          <button onClick={() => { setAdding(false); setNewName(''); }} style={{
            width: 26, height: 26, borderRadius: 8, border: 'none',
            background: '#E5E3DE', color: '#6A6A7A', fontSize: 13,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', lineHeight: 1,
          }}>✕</button>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} style={{
          width: '100%', marginTop: 8, padding: '9px', borderRadius: 12,
          border: `1.5px dashed ${accent.primary}50`, background: accent.bg + '80',
          fontSize: 12, fontWeight: 600, color: accent.onPrimary,
          cursor: 'pointer', fontFamily: "'DM Sans'",
          transition: 'transform 0.12s',
        }}
        onPointerDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
        onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
          + Add Category
        </button>
      )}

      {/* Total bar */}
      <div style={{ marginTop: 12, padding: '6px 0 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
          <span style={{ color: '#9A9AAA' }}>
            {remaining >= 0
              ? `${formatCurrency(remaining, false)} unallocated`
              : `${formatCurrency(-remaining, false)} over budget`}
          </span>
          <span style={{ fontWeight: 600, color: remaining >= 0 ? '#2A2A3A' : '#D32F2F' }}>
            {formatCurrency(total, false)}
          </span>
        </div>
        <ProgressBar progress={pctUsed} color={remaining >= 0 ? accent.primary : '#D32F2F'} height={5} />
      </div>

      <button onClick={onComplete} style={{
        width: '100%', height: 44, borderRadius: 14, border: 'none',
        background: accent.primary, color: accent.onPrimary,
        fontSize: 14, fontWeight: 600, cursor: 'pointer',
        fontFamily: `'${hf}'`, marginTop: 12,
        boxShadow: `0 3px 12px ${accent.primary}35`,
        transition: 'transform 0.12s',
      }}
      onPointerDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
      onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
        Set My Budget
      </button>
    </div>
  );
};

/* ── Completion Card ── */
const CompletionCard = ({ accent, hf, onGo }) => (
  <div style={{
    background: '#fff', borderRadius: 18, padding: 20, marginTop: 6,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center',
  }}>
    <div style={{
      width: 52, height: 52, borderRadius: '50%',
      background: accent.primary + '20', margin: '0 auto 12px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'checkPop 0.5s cubic-bezier(0.22,1,0.36,1) both',
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 12l4.5 4.5L18 8" stroke={accent.primary} strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div style={{ fontFamily: `'${hf}'`, fontSize: 18, fontWeight: 700, color: '#2A2A3A', marginBottom: 4 }}>
      Budget Created!
    </div>
    <div style={{ fontSize: 13, color: '#9A9AAA', lineHeight: 1.5, marginBottom: 16 }}>
      I'll track your spending, send daily check-ins, and flag anything unusual.
    </div>
    <button onClick={onGo} style={{
      width: '100%', height: 46, borderRadius: 14, border: 'none',
      background: '#1C1C2E', color: '#fff',
      fontSize: 15, fontWeight: 600, cursor: 'pointer',
      fontFamily: `'${hf}'`, transition: 'transform 0.12s',
    }}
    onPointerDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
    onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
      Let's Go →
    </button>
  </div>
);

/* ── Main Onboarding Page ── */
const OnboardingPage = ({ tweaks, onComplete }) => {
  const hf = tweaks?.headingFont || 'Space Grotesk';
  const bs = tweaks?.chatBubbleStyle || 'cards';
  const accent = ACCENT_THEMES[tweaks?.accent || 'Lime'];

  const [msgs, setMsgs] = React.useState([]);
  const [typing, setTyping] = React.useState(false);
  const [income, setIncome] = React.useState(0);
  const [fixedTotal, setFixedTotal] = React.useState(0);
  const [phase, setPhase] = React.useState(0);
  const scrollRef = React.useRef(null);
  const ran = React.useRef(false);

  // Auto-scroll on new messages
  React.useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => { scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, 60);
    }
  }, [msgs, typing]);

  // Queue an AI message with typing indicator
  const q = (msg, ms) => new Promise(r => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(p => [...p, { id: Date.now() + Math.random(), ...msg }]);
      setTimeout(r, 120);
    }, ms);
  });

  const addCard = card => setMsgs(p => [...p, { id: 'card-' + card, from: 'card', card }]);
  const removeCard = card => setMsgs(p => p.filter(m => m.card !== card));
  const addUser = text => setMsgs(p => [...p, { id: Date.now() + Math.random(), from: 'user', text }]);

  // Intro sequence
  React.useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    (async () => {
      await q({ from: 'ai', text: "Hey there! 👋 I'm BudgetBuddy — your personal AI finance coach." }, 600);
      await q({ from: 'ai', text: "I can help you track spending, set savings goals, crush debt, and make smarter money moves. All through simple conversations like this one." }, 1200);
      await q({ from: 'ai', text: "Let's get you set up! Would you like to connect your bank account? It's quick, secure through Plaid, and lets me track everything automatically." }, 1000);
      addCard('bank');
      setPhase(1);
    })();
  }, []);

  /* ── Handlers ── */
  const handleBankConnect = async () => {
    removeCard('bank');
    addUser('Connect my bank account');
    await q({
      from: 'ai',
      text: "Connected! 🏦 I found 2 accounts — Checking (····4821) and Savings (····7392). Based on your deposits, your monthly take-home is about $4,200.",
    }, 1400);
    setIncome(4200);
    await q({ from: 'ai', text: "Now let's log your fixed monthly expenses — rent, bills, subscriptions — the things you pay no matter what:" }, 900);
    addCard('expenses');
    setPhase(2);
  };

  const handleSkip = async () => {
    removeCard('bank');
    addUser("I'll enter it manually");
    await q({ from: 'ai', text: "No problem! What's your monthly take-home pay after taxes?" }, 900);
    addCard('income');
  };

  const handleIncome = async (val) => {
    removeCard('income');
    addUser(`My monthly income is ${formatCurrency(val, false)}`);
    setIncome(val);
    await q({ from: 'ai', text: `${formatCurrency(val, false)}/month — got it! Now let's log your fixed expenses — rent, bills, subscriptions — the things you pay no matter what:` }, 900);
    addCard('expenses');
    setPhase(2);
  };

  const handleExpenses = async (total) => {
    removeCard('expenses');
    setFixedTotal(total);
    const flex = income - total;
    if (total > 0) {
      addUser(`My fixed expenses are ${formatCurrency(total, false)}/mo`);
      await q({ from: 'ai', text: `Got it — ${formatCurrency(total, false)} in fixed costs leaves you ${formatCurrency(flex, false)} for flexible spending. Here's how I'd split it:` }, 900);
    } else {
      addUser("No fixed expenses to add");
      await q({ from: 'ai', text: `Alright! That means your full ${formatCurrency(flex, false)} is flexible. Here's how I'd suggest splitting it:` }, 900);
    }
    addCard('allocations');
    setPhase(3);
  };

  const handleAllocations = async () => {
    removeCard('allocations');
    addUser("Looks good — set my budget!");
    await q({ from: 'ai', text: "You're all set! 🎉 Your budget is locked in and I'm ready to start tracking. I'll send you daily check-ins and flag anything unusual." }, 1200);
    addCard('complete');
    setPhase(4);
  };

  /* ── Bubble style (matches chat-page) ── */
  const bub = (from) => {
    if (from === 'user') return {
      background: '#1C1C2E', color: '#fff',
      borderRadius: '20px 20px 6px 20px', padding: '12px 16px',
      maxWidth: '82%', alignSelf: 'flex-end',
    };
    const base = {
      borderRadius: '20px 20px 20px 6px', padding: '13px 16px',
      maxWidth: '86%', alignSelf: 'flex-start',
    };
    if (bs === 'minimal') return { ...base, background: '#EEECE7', color: '#2A2A3A' };
    if (bs === 'glass') return {
      ...base, background: 'rgba(255,255,255,0.65)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      color: '#2A2A3A', border: '1px solid rgba(255,255,255,0.5)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
    };
    return { ...base, background: '#fff', color: '#2A2A3A', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' };
  };

  /* ── Card renderer ── */
  const renderCard = card => {
    const props = { accent, hf };
    switch (card) {
      case 'bank': return <BankConnectCard {...props} onConnect={handleBankConnect} onSkip={handleSkip} />;
      case 'income': return <IncomeInputCard {...props} onSubmit={handleIncome} />;
      case 'expenses': return <FixedExpensesCard {...props} income={income} onSubmit={handleExpenses} />;
      case 'allocations': return <AllocationCard {...props} flexIncome={income - fixedTotal} onComplete={handleAllocations} />;
      case 'complete': return <CompletionCard {...props} onGo={onComplete} />;
      default: return null;
    }
  };

  /* ── Progress bar ── */
  const progress = [10, 25, 50, 75, 100][phase];
  const phaseLabel = ['Getting started', 'Connect', 'Fixed expenses', 'Build your budget', 'All set!'][phase];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F5F0' }}>
      {/* Header */}
      <div style={{
        background: '#1C1C2E', borderRadius: '0 0 24px 24px', flexShrink: 0,
        padding: '56px 20px 14px', boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <img src="uploads/budget_buddy.png" alt="" style={{ width: 26, height: 26, objectFit: 'contain' }} />
            <span style={{ fontFamily: `'${hf}'`, fontSize: 17, fontWeight: 600, color: '#fff' }}>
              BudgetBuddy
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{phaseLabel}</div>
        </div>
        <div style={{
          marginTop: 12, height: 3, borderRadius: 2,
          background: 'rgba(255,255,255,0.1)', overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`, height: '100%', borderRadius: 2,
            background: accent.primary,
            transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
          }} />
        </div>
      </div>

      {/* Chat area */}
      <div ref={scrollRef} style={{
        flex: 1, overflow: 'auto', padding: '14px 14px 24px',
        display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0,
      }}>
        {msgs.map((msg, i) => {
          /* Card messages — indented to align with AI text */
          if (msg.from === 'card') {
            return (
              <div key={msg.id} style={{ paddingLeft: 44, animation: 'pageIn 0.35s ease' }}>
                {renderCard(msg.card)}
              </div>
            );
          }

          /* Text messages */
          return (
            <div key={msg.id} style={{
              display: 'flex',
              flexDirection: msg.from === 'ai' ? 'row' : 'column',
              alignItems: msg.from === 'user' ? 'flex-end' : 'flex-start',
              gap: msg.from === 'ai' ? 8 : 0,
              animation: 'pageIn 0.35s ease',
            }}>
              {msg.from === 'ai' && (
                <img src="uploads/budget_buddy.png" alt="" style={{
                  width: 36, height: 36, objectFit: 'contain', flexShrink: 0,
                  marginTop: 2, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }} />
              )}
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: msg.from === 'user' ? 'flex-end' : 'flex-start',
                minWidth: 0, flex: 1,
              }}>
                {msg.from === 'ai' && (
                  <span style={{ fontSize: 11, color: '#9A9AAA', fontWeight: 500, marginBottom: 3 }}>
                    BudgetBuddy
                  </span>
                )}
                <div style={{
                  ...bub(msg.from),
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13.5, lineHeight: 1.55,
                }}>
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {typing && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <img src="uploads/budget_buddy.png" alt="" style={{
              width: 36, height: 36, objectFit: 'contain', flexShrink: 0,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }} />
            <div style={{ ...bub('ai'), display: 'flex', gap: 4, padding: '12px 18px' }}>
              {[0, 1, 2].map(j => (
                <div key={j} style={{
                  width: 6, height: 6, borderRadius: 3, background: '#9A9AAA',
                  animation: `typingBounce 1.2s infinite ${j * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { OnboardingPage });
