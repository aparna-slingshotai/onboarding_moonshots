// Sundial — "The map of you"
// Procedural river that connects 4 points. Each point's distance from the
// river's center is driven by the user's answer, so the river's shape is
// unique per person.

// Each option maps to a shift: `d` is a distance multiplier (0..1 range
// added to the base radius), `a` is a small angle offset (radians). Together
// these spread points noticeably and give each combo a distinct silhouette.
const OPTION_SHIFTS = {
  // Step 1 is a name (text); weight driven by name length instead.
  1: { __default__: { d: 0.5, a: 0 } },
  2: {
    "A quieter place to think":             { d: 0.80, a: -0.25 },
    "A habit of reflection":                { d: 0.40, a:  0.10 },
    "Someone to talk things out with":      { d: 1.00, a: -0.35 },
    "Curiosity — I'm just looking around":  { d: 0.20, a:  0.30 },
    __default__: { d: 0.5, a: 0 },
  },
  3: {
    "Gently — long pauses, few questions":  { d: 0.25, a:  0.30 },
    "Conversational — back and forth":      { d: 0.60, a: -0.10 },
    "Direct — name what you notice":        { d: 1.00, a: -0.30 },
    __default__: { d: 0.5, a: 0 },
  },
  4: {
    "Morning — before the day starts":      { d: 0.30, a:  0.25 },
    "Midday — a breather":                  { d: 0.55, a: -0.05 },
    "Evening — to wind down":               { d: 0.80, a: -0.20 },
    "Whenever I open the app":              { d: 1.00, a:  0.35 },
    __default__: { d: 0.5, a: 0 },
  },
};

// Base angle (radians) per step — roughly an upper-left / upper-right /
// lower-right / lower-left quadrant layout.
const BASE_ANGLES = {
  1: Math.PI + Math.PI / 5,    // ~216° (upper-left)
  2: -Math.PI / 5,             // ~-36° (upper-right)
  3: Math.PI / 4,              // ~45°  (lower-right)
  4: Math.PI - Math.PI / 4,    // ~135° (lower-left)
};

function stepShift(stepId, answer) {
  const opts = OPTION_SHIFTS[stepId] || {};
  const fallback = opts.__default__ || { d: 0.5, a: 0 };
  // Step 1 — use name length as a gentle distance nudge, angle stays fixed.
  if (stepId === 1) {
    if (typeof answer === 'string' && answer.trim()) {
      const len = answer.trim().length;
      const d = Math.max(0.2, Math.min(1.0, len / 12)); // 0 chars→0.2, 12+→1.0
      return { d, a: 0 };
    }
    return fallback;
  }
  if (answer == null) return fallback;
  if (Array.isArray(answer)) {
    if (answer.length === 0) return fallback;
    const shifts = answer.map(a => opts[a] || fallback);
    return {
      d: shifts.reduce((s, x) => s + x.d, 0) / shifts.length,
      a: shifts.reduce((s, x) => s + x.a, 0) / shifts.length,
    };
  }
  if (typeof answer === 'string') {
    return opts[answer] || fallback;
  }
  return fallback;
}

// Given consecutive points, build a path with slight perpendicular sway so
// the river doesn't look like straight segments.
function buildRiverPath(points) {
  if (points.length < 2) return '';
  const segs = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const sway = (i % 2 === 0 ? 1 : -1) * 28;
    const cpx = mx + (-dy / len) * sway;
    const cpy = my + (dx / len) * sway;
    segs.push(`Q ${cpx} ${cpy} ${b.x} ${b.y}`);
  }
  return segs.join(' ');
}

function MapScreen({ answers = {}, onBack }) {
  const FRAME_W = 402, FRAME_H = 874;
  const cx = 210, cy = 498;           // river center on the canvas
  const baseR = 70, range = 130;      // distance range: 70 (closest) .. 200 (farthest)
  // Clamp so points don't run off the screen even at max radius.
  const clampX = v => Math.max(60, Math.min(FRAME_W - 60, v));
  const clampY = v => Math.max(340, Math.min(FRAME_H - 230, v));

  const points = [1, 2, 3, 4].map(id => {
    const s = stepShift(id, answers[id]);
    const r = baseR + s.d * range;
    const angle = BASE_ANGLES[id] + s.a;
    return {
      id,
      x: clampX(cx + Math.cos(angle) * r),
      y: clampY(cy + Math.sin(angle) * r),
    };
  });

  // The figure in the top-left illustration ends in a blue splash —
  // anchor the river there so it reads as "the person steps into the river."
  const SOURCE = { x: 188, y: 282 };
  const pathD = buildRiverPath([SOURCE, ...points]);
  const BLUE = '#2E7DE7';
  const POOL_R = 46;
  const CHANNEL_W = 58;

  return (
    <div style={{ width: FRAME_W, height: FRAME_H, background: S.surface, position: 'relative', overflow: 'hidden' }}>
      {/* Figure + cliff art sits top-left, bleeds off the edges */}
      <img
        src="assets/map-figure.png"
        alt=""
        style={{
          position: 'absolute',
          left: -92, top: -78,
          width: 460, height: 460,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Procedural river: rounded connecting channels + pools at each point */}
      <svg
        viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
        width={FRAME_W} height={FRAME_H}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        aria-hidden
      >
        <path
          d={pathD}
          stroke={BLUE}
          strokeWidth={CHANNEL_W}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map(p => (
          <circle key={p.id} cx={p.x} cy={p.y} r={POOL_R} fill={BLUE} />
        ))}
      </svg>

      {/* Dashed numbered circles, sit on top of the river pools */}
      {points.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x - 20, top: p.y - 20,
            width: 40, height: 40, borderRadius: 9999,
            background: S.sunken,
            border: `1px dashed ${S.muted}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: S.muted,
            font: `600 18px/1.2 ${S.sans}`,
            zIndex: 2,
          }}
        >
          {p.id}
        </div>
      ))}

      {/* Title + subtitle near the bottom */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 96,
        textAlign: 'center',
        padding: '0 24px',
        zIndex: 3,
      }}>
        <h1 style={{
          font: `500 32px/1.4 ${S.serif}`,
          letterSpacing: -1,
          color: S.text1,
          margin: 0,
        }}>The map of you</h1>
        <p style={{
          font: `400 16px/1.5 ${S.sans}`,
          color: S.text2,
          margin: '12px auto 0',
          maxWidth: 300,
        }}>We see your story and hear who you are. This is how we see it.</p>
      </div>

      {/* Back — Sundial IconBtn pattern, sits above the status bar area */}
      {onBack && (
        <div style={{ position: 'absolute', left: 12, top: 56, zIndex: 4 }}>
          <IconBtn onClick={onBack}>{Ic.arrowBack}</IconBtn>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { MapScreen });
