// Sundial — Configuration flow, snail edition
// Same 5-page flow as the tree version, but illustrated as a snail
// sitting on an outstretched hand. Every selection adds a new ring to
// the shell, so it grows in size, takes on new textures, and (past a
// threshold) stretches into more elongated shapes.

const CFG_PINK  = '#E84B8C';
const CFG_CREAM = '#EEE8D4';
const CFG_NIGHT = '#1A1918';
const CFG_LINE  = '#E2DDD4';
const CFG_SURFACE = '#EBE7DE';
// Snail-specific palette — echoes the collage reference (navy core,
// olive/yellow bands, blue outline hand).
const SNAIL_BODY  = '#3a3836';
const SNAIL_BELLY = '#6e6a65';
const SHELL_CORE  = '#1f3a8a';
const SHELL_GRID  = '#EEE8D4';
const HAND_STROKE = '#5F7FC2';
const CUFF_YELLOW = '#E8C832';
const ACCENT_YELLOW = '#F2D246';

// Sundial accent palette (used for per-option shell-ring colors).
const ACCENTS = {
  plum:   '#855074',
  damson: '#4D675A',
  cherry: '#A24335',
  olive:  '#5F652F',
  apricot:'#8E521F',
  wood:   '#AD7049',
  ocean:  '#3B6FC6',
  sun:    '#D98F51',
};
const ACCENT_CYCLE = [
  ACCENTS.plum, ACCENTS.damson, ACCENTS.cherry,
  ACCENTS.olive, ACCENTS.apricot, ACCENTS.wood,
  ACCENTS.ocean, ACCENTS.sun,
];

const CFG_COLORS = (() => {
  const map = {
    Exploration:           ACCENTS.plum,
    'Validate and listen': ACCENTS.damson,
    'Teach me':            ACCENTS.cherry,
  };
  const assign = (labels) => labels.forEach((l, i) => { map[l] = ACCENT_CYCLE[i % ACCENT_CYCLE.length]; });
  assign(['ACT', 'CBT', 'Skills', 'Neuroscience', 'LGBTQ+', 'Parenting', 'Buddhism', 'Christianity', 'Hinduism']);
  assign(['Warm', 'Direct', 'Sarcastic', 'Laid-back', 'Quirky', 'Wise', 'Humorous', 'Nerdy']);
  assign(['Fitness', 'Books', 'Movies', 'Music', 'Philosophy', 'Gardening', 'Memes', 'Animals', 'Tarot', 'Yoga', 'Photography', 'Pop culture', 'Dreams', 'Cooking', 'Mythology', 'Video Games', 'History']);
  return map;
})();

// Inline glyphs for the Q2 perspectives grid.
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

const PERSONALITY_MAX = 3;

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
    cap: 5,
    noBeds: true,  // perspective rings stay cream, like the reference shell
  },
  {
    kind: 'multi',
    id: 'personality',
    title: 'Nice. How about my personality?',
    subtitle: "I'll use this as a guide for how I talk with you, but we can always switch it up later.",
    options: ['Warm', 'Direct', 'Sarcastic', 'Laid-back', 'Quirky', 'Wise', 'Humorous', 'Nerdy'],
    cap: PERSONALITY_MAX,
    sway: true,  // the snail moves on tap instead of growing its shell
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

// ── Snail movement keyframes (reused from tree sway) ──────────────
const PERSONALITY_MOTIONS = {
  Warm:       { keyframes: 'snailWarm',      dur: 900,  easing: 'cubic-bezier(0.4,0,0.2,1)' },
  Direct:     { keyframes: 'snailDirect',    dur: 420,  easing: 'cubic-bezier(0.25,0.8,0.25,1)' },
  Sarcastic:  { keyframes: 'snailSarcastic', dur: 620,  easing: 'cubic-bezier(0.3,0.1,0.3,1)' },
  'Laid-back':{ keyframes: 'snailLaidBack',  dur: 1100, easing: 'cubic-bezier(0.45,0.05,0.55,0.95)' },
  Quirky:     { keyframes: 'snailQuirky',    dur: 720,  easing: 'linear' },
  Wise:       { keyframes: 'snailWise',      dur: 1200, easing: 'cubic-bezier(0.45,0,0.55,1)' },
  Humorous:   { keyframes: 'snailHumorous',  dur: 680,  easing: 'cubic-bezier(0.2,1.4,0.3,1)' },
  Nerdy:      { keyframes: 'snailNerdy',     dur: 440,  easing: 'linear' },
};

const SNAIL_KEYFRAMES_CSS = `
  @keyframes snailWarm {
    0%   { transform: translateX(0) rotate(0deg); }
    50%  { transform: translateX(4px) rotate(1.2deg); }
    100% { transform: translateX(0) rotate(0deg); }
  }
  @keyframes snailDirect {
    0%   { transform: translateX(0) rotate(0deg); }
    30%  { transform: translateX(14px) rotate(3deg); }
    55%  { transform: translateX(8px) rotate(1.5deg); }
    100% { transform: translateX(0) rotate(0deg); }
  }
  @keyframes snailSarcastic {
    0%   { transform: translateX(0) rotate(0deg) skewX(0deg); }
    40%  { transform: translateX(-6px) rotate(-2deg) skewX(-3deg); }
    70%  { transform: translateX(2px) rotate(0.6deg) skewX(1deg); }
    100% { transform: translateX(0) rotate(0deg) skewX(0deg); }
  }
  @keyframes snailLaidBack {
    0%   { transform: translateY(0) rotate(0deg); }
    25%  { transform: translateY(-5px) rotate(-2deg); }
    75%  { transform: translateY(3px) rotate(2deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  @keyframes snailQuirky {
    0%   { transform: translate(0,0) rotate(0deg); }
    15%  { transform: translate(6px,-3px) rotate(3deg); }
    30%  { transform: translate(-4px,2px) rotate(-3deg); }
    45%  { transform: translate(5px,-1px) rotate(2deg); }
    60%  { transform: translate(-2px,1px) rotate(-1.5deg); }
    80%  { transform: translate(1px,0) rotate(0.8deg); }
    100% { transform: translate(0,0) rotate(0deg); }
  }
  @keyframes snailWise {
    0%   { transform: translateY(0) scale(1); }
    50%  { transform: translateY(-3px) scale(1.015); }
    100% { transform: translateY(0) scale(1); }
  }
  @keyframes snailHumorous {
    0%   { transform: translateY(0) scale(1); }
    35%  { transform: translateY(-8px) scale(1.04); }
    65%  { transform: translateY(3px) scale(0.97); }
    100% { transform: translateY(0) scale(1); }
  }
  @keyframes snailNerdy {
    0%   { transform: translateX(0) rotate(0deg); }
    12%  { transform: translateX(-3px) rotate(-2.5deg); }
    24%  { transform: translateX(3px) rotate(2.5deg); }
    36%  { transform: translateX(-2px) rotate(-2deg); }
    48%  { transform: translateX(2px) rotate(2deg); }
    100% { transform: translateX(0) rotate(0deg); }
  }
`;

// Baseline shell rings — always present, regardless of user selections.
// These are the "newborn" shell layers in the reference image.
const BASELINE_RING_COLORS = [
  '#5F652F',  // olive band
  '#3B6FC6',  // blue band
  ACCENT_YELLOW,
];
const BASELINE_RING_COUNT = BASELINE_RING_COLORS.length;
const CORE_RADIUS = 16;    // navy grid core
const RING_STEP   = 9;     // extra radius per ring

// No per-ring textures in this pass — keep each ring a flat color so
// the selection palette reads clearly. A subtle grid sits only on the
// navy core of the shell.
function ringTexture() { return null; }

// Elongate the shell as selections accumulate — up to ~15% stretch so
// it reads like a "spiral shell shape" forming.
function shellAspect(entryCount) {
  const stretch = Math.min(0.18, entryCount * 0.018);
  return { rx: 1 + stretch, ry: 1 - stretch * 0.5 };
}

// ── Snail illustration ──────────────────────────────────────────
function SnailFigure({ entries, swayKey, swayLabel }) {
  const ringCount = BASELINE_RING_COUNT + entries.length;
  const aspect = shellAspect(entries.length);
  const outerR = CORE_RADIUS + ringCount * RING_STEP;

  const swayRef = React.useRef(null);
  React.useEffect(() => {
    if (!swayKey || !swayRef.current) return;
    const motion = PERSONALITY_MOTIONS[swayLabel] || {
      keyframes: 'snailWarm', dur: 700, easing: 'ease-in-out',
    };
    const el = swayRef.current;
    el.style.animation = 'none';
    void el.getBoundingClientRect();
    el.style.animation = `${motion.keyframes} ${motion.dur}ms ${motion.easing} both`;
  }, [swayKey, swayLabel]);

  // Shell anchor on the canvas — positioned so the shell sits on top of
  // the snail body, roughly where it would in the reference image.
  const SHELL_X = 232;
  const SHELL_Y = 260;

  // Assemble the rings outermost-first so smaller ones sit on top.
  const rings = [];
  for (let i = 0; i < ringCount; i++) {
    let color, textured;
    if (i < BASELINE_RING_COUNT) {
      color = BASELINE_RING_COLORS[i];
    } else {
      const entry = entries[i - BASELINE_RING_COUNT];
      color = (entry && entry.bed) ? entry.bed : CFG_CREAM;
    }
    textured = ringTexture(i);
    rings.push({ color, textured, idx: i });
  }

  return (
    <svg viewBox="0 0 402 486" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" style={{ display: 'block' }}>
      <defs>
        <pattern id="shellGrid" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
          <rect width="7" height="7" fill={SHELL_GRID} />
          <path d="M 0 0 L 7 0 M 0 0 L 0 7" stroke={CFG_NIGHT} strokeWidth="0.7" />
        </pattern>
        <pattern id="shellDashed" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
          <rect width="10" height="10" fill={CFG_CREAM} />
          <path d="M 0 5 H 6" stroke={CFG_NIGHT} strokeWidth="1" />
        </pattern>
        <pattern id="shellStipple" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill={CFG_CREAM} />
          <circle cx="3" cy="3" r="1" fill={CFG_NIGHT} />
          <circle cx="7" cy="6" r="0.7" fill={CFG_NIGHT} />
        </pattern>
        <filter id="snailGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="noise" />
          <feColorMatrix in="noise" values="0 0 0 0 0.08  0 0 0 0 0.07  0 0 0 0 0.06  0 0 0 0.55 0" result="darkNoise" />
          <feComposite in="darkNoise" in2="SourceGraphic" operator="in" result="inShape" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="inShape" />
          </feMerge>
        </filter>
      </defs>

      <rect width="402" height="486" fill={CFG_PINK} />

      {/* Everything the user "is" sits inside swayRef so the snail can
          animate as one unit without remounting shell layers. */}
      <g ref={swayRef} style={{ transformOrigin: '232px 340px', transformBox: 'fill-box' }}>

        {/* --- Hand (blue pencil sketch cradling the snail) --- */}
        <g stroke={HAND_STROKE} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Sleeve cuff (yellow block) */}
          <rect x="30" y="448" width="110" height="30" fill={CUFF_YELLOW} stroke="none" />
          <path d="M 30 448 L 140 448 L 140 478 L 30 478" />
          {/* Wrist + palm outline */}
          <path d="M 60 448
                   Q 60 400 80 378
                   Q 110 360 160 358
                   Q 210 357 252 360
                   Q 286 363 308 372
                   Q 324 380 332 392" />
          {/* Index finger curling over */}
          <path d="M 332 392
                   Q 340 402 336 416
                   Q 330 428 316 430
                   Q 298 432 282 428" />
          {/* Thumb / knuckle ridge inside */}
          <path d="M 160 358 Q 168 370 158 388 Q 152 402 162 420" />
          <path d="M 212 360 Q 216 376 208 390" />
          <path d="M 258 362 Q 260 378 252 390" />
          {/* Forearm */}
          <path d="M 60 448 Q 48 460 40 478" />
        </g>

        {/* --- Snail body (grainy charcoal blob on top of the hand) --- */}
        <g filter="url(#snailGrain)">
          <path
            d="M 100 336
               Q 90 308 110 294
               Q 140 282 190 284
               Q 240 286 278 300
               Q 308 312 322 322
               Q 336 332 342 336
               Q 348 338 348 342
               Q 348 346 342 350
               Q 334 352 318 350
               Q 300 348 276 350
               Q 230 352 180 350
               Q 130 348 102 348
               Q 96 346 100 336 Z"
            fill={SNAIL_BODY}
          />
          {/* belly highlight */}
          <path
            d="M 130 346 Q 180 354 250 350 Q 290 348 316 346 Q 290 352 230 354 Q 170 355 130 346 Z"
            fill={SNAIL_BELLY}
            opacity="0.9"
          />
        </g>

        {/* --- Head eye + antennae --- */}
        <g>
          <circle cx="325" cy="326" r="1.6" fill={CFG_NIGHT} />
          {/* left antenna */}
          <path d="M 322 316 Q 314 296 316 276" stroke={CFG_NIGHT} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="316" cy="274" r="3" fill={CFG_NIGHT} />
          {/* right antenna */}
          <path d="M 336 316 Q 340 294 348 278" stroke={CFG_NIGHT} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="348" cy="276" r="3" fill={CFG_NIGHT} />
          {/* tiny mouth line */}
          <path d="M 332 334 Q 336 336 340 334" stroke={CFG_NIGHT} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>

        {/* --- Shell (concentric rings that grow with selections) --- */}
        <g transform={`translate(${SHELL_X}, ${SHELL_Y})`}>
          {/* Render outermost first so smaller rings sit on top. */}
          {rings.slice().reverse().map((ring) => {
            const r = CORE_RADIUS + (ring.idx + 1) * RING_STEP;
            const fill = ring.textured
              ? `url(#shell${ring.textured[0].toUpperCase() + ring.textured.slice(1)})`
              : ring.color;
            return (
              <ellipse
                key={ring.idx}
                cx="0"
                cy="0"
                rx={r * aspect.rx}
                ry={r * aspect.ry}
                fill={fill}
                stroke={CFG_NIGHT}
                strokeWidth="0.5"
                style={{
                  opacity: 0,
                  animation: `snailBloom 380ms cubic-bezier(0.2,1.2,0.2,1) ${ring.idx * 40}ms both`,
                  transformOrigin: 'center',
                  transformBox: 'fill-box',
                }}
              />
            );
          })}
          {/* Core: navy dot with a grid overlay, like the reference shell. */}
          <circle cx="0" cy="0" r={CORE_RADIUS} fill={SHELL_CORE} />
          <circle cx="0" cy="0" r={CORE_RADIUS - 3} fill="url(#shellGrid)" />
        </g>
      </g>

      <style>{`
        @keyframes snailBloom {
          0%   { transform: scale(0.5); opacity: 0; }
          60%  { opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        ${SNAIL_KEYFRAMES_CSS}
      `}</style>
    </svg>
  );
}

// Taller version for the final screen — same snail, scaled up and
// anchored to the bottom of the phone.
function SnailFigureTall({ entries, scheduleKey }) {
  // Re-mount on scheduleKey so the animation replays.
  return (
    <div key={scheduleKey} style={{ transform: 'scale(1.35)', transformOrigin: 'center bottom', width: '100%', height: '100%' }}>
      <SnailFigure entries={entries} />
    </div>
  );
}

// ── CTA + option primitives ────────────────────────────────────
function CfgCta({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        font: `500 18px/1.2 ${S.sans}`,
        letterSpacing: -0.25,
        padding: '14px 20px',
        borderRadius: 16,
        border: 0,
        background: ACCENTS.plum,
        color: '#E6D5E1',
        cursor: 'pointer',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function CfgPill({ label, selected, disabled, onClick }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        padding: '10px 14px',
        borderRadius: 9999,
        border: `1px solid ${selected ? CFG_NIGHT : CFG_LINE}`,
        background: selected ? CFG_NIGHT : 'transparent',
        color: selected ? CFG_CREAM : CFG_NIGHT,
        font: `500 14px/1.1 ${S.sans}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        transition: 'background 120ms, color 120ms, border-color 120ms, opacity 120ms',
      }}
    >
      {label}
    </button>
  );
}

function CfgIconCell({ label, selected, disabled, onClick }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: '14px 8px',
        borderRadius: 16,
        border: `1px solid ${selected ? CFG_NIGHT : CFG_LINE}`,
        background: selected ? 'rgba(26,25,24,0.06)' : 'transparent',
        color: CFG_NIGHT,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        transition: 'background 120ms, border-color 120ms, opacity 120ms',
      }}
    >
      {CFG_GLYPHS[label] || CFG_GLYPHS.ACT}
      <div style={{ font: `500 12px/1.1 ${S.sans}`, color: CFG_NIGHT, textAlign: 'center' }}>{label}</div>
    </button>
  );
}

// ── Screen ─────────────────────────────────────────────────────
function ConfigurationScreen({ onDone, onDismiss, onBack }) {
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [swayTick, setSwayTick] = React.useState(0);
  const [swayLabel, setSwayLabel] = React.useState(null);
  const page = CFG_PAGES[idx];

  // Selections that grow the shell. Personality taps move the snail
  // rather than adding rings.
  const bloomEntries = React.useMemo(() => {
    const out = [];
    if (answers.style) out.push({ label: answers.style, bed: CFG_COLORS[answers.style] });
    (answers.perspectives || []).forEach(l => out.push({ label: l, bed: null }));
    (answers.topics || []).forEach(l => out.push({ label: l, bed: CFG_COLORS[l] }));
    return out;
  }, [answers]);

  const isFinal = page.kind === 'done';

  const next = () => setIdx(i => Math.min(i + 1, CFG_PAGES.length - 1));
  const back = () => {
    if (idx === 0) { onBack && onBack(); return; }
    setIdx(i => Math.max(i - 1, 0));
  };

  const setSingle = (id, v) => setAnswers(prev => ({
    ...prev,
    [id]: prev[id] === v ? null : v,
  }));

  const toggleMulti = (id, v, cap, sway) => setAnswers(prev => {
    const curr = prev[id] || [];
    const has = curr.includes(v);
    if (sway) {
      setSwayTick(t => t + 1);
      setSwayLabel(v);
    }
    if (!has && cap && curr.length >= cap) return prev;
    return { ...prev, [id]: has ? curr.filter(x => x !== v) : [...curr, v] };
  });

  if (isFinal) {
    return (
      <div style={{ width: 402, height: 874, background: CFG_PINK, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 700, zIndex: 0 }}>
          <SnailFigureTall entries={bloomEntries} scheduleKey={idx} />
        </div>

        <div style={{ position: 'absolute', top: 56, left: 12, zIndex: 6 }}>
          <IconBtn onClick={back} style={{ background: 'rgba(255,255,255,0.25)' }}>
            {Ic.arrowBack}
          </IconBtn>
        </div>

        <div style={{
          position: 'absolute',
          top: 120, left: 0, right: 0,
          textAlign: 'center',
          padding: '0 24px',
          zIndex: 4,
        }}>
          <h1 style={{
            font: `500 34px/1.1 ${S.serif}`,
            color: CFG_SURFACE,
            letterSpacing: -0.6,
            margin: 0,
          }}>
            {page.title}
          </h1>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 40, left: 20, right: 20,
          zIndex: 4,
        }}>
          <CfgCta onClick={() => onDone && onDone(answers)}>{page.primary}</CfgCta>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: 402, height: 874, background: CFG_CREAM, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 486, background: CFG_PINK }}>
        <SnailFigure
          entries={bloomEntries}
          swayKey={page.sway ? swayTick : undefined}
          swayLabel={page.sway ? swayLabel : undefined}
        />
      </div>

      <div style={{ position: 'absolute', top: 56, left: 12, zIndex: 6 }}>
        <IconBtn onClick={back} style={{ background: 'rgba(255,255,255,0.25)' }}>
          {Ic.arrowBack}
        </IconBtn>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 486, left: 0, right: 0, bottom: 0,
          background: CFG_CREAM,
          padding: '24px 20px 140px',
          overflowY: 'auto',
          zIndex: 3,
          textAlign: 'center',
        }}
      >
        <h1 style={{ font: `500 24px/1.25 ${S.serif}`, color: CFG_NIGHT, margin: '0 0 8px', letterSpacing: -0.4 }}>
          {page.title}
        </h1>
        {page.subtitle && (
          <p style={{ font: `400 14px/1.5 ${S.sans}`, color: 'rgba(26,25,24,0.72)', margin: '0 auto 20px', maxWidth: 320 }}>
            {page.subtitle}
          </p>
        )}

        {page.kind === 'single' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {page.options.map(opt => (
              <CfgPill
                key={opt}
                label={opt}
                selected={answers[page.id] === opt}
                onClick={() => setSingle(page.id, opt)}
              />
            ))}
          </div>
        )}

        {page.kind === 'multi' && (() => {
          const curr = answers[page.id] || [];
          const atCap = page.cap != null && curr.length >= page.cap;
          return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {page.options.map(opt => {
                const selected = curr.includes(opt);
                return (
                  <CfgPill
                    key={opt}
                    label={opt}
                    selected={selected}
                    disabled={atCap && !selected}
                    onClick={() => toggleMulti(page.id, opt, page.cap, page.sway)}
                  />
                );
              })}
            </div>
          );
        })()}

        {page.kind === 'icons' && (() => {
          const curr = answers[page.id] || [];
          const atCap = page.cap != null && curr.length >= page.cap;
          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {page.options.map(opt => {
                const selected = curr.includes(opt);
                return (
                  <CfgIconCell
                    key={opt}
                    label={opt}
                    selected={selected}
                    disabled={atCap && !selected}
                    onClick={() => toggleMulti(page.id, opt, page.cap)}
                  />
                );
              })}
            </div>
          );
        })()}
      </div>

      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '16px 20px 36px',
          background: CFG_CREAM,
          borderTop: `1px solid ${CFG_LINE}`,
          zIndex: 5,
        }}
      >
        {page.kind === 'intro' ? (
          <>
            <CfgCta onClick={next}>{page.primary}</CfgCta>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <button
                onClick={onDismiss}
                style={{ background: 'none', border: 0, color: CFG_NIGHT, font: `500 13px/1 ${S.sans}`, letterSpacing: 0.2, cursor: 'pointer' }}
              >
                {page.secondary}
              </button>
            </div>
          </>
        ) : (
          <>
            <CfgCta onClick={next}>Continue</CfgCta>
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
      </div>
    </div>
  );
}

Object.assign(window, { ConfigurationScreen });
