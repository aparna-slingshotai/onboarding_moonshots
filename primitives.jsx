// Sundial — shared UI primitives rendered inside an iOS frame
// All screens consume the design tokens from colors_and_type.css

const S = {
  surface:   '#EBE7DE',
  raised:    '#F6F3ED',
  sunken:    '#DDDAD1',
  line:      '#DDDAD1',
  lineStrong:'#CFCBC4',
  text1:     '#1A1918',
  text2:     '#464543',
  text3:     '#63615D',
  muted:     '#807E7A',
  placeholder: '#807E7A',
  plum:      '#855074',
  plumLo:    '#EAD7E1',
  plumXLo:   '#F3E9EE',
  wood:      '#AD7049',
  woodLo:    '#EEDDD3',
  apricot:   '#D98F51',
  apricotLo: '#FBF2EB',
  olive:     '#7C843D',
  oliveLo:   '#EFF2E0',
  seafoam:   '#4D675A',
  seafoamLo: '#E4EEE6',
  dark:      '#272725',
  alertRed:  '#C66051',
  serif:     '"Libre Baskerville", Georgia, serif',
  sans:      '"Google Sans", ui-sans-serif, system-ui, sans-serif',
};

// Small glyphs (inline SVG so we don't depend on remote icon fonts at runtime)
const Ic = {
  arrowUp:  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
  arrowBack:<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12H4M10 6l-6 6 6 6"/></svg>,
  close:    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  add:      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  more:     <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>,
  chevR:    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>,
  bell:     <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 16v-5a6 6 0 10-12 0v5l-1.5 2h15L18 16zM10 20a2 2 0 004 0"/></svg>,
  mic:      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg>,
  wave:     <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><rect x="3" y="10" width="2" height="4" rx="1"/><rect x="7" y="7" width="2" height="10" rx="1"/><rect x="11" y="4" width="2" height="16" rx="1"/><rect x="15" y="7" width="2" height="10" rx="1"/><rect x="19" y="10" width="2" height="4" rx="1"/></svg>,
  home:     <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z"/></svg>,
  chat:     <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1H9l-5 4V6a1 1 0 011-1z"/></svg>,
  route:    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h6a4 4 0 000-8h-4a4 4 0 010-8h6"/></svg>,
  history:  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 109-9 9 9 0 00-6.4 2.6L3 8M3 3v5h5M12 7v5l3 2"/></svg>,
  heart:    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 21s-7-4.35-7-10a5 5 0 019-3 5 5 0 019 3c0 5.65-7 10-7 10h-4z"/></svg>,
  star:     <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2l2.39 6.93h7.29l-5.9 4.28 2.26 6.94L12 15.82l-6.04 4.33 2.26-6.94L2.32 8.93h7.29L12 2z"/></svg>,
};

// ── Top bar ────────────────────────────────────────────────
function TopBar({ title, variant = 'serif', leading = 'back', trailing = 'more', onLeading, onTrailing, dot = false }) {
  const L = leading === 'back' ? Ic.arrowBack : leading === 'close' ? Ic.close : null;
  const T = trailing === 'more' ? Ic.more : trailing === 'bell' ? Ic.bell : trailing === 'add' ? Ic.add : null;
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding: '56px 12px 8px', position:'relative', zIndex:5 }}>
      <IconBtn onClick={onLeading}>{L}</IconBtn>
      <div style={{
        font: variant === 'serif' ? `500 22px/1 ${S.serif}` : `700 18px/1 ${S.sans}`,
        letterSpacing: variant === 'serif' ? -0.5 : -0.1,
        color: S.text1,
      }}>{title}</div>
      <div style={{ position:'relative' }}>
        <IconBtn onClick={onTrailing}>{T}</IconBtn>
        {dot && <span style={{ position:'absolute', top:8, right:8, width:8, height:8, borderRadius:9999, background:S.alertRed, border:`2px solid ${S.surface}` }}/>}
      </div>
    </div>
  );
}

function IconBtn({ children, onClick, style }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ width:40, height:40, border:0, background: h ? 'rgba(26,25,24,0.06)' : 'transparent', borderRadius:9999, display:'flex', alignItems:'center', justifyContent:'center', color:S.text1, cursor:'pointer', ...style }}>
      {children}
    </button>
  );
}

// ── Bottom nav ────────────────────────────────────────────────
function BottomNav({ current = 'home', onNav }) {
  const items = [
    { id:'home',    icon: Ic.home,    lab:'Home' },
    { id:'chat',    icon: Ic.chat,    lab:'Chat' },
    { id:'paths',   icon: Ic.route,   lab:'Paths' },
    { id:'history', icon: Ic.history, lab:'History' },
  ];
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, background:S.raised, borderTop:`1px solid ${S.line}`, padding:'10px 14px 30px', display:'flex', justifyContent:'space-around', zIndex:20 }}>
      {items.map(it => {
        const active = it.id === current;
        return (
          <button key={it.id} onClick={()=>onNav && onNav(it.id)}
            style={{ border:0, background:'transparent', display:'flex', flexDirection:'column', alignItems:'center', gap:2, color: active ? S.plum : S.text3, cursor:'pointer', padding:4 }}>
            {it.icon}
            <span style={{ font:`500 10px/1 ${S.sans}`, letterSpacing:1.25, textTransform:'uppercase' }}>{it.lab}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Composer ──────────────────────────────────────────────────
function Composer({ value, onChange, onSend, onVoice, placeholder = 'Say hi to Ash…' }) {
  return (
    <div style={{ position:'absolute', bottom:82, left:16, right:16, zIndex:19 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, background:S.sunken, borderRadius:9999, padding:'8px 8px 8px 20px' }}>
        <input value={value} onChange={e=>onChange && onChange(e.target.value)}
          placeholder={placeholder}
          style={{ flex:1, border:0, outline:0, background:'transparent', font:`400 15px/1.5 ${S.sans}`, color:S.text1 }} />
        <button onClick={onVoice} aria-label="Voice" style={{ width:38, height:38, borderRadius:9999, background:'transparent', color:S.text2, border:0, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          {Ic.mic}
        </button>
        <button onClick={onSend} aria-label="Send" disabled={!value}
          style={{ width:38, height:38, borderRadius:9999, background: value ? S.plum : S.lineStrong, color: value ? S.plumLo : S.muted, border:0, display:'flex', alignItems:'center', justifyContent:'center', cursor: value?'pointer':'default' }}>
          {Ic.arrowUp}
        </button>
      </div>
    </div>
  );
}

// ── Bar button ─────────────────────────────────────────────
function BarBtn({ children, variant = 'primary', onClick, style }) {
  const map = {
    primary: { bg: S.plum, fg: S.plumLo },
    warm:    { bg: S.wood, fg: S.woodLo },
    ghost:   { bg: 'transparent', fg: S.text1, border: `1px solid ${S.lineStrong}` },
  }[variant];
  return (
    <button onClick={onClick}
      style={{
        font:`500 16px/1 ${S.sans}`, letterSpacing:1.25,
        padding:'16px 24px', borderRadius:16, border:0,
        background: map.bg, color: map.fg,
        cursor:'pointer', transition:'filter .12s',
        ...(map.border ? { border: map.border } : {}),
        ...style,
      }}>
      {children}
    </button>
  );
}

// ── Persona glyph ──────────────────────────────────────────
function PersonaGlyph({ shape = 'star', color = S.plum, bg, size = 60 }) {
  const glyphs = {
    star: <svg viewBox="0 0 24 24" style={{width:size*0.55, height:size*0.55}} fill={color}><path d="M12 2l2.39 6.93h7.29l-5.9 4.28 2.26 6.94L12 15.82l-6.04 4.33 2.26-6.94L2.32 8.93h7.29L12 2z"/></svg>,
    heart: <svg viewBox="0 0 24 24" style={{width:size*0.55, height:size*0.55}} fill={color}><path d="M12 21s-7-4.35-7-10a5 5 0 019-3 5 5 0 019 3c0 5.65-7 10-7 10h-4z"/></svg>,
    triangle: <svg viewBox="0 0 24 24" style={{width:size*0.55, height:size*0.55}} fill={color}><path d="M12 3L2 20h20L12 3z"/></svg>,
    circle: <svg viewBox="0 0 24 24" style={{width:size*0.55, height:size*0.55}} fill={color}><circle cx="12" cy="12" r="9"/></svg>,
    diamond: <svg viewBox="0 0 24 24" style={{width:size*0.55, height:size*0.55}} fill={color}><path d="M12 2l10 10-10 10L2 12 12 2z"/></svg>,
  };
  return (
    <div style={{ width:size, height:size, borderRadius:9999, background: bg || S.plumXLo, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      {glyphs[shape]}
    </div>
  );
}

Object.assign(window, { S, Ic, TopBar, IconBtn, BottomNav, Composer, BarBtn, PersonaGlyph });
