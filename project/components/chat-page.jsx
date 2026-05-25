// Chat page — AI assistant + budget header + pull-down budget panel

const BudgetPanelContent = ({ tweaks, innerRef }) => {
  const d = BUDGET_DATA;
  const hf = tweaks?.headingFont || 'Space Grotesk';
  const accent = ACCENT_THEMES[tweaks?.accent || 'Lime'];
  const totalAlloc = d.categories.reduce((s, c) => s + c.allocated, 0);
  const segs = d.categories.map(c => ({ percent: (c.allocated / totalAlloc) * 100, color: c.color, name: c.name }));

  return (
    <div ref={innerRef} style={{ padding: '4px 20px 24px' }}>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 0 16px' }} />
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontFamily: hf, fontSize: 20, fontWeight: 700, color: '#fff' }}>{d.month} Budget</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{d.daysLeft} days remaining</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <DonutChart segments={segs} size={150} strokeWidth={16}>
          <div style={{ fontFamily: hf, fontSize: 26, fontWeight: 700, color: '#fff' }}>{formatCurrency(d.remaining, false)}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: -2 }}>remaining</div>
        </DonutChart>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <div style={{ flex: 1, background: accent.primary + '22', borderRadius: 14, padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Income</div>
          <div style={{ fontFamily: hf, fontSize: 20, fontWeight: 700, color: accent.primary, marginTop: 2 }}>{formatCurrency(d.monthlyIncome, false)}</div>
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: '12px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Spent</div>
          <div style={{ fontFamily: hf, fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 2 }}>{formatCurrency(d.totalSpent, false)}</div>
        </div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Allocations</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {d.categories.map((cat, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: cat.color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: cat.color, flexShrink: 0, fontFamily: "'Space Grotesk'" }}>{cat.letter}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{cat.name}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{formatCurrency(cat.spent, false)} / {formatCurrency(cat.allocated, false)}</span>
              </div>
              <ProgressBar progress={(cat.spent / cat.allocated) * 100} color={cat.color} height={5} delay={i * 60} bgColor="rgba(255,255,255,0.08)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatPage = ({ tweaks, onGoalsNavigate }) => {
  const [messages, setMessages] = React.useState(CHAT_MESSAGES);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [panelOpen, setPanelOpen] = React.useState(false);

  // Gesture / Drag States & Refs
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragY, setDragY] = React.useState(0);
  const [contentHeight, setContentHeight] = React.useState(580);

  const chatRef = React.useRef(null);
  const respIdx = React.useRef(0);
  const contentRef = React.useRef(null);
  const startDragY = React.useRef(0);
  const startDragHeight = React.useRef(0);
  const hasMoved = React.useRef(false);

  const hf = tweaks?.headingFont || 'Space Grotesk';
  const bs = tweaks?.chatBubbleStyle || 'cards';
  const accent = ACCENT_THEMES[tweaks?.accent || 'Lime'];

  // Dynamically measure the budget details content height
  React.useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      if (height > 0) {
        setContentHeight(height);
      }
    }
  }, [tweaks]);

  React.useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    setMessages(p => [...p, { id: Date.now(), type: 'user', text: text.trim(), time: now }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = AI_RESPONSES[respIdx.current % AI_RESPONSES.length];
      respIdx.current++;
      setMessages(p => [...p, { id: Date.now() + 1, type: 'ai', text: reply, time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) }]);
    }, 1400);
  };

  const handleAction = (a) => { if (a === 'Show my goal') { onGoalsNavigate?.(); return; } sendMessage(a); };

  // Pointer drag event handlers
  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    hasMoved.current = false;
    startDragY.current = e.clientY;
    startDragHeight.current = panelOpen ? contentHeight : 0;
    setDragY(panelOpen ? contentHeight : 0);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startDragY.current;
    if (Math.abs(deltaY) > 4) {
      hasMoved.current = true;
    }
    let newHeight = startDragHeight.current + deltaY;
    newHeight = Math.max(0, Math.min(newHeight, contentHeight));
    setDragY(newHeight);
  };

  const onPointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    if (!hasMoved.current) {
      setPanelOpen(!panelOpen);
    } else {
      if (dragY > contentHeight * 0.4) {
        setPanelOpen(true);
      } else {
        setPanelOpen(false);
      }
    }
  };

  const onPointerCancel = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  const d = BUDGET_DATA;
  const spentPct = Math.round((d.totalSpent / d.totalBudget) * 100);

  const bubbleStyle = (type) => {
    if (type === 'user') return { background: '#1C1C2E', color: '#fff', borderRadius: '20px 20px 6px 20px', padding: '12px 16px', maxWidth: '82%', alignSelf: 'flex-end' };
    const base = { borderRadius: '20px 20px 20px 6px', padding: '13px 16px', maxWidth: '86%', alignSelf: 'flex-start' };
    if (bs === 'minimal') return { ...base, background: '#EEECE7', color: '#2A2A3A' };
    if (bs === 'glass') return { ...base, background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#2A2A3A', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' };
    return { ...base, background: '#fff', color: '#2A2A3A', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' };
  };

  const currentHeight = isDragging ? dragY : (panelOpen ? contentHeight : 0);
  const rotation = contentHeight > 0 ? (currentHeight / contentHeight) * 180 : (panelOpen ? 180 : 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F5F0', position: 'relative' }}>
      {/* Backdrop overlay for dimming and blur */}
      <div 
        onClick={() => setPanelOpen(false)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          zIndex: 30,
          opacity: contentHeight > 0 ? currentHeight / contentHeight : 0,
          pointerEvents: currentHeight > 20 ? 'auto' : 'none',
          transition: isDragging ? 'none' : 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />

      {/* Budget Card — stretches when panel opens */}
      <div style={{ background: '#1C1C2E', borderRadius: '0 0 24px 24px', flexShrink: 0, position: 'relative', zIndex: 40, boxShadow: '0 8px 30px rgba(0,0,0,0.18)', transition: 'box-shadow 0.4s' }}>
        {/* Header */}
        <div 
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          style={{ padding: '56px 20px 16px', cursor: 'pointer', touchAction: 'none', userSelect: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>Remaining this month</div>
              <div style={{ fontFamily: hf, fontSize: 34, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>{formatCurrency(d.remaining, false)}</div>
            </div>
            <ProgressRing progress={100 - spentPct} size={52} strokeWidth={5} color={accent.primary} bgColor="rgba(255,255,255,0.12)">
              <span style={{ fontSize: 11, fontWeight: 700, color: accent.primary }}>{100 - spentPct}%</span>
            </ProgressRing>
          </div>
        </div>

        {/* Panel reveal — same dark bg, card stretches */}
        <div style={{ 
          height: currentHeight, 
          overflow: 'hidden', 
          transition: isDragging ? 'none' : 'height 0.45s cubic-bezier(0.16, 1, 0.3, 1)' 
        }}>
          <div style={{ overflow: 'hidden' }}>
            <BudgetPanelContent tweaks={tweaks} innerRef={contentRef} />
          </div>
        </div>

        {/* Chevron — always at bottom of card */}
        <div 
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 12px', cursor: 'pointer', touchAction: 'none' }}
        >
          <svg 
            width="16" 
            height="9" 
            viewBox="0 0 16 9" 
            style={{ 
              transform: `rotate(${rotation}deg)`, 
              transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' 
            }}
          >
            <path d="M2 2l6 5 6-5" stroke="rgba(255,255,255,0.35)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Chat messages */}
      <div ref={chatRef} style={{ flex: 1, overflow: 'auto', padding: '14px 14px 6px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
        {messages.map((msg, i) => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: msg.type === 'ai' ? 'row' : 'column', alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start', gap: msg.type === 'ai' ? 8 : 0, animation: i >= CHAT_MESSAGES.length ? 'pageIn 0.35s ease' : `pageIn 0.35s ease ${i * 0.08}s both` }}>
            {msg.type === 'ai' && (
              <img src="uploads/budget_buddy.png" alt="" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0, marginTop: 2, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start', minWidth: 0, flex: 1 }}>
            {msg.type === 'ai' && (
              <span style={{ fontSize: 11, color: '#9A9AAA', fontWeight: 500, marginBottom: 3 }}>BudgetBuddy</span>
            )}
            <div style={{ ...bubbleStyle(msg.type), fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.55 }}>
              {msg.isAlert && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8, padding: '5px 10px', background: '#FFF3E0', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#E65100' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v6M7 10v1" stroke="#E65100" strokeWidth="1.8" strokeLinecap="round"/><circle cx="7" cy="7" r="6" stroke="#E65100" strokeWidth="1.2" fill="none"/></svg>
                  Bill Due Soon
                </div>
              )}
              {msg.text}
              {msg.goalPreview && (
                <div style={{ marginTop: 10, padding: '10px 12px', background: accent.bg, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ProgressRing progress={msg.goalPreview.progress} size={40} strokeWidth={4} color={msg.goalPreview.color || accent.primary}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#2A2A3A' }}>{msg.goalPreview.progress}%</span>
                  </ProgressRing>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#2A2A3A' }}>{msg.goalPreview.name}</div>
                    <div style={{ fontSize: 11, color: '#8A8A9A' }}>{formatCurrency(msg.goalPreview.saved, false)} / {formatCurrency(msg.goalPreview.target, false)}</div>
                  </div>
                </div>
              )}
            </div>
            {msg.actions && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6, maxWidth: '86%' }}>
                {msg.actions.map((a, j) => (
                  <button key={j} onClick={() => handleAction(a)} style={{ border: 'none', background: '#EEECE7', color: '#2A2A3A', padding: '7px 13px', borderRadius: 18, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans'", transition: 'transform 0.12s, background 0.2s' }}
                    onPointerDown={e => e.currentTarget.style.transform = 'scale(0.94)'}
                    onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>{a}</button>
                ))}
              </div>
            )}
            {msg.categories && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6, maxWidth: '86%' }}>
                {msg.categories.map((c, j) => (
                  <button key={j} onClick={() => sendMessage(c)} style={{ border: '1.5px solid #E5E3DE', background: '#fff', color: '#2A2A3A', padding: '7px 13px', borderRadius: 18, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans'", transition: 'transform 0.12s, background 0.2s, border-color 0.2s' }}
                    onPointerDown={e => { e.currentTarget.style.transform = 'scale(0.94)'; e.currentTarget.style.background = accent.soft; e.currentTarget.style.borderColor = accent.primary; }}
                    onPointerUp={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#E5E3DE'; }}>{c}</button>
                ))}
              </div>
            )}
            <span style={{ fontSize: 10, color: '#B8B8C8', marginTop: 3 }}>{msg.time}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
            <img src="uploads/budget_buddy.png" alt="" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
            <div style={{ ...bubbleStyle('ai'), display: 'flex', gap: 4, padding: '12px 18px' }}>
              {[0, 1, 2].map(i => (<div key={i} style={{ width: 6, height: 6, borderRadius: 3, background: '#9A9AAA', animation: `typingBounce 1.2s infinite ${i * 0.2}s` }} />))}
            </div>
          </div>
        )}
      </div>

      {/* Quick chips */}
      <div style={{ padding: '6px 14px', display: 'flex', gap: 6, flexShrink: 0 }}>
        {['How much did I spend?', 'My goals', 'Debt tips'].map((c, i) => (
          <button key={i} onClick={() => sendMessage(c)} style={{ border: '1.5px solid #E5E3DE', background: 'transparent', color: '#6A6A7A', padding: '6px 12px', borderRadius: 16, fontSize: 11, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'DM Sans'", transition: 'all 0.2s', flexShrink: 0 }}>{c}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '6px 14px 104px', display: 'flex', gap: 8, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask BudgetBuddy..."
          style={{ flex: 1, height: 42, borderRadius: 21, border: '1.5px solid #E5E3DE', padding: '0 16px', fontSize: 13.5, outline: 'none', background: '#fff', fontFamily: "'DM Sans'", color: '#2A2A3A', transition: 'border-color 0.2s' }}
          onFocus={e => e.target.style.borderColor = accent.primary}
          onBlur={e => e.target.style.borderColor = '#E5E3DE'} />
        <button onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          style={{ width: 42, height: 42, borderRadius: 21, background: input.trim() ? '#1C1C2E' : '#E5E3DE', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s, transform 0.12s', flexShrink: 0 }}
          onPointerDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
          onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M15 2L7.5 9.5M15 2L10.5 15L7.5 9.5M15 2L2 6.5L7.5 9.5" stroke={input.trim() ? '#fff' : '#9A9AAA'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

Object.assign(window, { ChatPage });
