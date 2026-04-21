// Sundial — Configuration flow (5 pages, post-onboarding)
// A stylized tree grows on the top half of the screen; each selection the
// user makes blooms a new flower, "Jack-and-the-beanstalk" style.

const CFG_PINK  = '#E84B8C';
const CFG_KHAKI = '#9B8236';
const CFG_CREAM = '#EEE8D4';
const CFG_NIGHT = '#1A1918';
const CFG_LINE  = '#E2DDD4';

// Glyph lookup for the perspectives grid. Using inline SVGs so we don't
// need icon fonts; the look is intentionally simple / iconic.
const CFG_GLYPHS = {
  ACT: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg>),
  CBT: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16M12 4v16"/></svg>),
  Skills: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.4 6.9L21 11l-5.4 3.9L17 22l-5-3.6L7 22l1.4-7.1L3 11l6.6-1.1L12 3z"/></svg>),
  Neuroscience: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4a3 3 0 013 3v10a3 3 0 11-6 0 3 3 0 01-3-3 3 3 0 013-3 3 3 0 013-3 3 3 0 01-3-3 3 3 0 013-3z"/><path d="M15 4a3 3 0 00-3 3v10a3 3 0 106 0 3 3 0 003-3 3 3 0 00-3-3 3 3 0 00-3-3 3 3 0 003-3 3 3 0 00-3-3z"/></svg>),
  'LGBTQ+': (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 19a9 9 0 0118 0M3 15a9 9 0 0118 0M3 11a9 9 0 0118 0"/></svg>),
  Parenting: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.35-7-10a5 5 0 019-3 5 5 0 019 3c0 5.65-7 10-7 10h-4z"/></svg>),
  Buddhism: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4l12.8-12.8"/></svg>),
  Christianity: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M7 8h10"/></svg>),
  Hinduism: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4c3 0 5 2 5 5s-2 5-5 5-5-2-5-5m10 5l-5 6m-5-6a3 3 0 106 0"/></svg>),
};

const CFG_PERSPECTIVES = [
  'ACT', 'CBT', 'Skills',
  'Neuroscience', 'LGBTQ+', 'Parenting',
  'Buddhism', 'Christianity', 'Hinduism',
];

const CFG_PAGES = [
  {
    kind: 'intro',
    title: "Let's make this yours.",
    subtitle: "Personalize how I respond. Choose the personality, perspective, and approach that fit you best.",
    primary: 'Personalize Ash',
    secondary: 'Dismiss',
  },
  {
    kind: 'single',
    id: 'style',
    title: 'First, how should I help you think things through?',
    subtitle: "I'm pretty adaptable, so tell me what usually works best for you, and I'll tailor how I respond.",
    options: ['Exploration', 'Validate and listen', 'Teach me'],
  },
  {
    kind: 'icons',
    id: 'perspectives',
    title: 'Next, what perspectives matter to you?',
    subtitle: 'This helps me understand what kinds of lenses I should bring to our conversations.',
    options: CFG_PERSPECTIVES,
  },
  {
    kind: 'multi',
    id: 'personality',
    title: 'Nice. How about my personality?',
    subtitle: "I'll use this as a guide for how I talk with you, but we can always switch it up later.",
    options: ['Warm', 'Direct', 'Sarcastic', 'Laid-back', 'Quirky', 'Wise', 'Humorous', 'Nerdy'],
  },
  {
    kind: 'multi',
    id: 'topics',
    title: 'Last, what kinds of things do you like to talk about?',
    subtitle: "I'm an AI and I can talk about pretty much anything! So let's get on the same page.",
    options: ['Fitness', 'Books', 'Movies', 'Music', 'Philosophy', 'Gardening', 'Memes', 'Animals', 'Tarot', 'Yoga', 'Photography', 'Pop culture', 'Dreams', 'Cooking', 'Mythology', 'Video Games', 'History'],
  },
  {
    kind: 'done',
    title: "You're all set",
    primary: 'Start Conversation',
  },
];

// Flower slots on the tree — each new selection blooms the next slot.
// Positions are tuned for the 402×350 tree viewport. Earlier slots are
// bigger and sit near the crown so the tree never looks empty.
const CFG_FLOWERS = [
  { x: 206, y: 92,  r: 50 },   // crown
  { x: 104, y: 132, r: 42 },   // left upper
  { x: 300, y: 140, r: 48 },   // right upper
  { x: 66,  y: 212, r: 38 },   // left mid
  { x: 334, y: 222, r: 42 },   // right mid
  { x: 180, y: 184, r: 32 },   // center-left small
  { x: 240, y: 198, r: 30 },   // center-right small
  { x: 134, y: 274, r: 36 },   // left lower
  { x: 268, y: 276, r: 36 },   // right lower
  { x: 92,  y: 100, r: 26 },   // far-left high
  { x: 324, y: 90,  r: 26 },   // far-right high
  { x: 208, y: 148, r: 24 },   // under crown
  { x: 158, y: 96,  r: 24 },   // crown-left small
  { x: 258, y: 104, r: 22 },   // crown-right small
  { x: 198, y: 240, r: 24 },   // mid spine
];

// A cotton-puff flower — one central circle with a few bumps so the
// silhouette reads as an organic cluster, not a perfect circle.
function CfgFlower({ x, y, r, delay }) {
  const bumps = [
    { dx: -r * 0.55, dy: -r * 0.15, fr: r * 0.62 },
    { dx:  r * 0.55, dy: -r * 0.05, fr: r * 0.6 },
    { dx:  r * 0.08, dy: -r * 0.65, fr: r * 0.55 },
    { dx: -r * 0.18, dy:  r * 0.55, fr: r * 0.48 },
  ];
  return (
    <g
      style={{
        opacity: 0,
        animation: `cfgBloom 520ms cubic-bezier(0.2,1.2,0.2,1) ${delay || 0}ms both`,
        transformOrigin: `${x}px ${y}px`,
        transformBox: 'fill-box',
      }}
    >
      <circle cx={x} cy={y} r={r} fill={CFG_CREAM} />
      {bumps.map((b, i) => (
        <circle key={i} cx={x + b.dx} cy={y + b.dy} r={b.fr} fill={CFG_CREAM} />
      ))}
    </g>
  );
}

// Simple figure — head + body + socks. Appears once the user reaches the
// penultimate / final page so the tree feels populated.
function CfgFigure({ x, y, scale = 1, bodyColor = '#3B6FC6' }) {
  const s = scale;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="6" ry="7" fill={CFG_NIGHT} />
      <path d={`M -5 6 Q -7 18 -4 26 L 4 26 Q 7 18 5 6 Z`} fill={bodyColor} />
      <rect x="-4" y="24" width="3.2" height="10" rx="1.6" fill="#E89AAA" />
      <rect x="0.8" y="24" width="3.2" height="10" rx="1.6" fill="#E89AAA" />
    </g>
  );
}

function ConfigurationTree({ bloomCount, showFigures }) {
  return (
    <svg viewBox="0 0 402 350" width="402" height="350" style={{ display: 'block' }}>
      <style>{`
        @keyframes cfgBloom {
          0%   { transform: scale(0.2); opacity: 0; }
          55%  { opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
      `}</style>
      {/* sky */}
      <rect width="402" height="350" fill={CFG_PINK} />
      {/* small moon */}
      <circle cx="358" cy="46" r="10" fill={CFG_CREAM} />
      {/* trunk + branches, stroked with round caps so they read as organic */}
      <g stroke={CFG_KHAKI} strokeLinecap="round" fill="none">
        <path d="M 200 360 C 195 310 215 262 200 218 C 186 178 220 138 206 100" strokeWidth="44" />
        <path d="M 204 130 Q 154 122 98  132" strokeWidth="22" />
        <path d="M 210 152 Q 260 146 302 152" strokeWidth="22" />
        <path d="M 198 214 Q 134 210 70  214" strokeWidth="22" />
        <path d="M 212 228 Q 280 224 332 222" strokeWidth="20" />
        <path d="M 200 288 Q 168 282 134 276" strokeWidth="14" />
        <path d="M 210 292 Q 242 284 272 280" strokeWidth="14" />
      </g>
      {/* Flowers: only those unlocked by the user's choice count */}
      {CFG_FLOWERS.slice(0, bloomCount).map((f, i) => (
        <CfgFlower key={i} x={f.x} y={f.y} r={f.r} delay={i > bloomCount - 3 ? 0 : 0} />
      ))}
      {/* Figures appear once the tree is substantially bloomed */}
      {showFigures && (
        <>
          <CfgFigure x={128} y={232} scale={0.95} bodyColor="#3B6FC6" />
          <CfgFigure x={262} y={158} scale={0.9} bodyColor="#E76F3C" />
          <CfgFigure x={80}  y={138} scale={0.75} bodyColor="#A0A0A0" />
        </>
      )}
    </svg>
  );
}

function CfgPill({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 14px',
        borderRadius: 9999,
        border: `1px solid ${selected ? CFG_NIGHT : CFG_LINE}`,
        background: selected ? CFG_NIGHT : 'transparent',
        color: selected ? CFG_CREAM : CFG_NIGHT,
        font: `500 14px/1.1 ${S.sans}`,
        cursor: 'pointer',
        transition: 'background 120ms, color 120ms, border-color 120ms',
      }}
    >
      {label}
    </button>
  );
}

function CfgIconCell({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: '14px 8px',
        borderRadius: 16,
        border: `1px solid ${selected ? CFG_NIGHT : CFG_LINE}`,
        background: selected ? 'rgba(26,25,24,0.06)' : 'transparent',
        color: CFG_NIGHT,
        cursor: 'pointer',
        transition: 'background 120ms, border-color 120ms',
      }}
    >
      {CFG_GLYPHS[label] || CFG_GLYPHS.ACT}
      <div style={{ font: `500 12px/1.1 ${S.sans}`, color: CFG_NIGHT, textAlign: 'center' }}>{label}</div>
    </button>
  );
}

function ConfigurationScreen({ onDone, onDismiss }) {
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const page = CFG_PAGES[idx];

  const totalSelections = Object.values(answers).reduce((sum, v) => {
    if (Array.isArray(v)) return sum + v.length;
    return sum + (v ? 1 : 0);
  }, 0);
  // Tree starts with a small crown on the intro page, then flowers bloom
  // in with each selection the user makes.
  const baseBloom = idx === 0 ? 3 : Math.max(3, idx + 2);
  const bloomCount = Math.min(CFG_FLOWERS.length, baseBloom + totalSelections);
  const showFigures = idx >= 4 || totalSelections >= 6;

  const next = () => setIdx(i => Math.min(i + 1, CFG_PAGES.length - 1));
  const back = () => setIdx(i => Math.max(i - 1, 0));
  const setSingle = (id, v) => setAnswers(prev => ({ ...prev, [id]: v }));
  const toggleMulti = (id, v) => setAnswers(prev => {
    const curr = prev[id] || [];
    return { ...prev, [id]: curr.includes(v) ? curr.filter(x => x !== v) : [...curr, v] };
  });

  return (
    <div style={{ width: 402, height: 874, background: CFG_CREAM, position: 'relative', overflow: 'hidden' }}>
      {/* Tree illustration on the top half */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 350 }}>
        <ConfigurationTree bloomCount={bloomCount} showFigures={showFigures} />
      </div>

      {/* Top-bar controls */}
      {idx > 0 && idx < CFG_PAGES.length - 1 && (
        <div style={{ position: 'absolute', top: 56, left: 12, zIndex: 6 }}>
          <IconBtn onClick={back} style={{ background: 'rgba(255,255,255,0.25)' }}>
            {Ic.arrowBack}
          </IconBtn>
        </div>
      )}
      {page.kind !== 'done' && (
        <div style={{ position: 'absolute', top: 56, right: 12, zIndex: 6 }}>
          <IconBtn onClick={onDismiss} style={{ background: 'rgba(255,255,255,0.25)' }}>
            {Ic.close}
          </IconBtn>
        </div>
      )}

      {/* Content panel */}
      <div
        style={{
          position: 'absolute',
          top: 350, left: 0, right: 0, bottom: 0,
          background: CFG_CREAM,
          padding: '28px 20px 140px',
          overflowY: 'auto',
          zIndex: 3,
        }}
      >
        <h1 style={{ font: `500 24px/1.25 ${S.serif}`, color: CFG_NIGHT, margin: '0 0 8px', letterSpacing: -0.4 }}>
          {page.title}
        </h1>
        {page.subtitle && (
          <p style={{ font: `400 14px/1.5 ${S.sans}`, color: 'rgba(26,25,24,0.72)', margin: '0 0 20px' }}>
            {page.subtitle}
          </p>
        )}

        {page.kind === 'single' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {page.options.map(opt => (
              <CfgPill key={opt} label={opt} selected={answers[page.id] === opt} onClick={() => setSingle(page.id, opt)} />
            ))}
          </div>
        )}

        {page.kind === 'multi' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {page.options.map(opt => (
              <CfgPill
                key={opt}
                label={opt}
                selected={(answers[page.id] || []).includes(opt)}
                onClick={() => toggleMulti(page.id, opt)}
              />
            ))}
          </div>
        )}

        {page.kind === 'icons' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {page.options.map(opt => (
              <CfgIconCell
                key={opt}
                label={opt}
                selected={(answers[page.id] || []).includes(opt)}
                onClick={() => toggleMulti(page.id, opt)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '16px 20px 36px',
          background: CFG_CREAM,
          borderTop: `1px solid ${CFG_LINE}`,
          zIndex: 5,
        }}
      >
        {page.kind === 'intro' && (
          <>
            <BarBtn variant="primary" onClick={next} style={{ width: '100%' }}>{page.primary}</BarBtn>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <button
                onClick={onDismiss}
                style={{ background: 'none', border: 0, color: CFG_NIGHT, font: `500 13px/1 ${S.sans}`, letterSpacing: 0.2, cursor: 'pointer' }}
              >
                {page.secondary}
              </button>
            </div>
          </>
        )}

        {(page.kind === 'single' || page.kind === 'multi' || page.kind === 'icons') && (
          <>
            <BarBtn variant="primary" onClick={next} style={{ width: '100%' }}>Continue</BarBtn>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <button
                onClick={next}
                style={{ background: 'none', border: 0, color: CFG_NIGHT, font: `500 13px/1 ${S.sans}`, letterSpacing: 0.2, cursor: 'pointer' }}
              >
                Skip for now
              </button>
            </div>
          </>
        )}

        {page.kind === 'done' && (
          <BarBtn variant="primary" onClick={() => onDone && onDone(answers)} style={{ width: '100%' }}>
            {page.primary}
          </BarBtn>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ConfigurationScreen });
