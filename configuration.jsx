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
    cap: 5,
    noBeds: true,  // perspective flowers stay plain cream, no colored bed
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
        // Scale from the flower's own center so blooms open outward
        // like a bud (instead of zooming in from a corner).
        transformOrigin: 'center',
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
// Per-personality motions — each option gets its own signature movement
// so tapping "Direct" reads differently from "Wise". Values map to CSS
// keyframe name, duration (ms), and easing.
const PERSONALITY_MOTIONS = {
  Warm:       { keyframes: 'cfgSwayWarm',      dur: 900, easing: 'cubic-bezier(0.4,0,0.2,1)' },
  Direct:     { keyframes: 'cfgSwayDirect',    dur: 420, easing: 'cubic-bezier(0.25,0.8,0.25,1)' },
  Sarcastic:  { keyframes: 'cfgSwaySarcastic', dur: 600, easing: 'cubic-bezier(0.3,0.1,0.3,1)' },
  'Laid-back':{ keyframes: 'cfgSwayLaidBack',  dur: 1100, easing: 'cubic-bezier(0.45,0.05,0.55,0.95)' },
  Quirky:     { keyframes: 'cfgSwayQuirky',    dur: 700, easing: 'linear' },
  Wise:       { keyframes: 'cfgSwayWise',      dur: 1200, easing: 'cubic-bezier(0.45,0,0.55,1)' },
  Humorous:   { keyframes: 'cfgSwayHumorous',  dur: 650, easing: 'cubic-bezier(0.2,1.4,0.3,1)' },
  Nerdy:      { keyframes: 'cfgSwayNerdy',     dur: 420, easing: 'linear' },
};

// CSS for all the per-option keyframes. Injected once at the top of the
// Tree SVG so we don't fight React's dedupe.
const PERSONALITY_KEYFRAMES_CSS = `
  @keyframes cfgSwayWarm {
    0%   { transform: rotate(0deg); }
    50%  { transform: rotate(1.6deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes cfgSwayDirect {
    0%   { transform: rotate(0deg); }
    30%  { transform: rotate(4.5deg); }
    55%  { transform: rotate(2.2deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes cfgSwaySarcastic {
    0%   { transform: rotate(0deg) translateX(0); }
    40%  { transform: rotate(-2.8deg) translateX(-3px); }
    70%  { transform: rotate(1.2deg) translateX(1px); }
    100% { transform: rotate(0deg) translateX(0); }
  }
  @keyframes cfgSwayLaidBack {
    0%   { transform: rotate(0deg); }
    25%  { transform: rotate(-3.4deg); }
    75%  { transform: rotate(3deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes cfgSwayQuirky {
    0%   { transform: rotate(0deg); }
    15%  { transform: rotate(4deg); }
    30%  { transform: rotate(-3.2deg); }
    45%  { transform: rotate(2.6deg); }
    60%  { transform: rotate(-2deg); }
    80%  { transform: rotate(1deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes cfgSwayWise {
    0%   { transform: rotate(0deg) translateY(0); }
    50%  { transform: rotate(0.6deg) translateY(-1.5px); }
    100% { transform: rotate(0deg) translateY(0); }
  }
  @keyframes cfgSwayHumorous {
    0%   { transform: rotate(0deg)  scale(1); }
    35%  { transform: rotate(-1deg) scale(0.97); }
    65%  { transform: rotate(1.5deg) scale(1.03); }
    100% { transform: rotate(0deg)  scale(1); }
  }
  @keyframes cfgSwayNerdy {
    0%   { transform: rotate(0deg); }
    12%  { transform: rotate(-2.4deg); }
    24%  { transform: rotate(2.4deg); }
    36%  { transform: rotate(-1.8deg); }
    48%  { transform: rotate(1.8deg); }
    60%  { transform: rotate(-1deg); }
    100% { transform: rotate(0deg); }
  }
`;

function ConfigurationTree({ baseline, entries, swayKey, swayLabel }) {
  const bloomCount = Math.min(CFG_FLOWERS.length, baseline + entries.length);

  // When a bloom is past the TINY_START index, we also want its matching
  // twig visible.
  const tinyBranchesVisible = Math.max(0, bloomCount - TINY_START);

  // Trigger the sway by resetting the animation imperatively instead of
  // re-mounting the group (which would replay every flower's bloom).
  // Each personality option has its own keyframe so the motion feels
  // distinct per option.
  const swayRef = React.useRef(null);
  React.useEffect(() => {
    if (!swayKey || !swayRef.current) return;
    const motion = PERSONALITY_MOTIONS[swayLabel] || {
      keyframes: 'cfgSwayWarm', dur: 600, easing: 'ease-in-out',
    };
    const el = swayRef.current;
    el.style.animation = 'none';
    // force a reflow so the browser registers the reset
    void el.getBoundingClientRect();
    el.style.animation = `${motion.keyframes} ${motion.dur}ms ${motion.easing} both`;
  }, [swayKey, swayLabel]);

  // Tree SVG viewBox is fixed; fullScreen pages render it with
  // xMidYMax-slice so the trunk anchors to the bottom of the phone.
  return (
    <svg
      viewBox="0 0 402 350"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMax meet"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <style>{`
        @keyframes cfgBloom {
          0%   { transform: scale(0.2); opacity: 0; }
          55%  { opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        ${PERSONALITY_KEYFRAMES_CSS}
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
          const entry = selectionIdx >= 0 ? entries[selectionIdx] : null;
          const label = entry ? entry.label : '';
          const bed = entry ? entry.bed : null;
          return (
            <CfgFlower
              key={`${i}-${label}`}
              x={f.x} y={f.y} r={f.r}
              bedColor={bed}
              delay={0}
            />
          );
        })}
      </g>
    </svg>
  );
}

// Tall tree for the "You're all set" page. Draws the trunk + branches
// from the bottom upward using stroke-dashoffset animation, then blooms
// each flower in sequence. The whole tree occupies the middle of the
// screen (402×700) so the title can breathe above it.
const TALL_H = 700;

// Scale the short-tree flower positions vertically (~×2.0) so the canopy
// fills the upper portion of the tall viewport.
const CFG_FLOWERS_TALL = [
  { x: 206, y: 184, r: 54 },   // 0 crown
  { x: 104, y: 264, r: 46 },   // 1 upper-left
  { x: 300, y: 280, r: 50 },   // 2 upper-right
  { x: 66,  y: 424, r: 40 },   // 3 mid-left
  { x: 334, y: 444, r: 44 },   // 4 mid-right
  { x: 180, y: 368, r: 34 },   // 5 center-left small
  { x: 240, y: 396, r: 32 },   // 6 center-right small
  { x: 134, y: 548, r: 32 },   // 7 lower-left
  { x: 268, y: 552, r: 32 },   // 8 lower-right
  { x: 92,  y: 200, r: 22 },   // 9 tiny far-left high
  { x: 324, y: 180, r: 22 },   // 10 tiny far-right high
  { x: 208, y: 296, r: 20 },   // 11 under-crown
  { x: 158, y: 192, r: 20 },   // 12 crown-left
  { x: 258, y: 208, r: 18 },   // 13 crown-right
  { x: 198, y: 480, r: 20 },   // 14 mid-spine
];

// Trunk + branch paths for the tall tree. Trunk goes bottom→top so its
// stroke-dasharray animation reads as "growing up".
const TALL_TRUNK = 'M 200 720 C 195 600 215 480 200 370 C 186 270 220 160 206 80';
const TALL_BRANCHES = [
  { d: 'M 204 240 Q 154 232 98  264',  w: 22, start: 0.74 },  // matches flower 1
  { d: 'M 210 284 Q 260 272 302 288',  w: 22, start: 0.71 },  // matches flower 2
  { d: 'M 198 408 Q 134 404 70  420',  w: 22, start: 0.47 },  // matches flower 3
  { d: 'M 212 440 Q 280 432 332 428',  w: 20, start: 0.43 },  // matches flower 4
  { d: 'M 200 552 Q 168 540 134 528',  w: 14, start: 0.26 },  // matches flower 7
  { d: 'M 210 560 Q 242 548 272 540',  w: 14, start: 0.23 },  // matches flower 8
];

function ConfigurationTreeTall({ entries, baseline, scheduleKey }) {
  // Total number of flowers the user has earned so far, capped.
  const bloomCount = Math.min(CFG_FLOWERS_TALL.length, baseline + entries.length);
  const trunkRef = React.useRef(null);
  const branchRefs = React.useRef([]);
  const flowerRefs = React.useRef([]);

  // Kick off the grow-from-bottom choreography on mount (or whenever a
  // scheduleKey changes, so back-and-forward re-plays the animation).
  React.useEffect(() => {
    // Trunk: draw 0→100 over 1600ms.
    const trunk = trunkRef.current;
    if (trunk) {
      trunk.style.animation = 'none';
      void trunk.getBoundingClientRect();
      trunk.style.animation = 'cfgGrow 1800ms cubic-bezier(0.2,0.6,0.2,1) both';
    }
    // Branches: each begins when trunk visually reaches its y (start
    // fraction), so upper branches appear later than lower.
    branchRefs.current.forEach((el, i) => {
      if (!el) return;
      const b = TALL_BRANCHES[i];
      const delay = 1800 * b.start;
      el.style.animation = 'none';
      void el.getBoundingClientRect();
      el.style.animation = `cfgGrow 600ms cubic-bezier(0.2,0.6,0.2,1) ${delay}ms both`;
    });
    // Flowers: bloom after the trunk has grown past them. Lower y ↓
    // (higher on screen) = later delay.
    flowerRefs.current.forEach((el, i) => {
      if (!el) return;
      const f = CFG_FLOWERS_TALL[i];
      // Map y from the upper canopy band (60…600) to 0…1 progress
      const trunkProgress = Math.max(0, Math.min(1, (720 - f.y) / (720 - 80)));
      const delay = 1400 + trunkProgress * 900;
      el.style.animation = 'none';
      void el.getBoundingClientRect();
      el.style.animation = `cfgBloom 560ms cubic-bezier(0.2,1.2,0.2,1) ${delay}ms both`;
    });
  }, [scheduleKey]);

  return (
    <svg
      viewBox={`0 0 402 ${TALL_H}`}
      width="100%" height="100%"
      preserveAspectRatio="xMidYMax meet"
      style={{ display: 'block' }}
    >
      <style>{`
        /* Start the path invisible and snap to visible once the
           animation begins, so the rounded linecap doesn't render as a
           stray dot during the delay period. */
        @keyframes cfgGrow {
          0%   { opacity: 0; stroke-dashoffset: 100; }
          2%   { opacity: 1; stroke-dashoffset: 99;  }
          100% { opacity: 1; stroke-dashoffset: 0;   }
        }
        @keyframes cfgBloom {
          0%   { transform: scale(0.15); opacity: 0; }
          55%  { opacity: 1; }
          100% { transform: scale(1);    opacity: 1; }
        }
      `}</style>
      <rect width="402" height={TALL_H} fill={CFG_PINK} />
      <g stroke={CFG_KHAKI} strokeLinecap="round" fill="none">
        <path
          ref={trunkRef}
          d={TALL_TRUNK}
          strokeWidth="46"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
        />
        {TALL_BRANCHES.map((b, i) => (
          <path
            key={i}
            ref={el => (branchRefs.current[i] = el)}
            d={b.d}
            strokeWidth={b.w}
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
        ))}
      </g>
      {CFG_FLOWERS_TALL.slice(0, bloomCount).map((f, i) => {
        const selectionIdx = i - baseline;
        const entry = selectionIdx >= 0 ? entries[selectionIdx] : null;
        const bed = entry ? entry.bed : null;
        const bumps = [
          { dx: -f.r * 0.55, dy: -f.r * 0.15, fr: f.r * 0.62 },
          { dx:  f.r * 0.55, dy: -f.r * 0.05, fr: f.r * 0.6 },
          { dx:  f.r * 0.08, dy: -f.r * 0.65, fr: f.r * 0.55 },
          { dx: -f.r * 0.18, dy:  f.r * 0.55, fr: f.r * 0.48 },
        ];
        return (
          <g
            key={i}
            ref={el => (flowerRefs.current[i] = el)}
            style={{
              opacity: 0,
              transformOrigin: 'center',
              transformBox: 'fill-box',
            }}
          >
            <circle cx={f.x} cy={f.y} r={f.r} fill={CFG_CREAM} />
            {bumps.map((b, j) => (
              <circle key={j} cx={f.x + b.dx} cy={f.y + b.dy} r={b.fr} fill={CFG_CREAM} />
            ))}
            {bed && <circle cx={f.x} cy={f.y} r={f.r * 0.36} fill={bed} />}
          </g>
        );
      })}
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
  // Bumped each time the user taps a personality pill so the tree can
  // re-trigger its sway animation. `swayLabel` is the label of the
  // option last tapped, so each option drives its own motion.
  const [swayTick, setSwayTick] = React.useState(0);
  const [swayLabel, setSwayLabel] = React.useState(null);
  const page = CFG_PAGES[idx];

  // Selections that should show up as flowers, tagged with their bed
  // color. Q3 (personality) is intentionally excluded — it sways the
  // tree instead of blooming. Q2 (perspectives) blooms plain cream
  // flowers (no colored bed) so the icon grid reads as its own
  // category, per design.
  const bloomEntries = React.useMemo(() => {
    const out = [];
    if (answers.style) out.push({ label: answers.style, bed: CFG_COLORS[answers.style] });
    (answers.perspectives || []).forEach(l => out.push({ label: l, bed: null }));
    (answers.topics || []).forEach(l => out.push({ label: l, bed: CFG_COLORS[l] }));
    return out;
  }, [answers]);

  // Baseline is fixed at 3 so a selection flower stays pinned to its slot
  // across pages (previously the baseline grew with the page index,
  // which visually "relocated" already-bloomed flowers).
  const baseline = 3;
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
    if (sway) {
      setSwayTick(t => t + 1);
      setSwayLabel(v);
    }
    if (!has && cap && curr.length >= cap) {
      // At cap: disallow adding more, but still let the tree sway.
      return prev;
    }
    return { ...prev, [id]: has ? curr.filter(x => x !== v) : [...curr, v] };
  });

  if (isFinal) {
    return (
      <div style={{ width: 402, height: 874, background: CFG_PINK, position: 'relative', overflow: 'hidden' }}>
        {/* Full-screen pink sky with a tall tree growing from the bottom.
            The tall tree occupies the middle band of the phone — trunk
            draws from bottom up, flowers bloom in sequence as it grows. */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 700, zIndex: 0 }}>
          <ConfigurationTreeTall
            baseline={baseline}
            entries={bloomEntries}
            scheduleKey={idx}
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
      {/* Tree gets the upper ~55% of the phone so it has room to breathe;
          title + options live in the lower half, pushed toward the CTA.
          Pink bg on the container so the sky fills the whole top area
          above the tree's own canvas. */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 486, background: CFG_PINK }}>
        <ConfigurationTree
          baseline={baseline}
          entries={bloomEntries}
          swayKey={page.sway ? swayTick : undefined}
          swayLabel={page.sway ? swayLabel : undefined}
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
