// Sundial — Onboarding intro screen
// Tall, scrollable. 4 numbered steps, each with a landscape illustration.
// Step is "locked" (dotted circle + grayscale illustration) until user answers
// the sub-flow question, at which point the circle goes solid and the
// illustration fills with color.

const STEPS = [
  {
    id: 1,
    question: "What should Ash call you?",
    subtitle: "We can change this later.",
    kind: "text",
    placeholder: "Your name or a nickname",
    illo: { src: "assets/step-1.png", w: 254, h: 285, align: "right" },
  },
  {
    id: 2,
    question: "What draws you to Sundial?",
    subtitle: "Pick whatever feels closest. You can choose more than one.",
    kind: "multi",
    options: [
      "A quieter place to think",
      "A habit of reflection",
      "Someone to talk things out with",
      "Curiosity — I'm just looking around",
    ],
    illo: { src: "assets/step-2.png", w: 215, h: 348, align: "left" },
  },
  {
    id: 3,
    question: "How would you like Ash to respond?",
    subtitle: "We'll lean this way unless you tell us otherwise.",
    kind: "single",
    options: [
      "Gently — long pauses, few questions",
      "Conversational — back and forth",
      "Direct — name what you notice",
    ],
    illo: { src: "assets/step-3.png", w: 267, h: 294, align: "right" },
  },
  {
    id: 4,
    question: "When in the day do you want to check in?",
    subtitle: "A soft prompt, nothing pushy.",
    kind: "single",
    options: [
      "Morning — before the day starts",
      "Midday — a breather",
      "Evening — to wind down",
      "Whenever I open the app",
    ],
    illo: { src: "assets/step-4.png", w: 402, h: 402, align: "left" },
  },
];

/* ────────────────────────────────────────────────────────────
   Screen
   ──────────────────────────────────────────────────────────── */
function OnboardingScreen({ onDone, tweaks = {} }) {
  const {
    interaction = 'sheet',     // 'sheet' | 'tap' | 'scroll'
    showCounter = true,        // show "X of 4 answered" under disabled CTA
    ctaLabel = 'Continue',
    numberStyle = 'dashed',    // 'dashed' | 'dotted' | 'solid-outline'
    staggerLayout = true,      // numbered circles staggered L/C/R vs always centered
  } = tweaks;

  const [answers, setAnswers] = React.useState({}); // {1: 'Maya', 2: ['A quieter...'], ...}
  const [openStep, setOpenStep] = React.useState(null); // step.id or null
  const [scrollY, setScrollY] = React.useState(0);
  const scrollRef = React.useRef(null);

  const completed = (id) => answers[id] != null && (Array.isArray(answers[id]) ? answers[id].length > 0 : String(answers[id]).trim() !== "");
  const completedCount = STEPS.filter(s => completed(s.id)).length;
  const allDone = completedCount === STEPS.length;

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnswer = (stepId, value) => {
    setAnswers(prev => ({ ...prev, [stepId]: value }));
  };

  const currentStep = openStep != null ? STEPS.find(s => s.id === openStep) : null;

  // Scroll-mode: fill a step when its block reaches ~halfway up the viewport
  const [scrollFilled, setScrollFilled] = React.useState(new Set());
  React.useEffect(() => {
    if (interaction !== 'scroll') return;
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      const scope = el.getBoundingClientRect();
      const trigger = scope.top + scope.height * 0.55;
      const next = new Set(scrollFilled);
      let changed = false;
      STEPS.forEach(s => {
        const node = el.querySelector(`[data-step-id="${s.id}"]`);
        if (!node) return;
        const rect = node.getBoundingClientRect();
        if (rect.top < trigger && !next.has(s.id)) {
          next.add(s.id);
          changed = true;
        }
      });
      if (changed) setScrollFilled(next);
    };
    check();
    el.addEventListener('scroll', check, { passive: true });
    return () => el.removeEventListener('scroll', check);
  }, [interaction, scrollFilled]);

  // Sheet-mode: auto-open each step's drawer the first time its block scrolls
  // into view. Tracked per-id so a dismissed sheet won't re-open on further scroll.
  const [autoOpened, setAutoOpened] = React.useState(new Set());
  React.useEffect(() => {
    if (interaction !== 'sheet') return;
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      if (openStep != null) return;
      const scope = el.getBoundingClientRect();
      const trigger = scope.top + scope.height * 0.5;
      for (const s of STEPS) {
        if (autoOpened.has(s.id)) continue;
        if (completed(s.id)) continue;
        const node = el.querySelector(`[data-step-id="${s.id}"]`);
        if (!node) continue;
        const rect = node.getBoundingClientRect();
        if (rect.top < trigger && rect.bottom > scope.top) {
          setAutoOpened(prev => {
            const next = new Set(prev);
            next.add(s.id);
            return next;
          });
          setOpenStep(s.id);
          break;
        }
      }
    };
    el.addEventListener('scroll', check, { passive: true });
    // Fire once on mount so step 1's drawer opens even if the user
    // hasn't scrolled yet — 10s delay lets the intro register first.
    const initialOpen = setTimeout(check, 10000);
    return () => {
      clearTimeout(initialOpen);
      el.removeEventListener('scroll', check);
    };
  }, [interaction, openStep, autoOpened, answers]);

  // Override `completed` for scroll + tap modes
  const isDone = (id) => {
    if (interaction === 'scroll') return scrollFilled.has(id);
    return completed(id);
  };
  const doneCount = STEPS.filter(s => isDone(s.id)).length;
  const allComplete = doneCount === STEPS.length;

  // The next unanswered step previews in color so the user knows it's active.
  const nextUnansweredId = STEPS.find(s => !isDone(s.id))?.id;
  const isColored = (id) => isDone(id) || id === nextUnansweredId;

  // Tap-mode handler — toggle answered on click without opening a sheet
  const onStepTap = (step) => {
    if (interaction === 'sheet') {
      setOpenStep(step.id);
    } else if (interaction === 'tap') {
      setAnswers(prev => ({ ...prev, [step.id]: prev[step.id] ? null : '__tapped__' }));
    }
    // 'scroll' mode: tapping does nothing; scroll triggers fill
  };

  return (
    <div style={{ width: 402, height: 874, background: S.surface, position: 'relative', overflow: 'hidden' }}>
      {/* Full-height scroll column — header lives inside and scrolls away */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute', inset: 0,
          overflowY: 'auto', overflowX: 'hidden',
        }}
      >
        {/* Header (scrolls with content) */}
        <div style={{ padding: '136px 24px 24px', textAlign: 'center' }}>
          <h1 style={{
            font: `500 30px/1.15 ${S.serif}`,
            letterSpacing: -0.8,
            color: S.text1,
            margin: 0,
          }}>
            Ash is your space
          </h1>
          <p style={{
            font: `400 15px/1.5 ${S.sans}`,
            color: S.text2,
            margin: '12px auto 0',
            maxWidth: 280,
          }}>
            Your Ash is made just for you, so let's start by getting to know you a bit better.
          </p>
        </div>

        {/* Steps */}
        {STEPS.map((step, i) => (
          <StepBlock
            key={step.id}
            step={step}
            index={i}
            done={isDone(step.id)}
            colored={isColored(step.id)}
            onOpen={() => onStepTap(step)}
            numberStyle={numberStyle}
            staggerLayout={staggerLayout}
            isLast={i === STEPS.length - 1}
          />
        ))}

        {/* Continue CTA sits on the grass — green when step 4 is colored-in,
            otherwise a neutral gray that matches step 4's grayscale state. */}
        <div style={{
          background: isColored(4) ? '#077B2B' : '#959593',
          padding: '40px 16px 56px',
          transition: 'background 320ms cubic-bezier(0.2,0,0,1)',
        }}>
          <BarBtn
            variant="primary"
            onClick={() => onDone && onDone(answers)}
            style={{
              width: '100%',
            }}
          >
            {ctaLabel}
          </BarBtn>
          {!allComplete && showCounter && (
            <div style={{
              textAlign: 'center',
              marginTop: 12,
              font: `400 12px/1.4 ${S.sans}`,
              color: S.plumLo,
            }}>
              {doneCount} of {STEPS.length} answered
            </div>
          )}
        </div>
      </div>

      {/* Sub-flow sheet */}
      <SubFlowSheet
        step={currentStep}
        answer={currentStep ? answers[currentStep.id] : undefined}
        onClose={() => setOpenStep(null)}
        onSubmit={(value) => {
          const justAnswered = currentStep;
          if (justAnswered) handleAnswer(justAnswered.id, value);
          setOpenStep(null);
          // Auto-scroll to the next step block
          if (justAnswered) {
            const nextId = justAnswered.id + 1;
            const el = scrollRef.current;
            if (el && nextId <= STEPS.length) {
              setTimeout(() => {
                const node = el.querySelector(`[data-step-id="${nextId}"]`);
                if (node) {
                  const scopeTop = el.getBoundingClientRect().top;
                  const nodeTop = node.getBoundingClientRect().top;
                  const target = el.scrollTop + (nodeTop - scopeTop) - 60;
                  el.scrollTo({ top: target, behavior: 'smooth' });
                }
                // Open the next step's drawer after the scroll kicks off.
                setTimeout(() => {
                  setAutoOpened(prev => {
                    const next = new Set(prev);
                    next.add(nextId);
                    return next;
                  });
                  setOpenStep(nextId);
                }, 450);
              }, 320); // wait for sheet dismiss
            } else if (el) {
              // Step 4 answered — scroll to CTA
              setTimeout(() => {
                el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
              }, 320);
            }
          }
        }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Step block — renders the actual scene illustration. The numbered circle
   is baked into each image, so no overlay is drawn on top.
   "Locked" state desaturates the image; "done" state shows full color.
   ──────────────────────────────────────────────────────────── */
function StepBlock({ step, index, done, colored, onOpen, numberStyle = 'dashed', staggerLayout = true, isLast = false }) {
  const align = step.illo?.align || 'center';
  const fullWidth = !!step.illo?.fullWidth;
  const justify = fullWidth
    ? 'stretch'
    : !staggerLayout
    ? 'center'
    : align === 'left' ? 'flex-start'
    : align === 'right' ? 'flex-end'
    : 'center';

  const FRAME_W = 402;
  const scale = fullWidth ? FRAME_W / step.illo.w : 1;

  return (
    <div
      data-step-id={step.id}
      style={{
        display: 'flex',
        justifyContent: justify,
        padding: 0,
        marginBottom: isLast ? 0 : 12,
      }}
    >
      <button
        onClick={onOpen}
        style={{
          border: 0, background: 'transparent',
          padding: 0, margin: 0,
          cursor: 'pointer',
          display: 'block',
          position: 'relative',
          width: fullWidth ? '100%' : 'auto',
        }}
      >
        <img
          src={step.illo.src}
          alt=""
          width={step.illo.w}
          height={step.illo.h}
          style={{
            display: 'block',
            width: fullWidth ? '100%' : undefined,
            maxWidth: '100%',
            height: 'auto',
            filter: colored
              ? 'none'
              : 'grayscale(100%) opacity(0.55)',
            transition: 'filter 320ms cubic-bezier(0.2,0,0,1)',
          }}
        />
        {done && <DoneCheckmark step={step} scale={scale} />}
      </button>
    </div>
  );
}

function DoneCheckmark({ step, scale = 1 }) {
  // Pixel positions of the baked-in 40×40 number circle in each source image (natural size).
  const rawPositions = {
    1: { top: 0, left: 132 },
    2: { top: 0, left: 70 },
    3: { top: 0, right: 32 },
    4: { top: 44, left: 32 },
  };
  const raw = rawPositions[step.id] || { top: 0, left: 0 };
  const pos = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, v * scale]));
  const size = 40 * scale;
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        ...pos,
        width: size, height: size, borderRadius: 9999,
        background: S.plum,
        border: `1px solid ${S.plum}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: S.plumLo,
        font: `500 ${15 * scale}px/1 ${S.sans}`,
        boxShadow: `0 0 0 ${3 * scale}px #EBE7DE`,
      }}
    >
      {step.id}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Sub-flow sheet (modal)
   ──────────────────────────────────────────────────────────── */
function SubFlowSheet({ step, answer, onClose, onSubmit }) {
  const open = step != null;
  // Local state lives inside the sheet while open, committed on "Save"
  const [draft, setDraft] = React.useState(answer ?? (step?.kind === 'multi' ? [] : ''));
  React.useEffect(() => {
    if (open) setDraft(answer ?? (step.kind === 'multi' ? [] : ''));
  }, [open, step?.id]);

  const canSave = step && (
    step.kind === 'multi' ? (Array.isArray(draft) && draft.length > 0)
    : String(draft ?? '').trim() !== ''
  );

  return (
    <>
      {/* scrim */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0, zIndex: 30,
          background: 'rgba(26,25,24,0.4)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 200ms cubic-bezier(0.2,0,0,1)',
        }}
      />
      {/* sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        zIndex: 31,
        background: S.raised,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        boxShadow: '0 -8px 24px rgba(26,25,24,0.10)',
        transform: `translateY(${open ? 0 : 100}%)`,
        transition: 'transform 260ms cubic-bezier(0.2,0,0,1)',
        padding: '12px 20px 28px',
        maxHeight: '84%',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* grabber */}
        <div style={{ alignSelf: 'center', width: 40, height: 4, borderRadius: 9999, background: S.lineStrong, marginBottom: 14 }} />

        {step && (
          <>
            <div style={{ marginBottom: 14 }}>
              <div style={{
                font: `500 11px/1 ${S.sans}`, letterSpacing: 1.5,
                textTransform: 'uppercase', color: S.text3,
              }}>Step {step.id} of 4</div>
            </div>

            <h2 style={{
              font: `500 24px/1.25 ${S.serif}`, letterSpacing: -0.5,
              color: S.text1, margin: '0 0 8px',
            }}>{step.question}</h2>
            <p style={{
              font: `400 14px/1.5 ${S.sans}`, color: S.text2,
              margin: '0 0 20px',
            }}>{step.subtitle}</p>

            {/* Input surface per kind */}
            <div style={{ overflowY: 'auto', paddingBottom: 8 }}>
              {step.kind === 'text' && (
                <input
                  autoFocus
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  placeholder={step.placeholder}
                  style={{
                    width: '100%', border: 0, outline: 0,
                    background: S.sunken,
                    padding: '16px 18px',
                    borderRadius: 16,
                    font: `400 16px/1.5 ${S.sans}`,
                    color: S.text1,
                  }}
                />
              )}

              {step.kind === 'single' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {step.options.map(opt => {
                    const selected = draft === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setDraft(opt)}
                        style={{
                          textAlign: 'left',
                          padding: '16px 18px',
                          borderRadius: 16,
                          border: `1px solid ${selected ? S.plum : S.line}`,
                          background: selected ? S.plumXLo : S.surface,
                          color: S.text1,
                          font: `400 15px/1.4 ${S.sans}`,
                          cursor: 'pointer',
                          transition: 'background 120ms, border-color 120ms',
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {step.kind === 'multi' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {step.options.map(opt => {
                    const set = new Set(Array.isArray(draft) ? draft : []);
                    const selected = set.has(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          const next = new Set(set);
                          if (next.has(opt)) next.delete(opt); else next.add(opt);
                          setDraft([...next]);
                        }}
                        style={{
                          textAlign: 'left',
                          padding: '16px 18px',
                          borderRadius: 16,
                          border: `1px solid ${selected ? S.plum : S.line}`,
                          background: selected ? S.plumXLo : S.surface,
                          color: S.text1,
                          font: `400 15px/1.4 ${S.sans}`,
                          cursor: 'pointer',
                          transition: 'background 120ms, border-color 120ms',
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              <BarBtn
                variant="primary"
                onClick={() => onSubmit(draft)}
                style={{ flex: 1 }}
              >
                {step.id === 4 ? 'Done' : 'Next'}
              </BarBtn>
            </div>
          </>
        )}
      </div>
    </>
  );
}

Object.assign(window, { OnboardingScreen });
