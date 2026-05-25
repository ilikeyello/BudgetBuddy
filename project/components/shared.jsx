// Shared UI components for BudgetBuddy

const formatCurrency = (amount, showCents) => {
  const opts = { style: 'currency', currency: 'USD' };
  if (showCents === false || Number.isInteger(amount)) {
    opts.minimumFractionDigits = 0;
    opts.maximumFractionDigits = 0;
  }
  return new Intl.NumberFormat('en-US', opts).format(amount);
};

const ProgressRing = ({ progress, size = 80, strokeWidth = 6, color = '#C8E450', bgColor = '#EEECE7', children, delay = 0 }) => {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setVal(progress), 80 + delay);
    return () => clearTimeout(t);
  }, [progress, delay]);
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={circ - (val / 100) * circ} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1)' }} />
      </svg>
      {children && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>}
    </div>
  );
};

const ProgressBar = ({ progress, color = '#C8E450', height = 8, delay = 0, bgColor = '#EEECE7' }) => {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setW(Math.min(progress, 100)), 80 + delay);
    return () => clearTimeout(t);
  }, [progress, delay]);
  return (
    <div style={{ width: '100%', height, borderRadius: height, background: bgColor, overflow: 'hidden' }}>
      <div style={{ width: `${w}%`, height: '100%', borderRadius: height, background: color,
        transition: 'width 1s cubic-bezier(0.4,0,0.2,1)' }} />
    </div>
  );
};

const DonutChart = ({ segments, size = 160, strokeWidth = 18, children }) => {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const [on, setOn] = React.useState(false);
  React.useEffect(() => { setTimeout(() => setOn(true), 200); }, []);
  let rot = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEECE7" strokeWidth={strokeWidth} />
        {segments.map((s, i) => {
          const len = (s.percent / 100) * circ;
          const gap = circ - len + 2;
          const thisRot = rot;
          rot += (s.percent / 100) * 360;
          return (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke={s.color} strokeWidth={strokeWidth - 1}
              strokeDasharray={`${on ? len : 0} ${on ? gap : circ}`}
              strokeLinecap="butt"
              style={{
                transform: `rotate(${thisRot - 90}deg)`, transformOrigin: 'center',
                transition: `stroke-dasharray 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
              }} />
          );
        })}
      </svg>
      {children && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>{children}</div>}
    </div>
  );
};

const AnimateIn = ({ children, delay = 0, y = 14, style = {} }) => {
  const [v, setV] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{
      opacity: v ? 1 : 0,
      transform: v ? 'none' : `translateY(${y}px)`,
      transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
      ...style,
    }}>{children}</div>
  );
};

const CategoryIcon = ({ letter, color, size = 36 }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.28,
    background: color + '25', color: color,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.42, fontWeight: 700, flexShrink: 0,
    fontFamily: "'Space Grotesk', sans-serif",
  }}>{letter}</div>
);

Object.assign(window, { ProgressRing, ProgressBar, DonutChart, AnimateIn, formatCurrency, CategoryIcon });
