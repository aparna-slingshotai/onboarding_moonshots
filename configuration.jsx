// Sundial — Configuration flow (5 pages, post-onboarding)
// A stylized tree grows on the top half of each screen; every selection
// blooms a new flower whose "bed" (inner disk) is tinted with the color
// assigned to that option, Jack-and-the-beanstalk style.

const CFG_PINK  = '#E84B8C';
const CFG_KHAKI = '#9B8236';
const CFG_CREAM = '#EEE8D4';
const CFG_NIGHT = '#1A1918';
const CFG_LINE  = '#E2DDD4';
// Sundial surface color — matches the app's default background; used for
// the overlaid text/CTA on the final screen per the design system.
const CFG_SURFACE = '#EBE7DE';

// Palette pulled from the Sundial design tokens. Each accent pill/option
// gets assigned one of these; the flower bed it blooms inherits the same
// hex so there's a direct 1:1 between what the user tapped and what
// lands on the tree.
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

// Explicit color-per-option map. Q1 follows the Sundial figma exactly;
// the rest cycle through the accent palette deterministically so each
// label always lands on the same color.
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

// Max selections for the personality page — after this the remaining
// options go inactive and every additional tap just re-sways the tree.
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
  },
  {
    kind: 'multi',
    id: 'personality',
    title: 'Nice. How about my personality?',
    subtitle: "I'll use this as a guide for how I talk with you, but we can always switch it up later.",
    options: ['Warm', 'Direct', 'Sarcastic', 'Laid-back', 'Quirky', 'Wise', 'Humorous', 'Nerdy'],
    cap: PERSONALITY_MAX,  // see tweak: capped selection, sways instead of blooming
    sway: true,
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

// Flower slots on the tree. Earlier slots are big and crown-anchored so
// the tree never looks bare; later slots get smaller so that extra
// selections read as "tiny new blooms on new branches" rather than
// overtaking the canopy (tweak: >5 selections = small flowers/branches
// instead of figures).
const CFG_FLOWERS = [
  { x: 206, y: 92,  r: 50 },   // 0 crown
  { x: 104, y: 132, r: 42 },   // 1 left upper
  { x: 300, y: 140, r: 48 },   // 2 right upper
  { x: 66,  y: 212, r: 38 },   // 3 left mid
  { x: 334, y: 222, r: 42 },   // 4 right mid
  { x: 180, y: 184, r: 32 },   // 5 center-left small
  { x: 240, y: 198, r: 30 },   // 6 center-right small
  { x: 134, y: 274, r: 30 },   // 7 left lower
  { x: 268, y: 276, r: 30 },   // 8 right lower
  // Beyond here: tiny ornaments on offshoot branches.
  { x: 92,  y: 100, r: 20 },   // 9
  { x: 324, y: 90,  r: 20 },   // 10
  { x: 208, y: 148, r: 18 },   // 11
  { x: 158, y: 96,  r: 18 },   // 12
  { x: 258, y: 104, r: 16 },   // 13
  { x: 198, y: 240, r: 18 },   // 14
  { x: 44,  y: 170, r: 14 },   // 15 tiny far-left
  { x: 358, y: 188, r: 14 },   // 16 tiny far-right
  { x: 118, y: 58,  r: 14 },   // 17 tiny high-left
  { x: 288, y: 58,  r: 14 },   // 18 tiny high-right
  { x: 170, y: 296, r: 12 },   // 19 tiny low-left
  { x: 236, y: 296, r: 12 },   // 20 tiny low-right
];
// Anything past this index is treated as an "offshoot" — comes with its
// own tiny branch stub poking out from the trunk.
const TINY_START = 15;

// Tiny extra branches that only render once the user has gone past the
// main bloom slots. Paired 1:1 with CFG_FLOWERS[TINY_START...] so each
// tiny bloom sits on the end of its new little twig.
const CFG_TINY_BRANCHES = [
  { d: 'M 64 184 Q 52 176 46 170', w: 6 },
  { d: 'M 340 200 Q 352 194 358 188', w: 6 },
  { d: 'M 140 104 Q 128 80 118 58', w: 6 },
  { d: 'M 272 110 Q 282 84 288 58', w: 6 },
  { d: 'M 166 284 Q 168 292 170 296', w: 5 },
  { d: 'M 240 286 Q 238 292 236 296', w: 5 },
];

// One cotton-puff flower. `bedColor` paints the inner "bed" (the dot of
// color that marks a flower as user-induced vs a baseline cream bloom).
function CfgFlower({ x, y, r, bedColor, delay }) {
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
      {bedColor && (
        <circle cx={x} cy={y} r={r * 0.36} fill={bedColor} />
      )}
    </g>
  );
}

// Tree — trunk + branches + progressive flowers. `selections` is an
// array of option labels in the order they were selected; that order
// drives both which flower slot opens next and what color its bed is.
function ConfigurationTree({ baseline, selections, replay, swayKey, fullScreen }) {
  const bloomCount = Math.min(CFG_FLOWERS.length, baseline + selections.length);

  // Staggered delays when we're on the final screen replaying the growth.
  const delayFor = (i) => replay ? i * 140 : 0;
  // When a bloom is past the TINY_START index, we also want its matching
  // twig visible.
  const tinyBranchesVisible = Math.max(0, bloomCount - TINY_START);

  // Trigger the sway by resetting the animation imperatively instead of
  // re-mounting the group (which would replay every flower's bloom).
  const swayRef = React.useRef(null);
  React.useEffect(() => {
    if (!swayKey || !swayRef.current) return;
    const el = swayRef.current;
    el.style.animation = 'none';
    // force a reflow so the browser registers the reset
    void el.getBoundingClientRect();
    el.style.animation = 'cfgSway 560ms cubic-bezier(0.4,0,0.2,1) both';
  }, [swayKey]);

  // Tree SVG viewBox is fixed; fullScreen pages render it with
  // xMidYMax-slice so the trunk anchors to the bottom of the phone.
  return (
    <svg
      viewBox="0 0 402 350"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMax meet"
      style={{ display: 'block' }}
    >
      <style>{`
        @keyframes cfgBloom {
          0%   { transform: scale(0.2); opacity: 0; }
          55%  { opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes cfgSway {
          0%   { transform: rotate(0deg); }
          25%  { transform: rotate(1.8deg); }
          60%  { transform: rotate(-1.4deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
      <rect width="402" height="350" fill={CFG_PINK} />
      <circle cx="358" cy="46" r="10" fill={CFG_CREAM} />

      {/* Wrap trunk + flowers in a swayable group. Animation is reset
          imperatively (see useEffect above) so new flowers that just
          bloomed don't get remounted on every sway trigger. */}
      <g
        ref={swayRef}
        style={{ transformOrigin: '200px 350px' }}
      >
        <g stroke={CFG_KHAKI} strokeLinecap="round" fill="none">
          <path d="M 200 360 C 195 310 215 262 200 218 C 186 178 220 138 206 100" strokeWidth="44" />
          <path d="M 204 130 Q 154 122 98  132" strokeWidth="22" />
          <path d="M 210 152 Q 260 146 302 152" strokeWidth="22" />
          <path d="M 198 214 Q 134 210 70  214" strokeWidth="22" />
          <path d="M 212 228 Q 280 224 332 222" strokeWidth="20" />
          <path d="M 200 288 Q 168 282 134 276" strokeWidth="14" />
          <path d="M 210 292 Q 242 284 272 280" strokeWidth="14" />
          {CFG_TINY_BRANCHES.slice(0, tinyBranchesVisible).map((b, i) => (
            <path key={i} d={b.d} strokeWidth={b.w} />
          ))}
        </g>

        {CFG_FLOWERS.slice(0, bloomCount).map((f, i) => {
          // First `baseline` slots are plain cream "background" flowers;
          // slots from baseline onward are mapped to user selections.
          const selectionIdx = i - baseline;
          const pick = selectionIdx >= 0 ? selections[selectionIdx] : null;
          const bed = pick ? CFG_COLORS[pick] : null;
          return (
            <CfgFlower
              key={`${i}-${pick || ''}-${replay ? 'r' : 'q'}`}
              x={f.x} y={f.y} r={f.r}
              bedColor={bed}
              delay={delayFor(i)}
            />
          );
        })}
      </g>
    </svg>
  );
}

// CTA button matching Sundial's Bar Button token (see Figma 9490-2317):
// 18px Google Sans Medium, -0.25 letter spacing, 16px radius, plum bg.
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

function ConfigurationScreen({ onDone, onDismiss, onBack }) {
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  // Bumped each time the user taps a personality pill (or a capped-out
  // option) so the tree can re-trigger its sway animation.
  const [swayTick, setSwayTick] = React.useState(0);
  const page = CFG_PAGES[idx];

  // Selections that should show up as flowers. Q3 (personality) is
  // intentionally excluded — it expresses itself via sway, not blooms.
  const bloomSelections = React.useMemo(() => [
    ...(answers.style ? [answers.style] : []),
    ...(answers.perspectives || []),
    ...(answers.topics || []),
  ], [answers]);

  const baseline = idx === 0 ? 3 : Math.max(3, idx + 2);
  const isFinal = page.kind === 'done';

  const next = () => setIdx(i => Math.min(i + 1, CFG_PAGES.length - 1));
  const back = () => {
    if (idx === 0) { onBack && onBack(); return; }
    setIdx(i => Math.max(i - 1, 0));
  };

  const setSingle = (id, v) => setAnswers(prev => ({
    ...prev,
    [id]: prev[id] === v ? null : v,   // tap-again-to-clear
  }));

  const toggleMulti = (id, v, cap, sway) => setAnswers(prev => {
    const curr = prev[id] || [];
    const has = curr.includes(v);
    if (sway) setSwayTick(t => t + 1);
    if (!has && cap && curr.length >= cap) {
      // At cap: disallow adding more, but still let the tree sway.
      return prev;
    }
    return { ...prev, [id]: has ? curr.filter(x => x !== v) : [...curr, v] };
  });

  if (isFinal) {
    return (
      <div style={{ width: 402, height: 874, background: CFG_PINK, position: 'relative', overflow: 'hidden' }}>
        {/* Full-screen pink sky with the tree sprouting from the bottom.
            The tree SVG keeps its natural 402×350 size (no scaling so the
            flowers stay readable); the surrounding pink extends up to
            fill the rest of the screen. */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 350, zIndex: 0 }}>
          <ConfigurationTree
            baseline={baseline}
            selections={bloomSelections}
            replay
          />
        </div>

        {/* Back arrow (requested on every page, including this one). */}
        <div style={{ position: 'absolute', top: 56, left: 12, zIndex: 6 }}>
          <IconBtn onClick={back} style={{ background: 'rgba(255,255,255,0.25)' }}>
            {Ic.arrowBack}
          </IconBtn>
        </div>

        {/* Overlay text — cream color (Sundial surface) over the pink sky. */}
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

        {/* CTA floats over the image, near the bottom. */}
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
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 350 }}>
        <ConfigurationTree
          baseline={baseline}
          selections={bloomSelections}
          swayKey={page.sway ? swayTick : undefined}
        />
      </div>

      {/* Back button on every page (intro goes back to the map). */}
      <div style={{ position: 'absolute', top: 56, left: 12, zIndex: 6 }}>
        <IconBtn onClick={back} style={{ background: 'rgba(255,255,255,0.25)' }}>
          {Ic.arrowBack}
        </IconBtn>
      </div>

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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
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
