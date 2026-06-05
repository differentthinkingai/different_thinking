const engines = {
  PS: { name: "Pattern Synthesis", label: "Non-linear problem solving", color: "#58d7c4" },
  MI: { name: "Motivated Immersion", label: "Interest-driven focus", color: "#65d09b" },
  RA: { name: "Rapid Activation", label: "Quick-start energy", color: "#f5b85d" },
  ER: { name: "Emotional Resonance", label: "Intuitive connection", color: "#ff8faf" }
};

const archetypes = {
  "PS-MI": ["The Weaver", "Deep Pattern Weaver", "You investigate complex information, anticipate second-order effects, and design robust systems."],
  "PS-RA": ["The Spark", "Fast Clarity Spark", "You spot connections quickly and create clarity through immediate movement."],
  "PS-ER": ["The Mapper", "Meaningful Map Maker", "You connect values with systemic planning and find mission-critical paths."],
  "MI-PS": ["The Builder", "Focused Insight Builder", "You build nuanced models through deep immersion and careful expertise."],
  "MI-RA": ["The Accelerator", "Rapid Skill Builder", "You learn through direct kinetic action and turn interest into skill quickly."],
  "MI-ER": ["The Guide", "Purposeful Deep Guide", "You create calm expertise rooted in care, depth, and relational value."],
  "RA-PS": ["The Activator", "Smart Quick Starter", "You move first, test fast, and create momentum when others are still framing the problem."],
  "RA-MI": ["The Focuser", "Fast Focus Maker", "You build and stabilise momentum into high-output sprints."],
  "RA-ER": ["The Launcher", "Mission Momentum Maker", "You rally people toward a cause with infectious speed."],
  "ER-PS": ["The Visionary", "Heart-Led Vision", "You turn deeply held values into maps for meaningful change."],
  "ER-MI": ["The Mentor", "Caring Knowledge Guide", "You make support sustainable through focused care and practical wisdom."],
  "ER-RA": ["The Igniter", "Purpose Action Spark", "You turn meaning into the first viable step."],
};

const orbAssets = {
  "The Weaver": "12orbpng/The Weaver Orb.png",
  "The Spark": "12orbpng/The Spark Orb.png",
  "The Mapper": "12orbpng/The Mapper Orb.png",
  "The Builder": "12orbpng/The Builder Orb.png",
  "The Accelerator": "12orbpng/The Accelerator Orb.png",
  "The Guide": "12orbpng/The Guide Orb.png",
  "The Activator": "12orbpng/The Activator Orb.png",
  "The Focuser": "12orbpng/The Focuser Orb.png",
  "The Launcher": "12orbpng/The Launcher Orb.png",
  "The Visionary": "12orbpng/The Visionary Orb.png",
  "The Mentor": "12orbpng/The Mentor Orb.png",
  "The Igniter": "12orbpng/The Igniter Orb.png"
};

const engineReveal = {
  PS: {
    title: "Pattern synthesis",
    landscapeLabel: "Non-linear problem solving",
    core: "You see the <strong>pattern</strong> before everyone has named the pieces. Your strength is finding the <strong>shape</strong> inside complexity.",
    compass: "You trust the hidden <strong>structure</strong>. When life feels noisy, the pattern tells you where to <strong>move</strong>."
  },
  MI: {
    title: "Motivated immersion",
    landscapeLabel: "Interest-driven focus",
    core: "You go <strong>deep</strong> when something matters. Focus arrives when interest gives your mind somewhere to <strong>land</strong>.",
    compass: "Depth is your <strong>compass</strong>. You move best when the work becomes rich enough to hold your <strong>attention</strong>."
  },
  RA: {
    title: "Rapid activation",
    landscapeLabel: "Quick-start energy",
    core: "That's not <strong>impatience</strong>. That's how you're built. You bypass friction by <strong>starting</strong> before the <strong>doubt</strong> kicks in.",
    compass: "Motion is your <strong>compass</strong>. A first step helps your system turn uncertainty into <strong>information</strong>."
  },
  ER: {
    title: "Emotional resonance",
    landscapeLabel: "Intuitive connection",
    core: "You feel what <strong>matters</strong> before it has language. Meaning gives your energy <strong>direction</strong> and weight.",
    compass: "You don't move for efficiency alone. You move when the work carries <strong>meaning</strong>, care, and real <strong>stakes</strong>."
  }
};

const revealProfiles = {
  "The Weaver": {
    tagline: "You <strong>weave</strong> complex ideas into patterns other people can finally <strong>see</strong>.",
    ability: "When your <strong>pattern-sense</strong> meets your depth, you become a weaver of complexity. You don't just collect ideas; you <strong>connect</strong> them.",
    potentialTitle: "Your depth is an asset",
    potential: "<strong>Complexity</strong> gives you energy. This can sometimes mean simple next steps feel too blunt to <strong>trust</strong>."
  },
  "The Spark": {
    tagline: "You spot connections quickly and create <strong>clarity</strong> through immediate <strong>movement</strong>.",
    ability: "When your <strong>pattern-sense</strong> meets your quick start, you become a spark for clarity. You don't just see the route; you <strong>test</strong> it.",
    potentialTitle: "Your speed is an asset",
    potential: "<strong>Clarity</strong> matters to you. This can sometimes mean your energy drops when a task has no shape to <strong>react</strong> to."
  },
  "The Mapper": {
    tagline: "You connect values with systems and find the <strong>path</strong> through <strong>complexity</strong>.",
    ability: "When your <strong>systems mind</strong> meets your care, you become a mapmaker for meaning. You don't just see the problem; you find the <strong>path</strong>.",
    potentialTitle: "Your meaning is an asset",
    potential: "You see what sits <strong>underneath</strong>. This can sometimes mean you wait for the whole map before taking the next <strong>step</strong>."
  },
  "The Builder": {
    tagline: "You turn deep focus into <strong>models</strong>, craft, and durable <strong>expertise</strong>.",
    ability: "When your <strong>depth</strong> meets your pattern-sense, you become a builder of insight. You don't just learn it; you <strong>shape</strong> it.",
    potentialTitle: "Your focus is an asset",
    potential: "<strong>Depth</strong> helps you build real mastery. This can sometimes mean starting feels hard until the model feels <strong>complete</strong>."
  },
  "The Accelerator": {
    tagline: "You turn interest into <strong>skill</strong> through fast, hands-on <strong>momentum</strong>.",
    ability: "When your <strong>focus</strong> meets your momentum, you become an accelerator for skill. You don't just practice it; you make it <strong>move</strong>.",
    potentialTitle: "Your momentum is an asset",
    potential: "<strong>Immersion</strong> turns quickly into skill for you. This can sometimes mean you outpace the support that keeps progress <strong>steady</strong>."
  },
  "The Guide": {
    tagline: "You create calm expertise rooted in <strong>care</strong>, depth, and <strong>trust</strong>.",
    ability: "When your <strong>depth</strong> meets your care, you become a guide people can trust. You don't just know the answer; you hold the <strong>person</strong>.",
    potentialTitle: "Your care is an asset",
    potential: "<strong>Quality</strong> and people both matter to you. This can sometimes mean your energy fades when the work loses depth or <strong>trust</strong>."
  },
  "The Activator": {
    tagline: "You move first, test fast, and turn <strong>uncertainty</strong> into <strong>momentum</strong>.",
    ability: "When your <strong>momentum</strong> meets your pattern-sense, you become an activator of smart action. You don't just plan the move; you make it <strong>real</strong>.",
    potentialTitle: "Your movement is an asset",
    potential: "<strong>Action</strong> helps you think clearly. This can sometimes mean you move before everyone else has caught <strong>up</strong>."
  },
  "The Focuser": {
    tagline: "You turn quick energy into <strong>focused</strong>, high-output <strong>sprints</strong>.",
    ability: "When your <strong>momentum</strong> meets your depth, you become a focuser of energy. You don't just start fast; you stay with what <strong>matters</strong>.",
    potentialTitle: "Your sprint is an asset",
    potential: "<strong>Momentum</strong> becomes powerful when it has a focus. This can sometimes mean loose priorities scatter your <strong>energy</strong>."
  },
  "The Launcher": {
    tagline: "You <strong>rally</strong> the world toward a cause with infectious <strong>speed</strong>.",
    compass: "You don't move fast for <strong>efficiency</strong>; you move fast because you <strong>care</strong>. <strong>Meaning</strong> is the fuel for your speed.",
    ability: "When your <strong>drive</strong> meets your heart, you become an <strong>engine</strong> for change. You don't just dream it; you <strong>build</strong> it.",
    potentialTitle: "Your momentum is an asset",
    potential: "<strong>Meaning</strong> is not optional for you. This can sometimes mean your energy <strong>drops</strong> when a project feels <strong>disconnected</strong>."
  },
  "The Visionary": {
    tagline: "You turn deeply held values into <strong>maps</strong> for meaningful <strong>change</strong>.",
    ability: "When your <strong>heart</strong> meets your systems mind, you become a visionary for change. You don't just feel what matters; you give it <strong>shape</strong>.",
    potentialTitle: "Your vision is an asset",
    potential: "<strong>Meaning</strong> arrives quickly for you. This can sometimes mean ordinary steps feel too small for what you can <strong>see</strong>."
  },
  "The Mentor": {
    tagline: "You make support sustainable through <strong>care</strong>, focus, and practical <strong>wisdom</strong>.",
    ability: "When your <strong>care</strong> meets your depth, you become a mentor people can lean on. You don't just support them; you make support <strong>sustainable</strong>.",
    potentialTitle: "Your steadiness is an asset",
    potential: "People trust your <strong>care</strong> and wisdom. This can sometimes mean you carry too much before naming what you <strong>need</strong>."
  },
  "The Igniter": {
    tagline: "You turn meaning into the first <strong>brave</strong> step.",
    ability: "When your <strong>meaning</strong> meets your momentum, you become an igniter of first steps. You don't just care deeply; you <strong>move</strong>.",
    potentialTitle: "Your spark is an asset",
    potential: "<strong>Meaning</strong> pulls you into motion. This can sometimes mean urgency rises before the plan has enough <strong>shape</strong>."
  }
};

const questions = [
  ["PS", "MI", "I connect ideas from different places until a new pattern becomes obvious.", "I go deep when something matters and stay with it until it opens up."],
  ["PS", "RA", "I like understanding the shape of a problem before choosing the next move.", "I like to try a small first step right away so I can learn fast."],
  ["PS", "ER", "I notice the hidden structure behind what people are saying.", "I can feel what matters in a room before anyone names it."],
  ["MI", "PS", "I can lose track of time when I am exploring something that grips me.", "I naturally zoom out and see how all the pieces connect."],
  ["MI", "RA", "I build confidence by immersing myself until the skill starts to feel mine.", "I build confidence by getting into motion and improving as I go."],
  ["MI", "ER", "My best work comes when I can protect enough depth to really care about quality.", "My best work comes when I understand who it helps and why it matters."],
  ["RA", "PS", "I get clarity by making something real enough to react to.", "I get clarity by mapping the moving parts and spotting the pattern."],
  ["RA", "MI", "I like momentum, quick tests, and visible progress.", "I like focus, depth, and the satisfying click of mastery."],
  ["RA", "ER", "I can energise a plan by turning it into a first concrete move.", "I can energise a plan by connecting it to people and purpose."],
  ["ER", "PS", "I make sense of choices by asking what feels true and important.", "I make sense of choices by seeing the system they sit inside."],
  ["ER", "MI", "I stay committed when the work serves someone or something I care about.", "I stay committed when the work becomes absorbing and richly interesting."],
  ["ER", "RA", "I move when the meaning is alive enough to pull me forward.", "I move when there is a clear first step I can take now."]
];

const topChoiceByQuestion = ["A", "A", "B", "B", "A", "A", "B", "B", "A", "B", "B", "A"];
const initialAlexMessage = "I’m Alex. Tell me what you want to work through, or brain dump what is in your head.";

const libraryCards = [
  {
    area: "Strengths & Proof",
    type: "Proof Moment",
    context: "Work",
    date: "Today",
    title: "Proof: asked while it mattered",
    summary: "You spotted risk early, asked for clarity, and kept enough room to move.",
    details: {
      "What you did": "Sent the question while the task still had time to change.",
      "What it proves": "You can protect future-you with one clear ask.",
      "Reuse it": "Before the next messy brief, ask what would make this doable."
    }
  },
  {
    area: "Strengths & Proof",
    type: "How I Work Best",
    context: "Life",
    date: "Yesterday",
    title: "How I work: visible first step",
    summary: "Your focus returned when the task became something you could see, not hold in memory.",
    details: {
      "Conditions": "One visible next move, not the whole route.",
      "Quick setup": "Open the file, write the rough heading, stop after 90 seconds.",
      "Why it matters": "This is an operating manual, not a pep talk."
    }
  },
  {
    area: "Reframe Notes",
    type: "Context Shift Note",
    context: "Work",
    date: "Mar 1",
    title: "Context: the task had fog",
    summary: "The delay was information: the start was invisible, not your character.",
    details: {
      "Old story": "I am avoiding it again.",
      "New story": "The first move was too abstract to grip.",
      "Try now": "Make the next action physical enough to start."
    }
  },
  {
    area: "Reframe Notes",
    type: "Reframe Lens",
    context: "Sports",
    date: "Feb 27",
    title: "Context: reset after mistake",
    summary: "The mistake was one play, not your whole identity or the next move.",
    details: {
      "Use when": "One visible error tries to take over the rest of the session.",
      "New story": "My system needs a reset cue, not a self-attack.",
      "Try now": "One breath, name the next play, rejoin."
    }
  },
  {
    area: "Connection Anchors",
    type: "Reach-out Script",
    context: "Personal",
    date: "Feb 26",
    title: "Reach out: Friday body double",
    summary: "A warm message turns support from vague hope into a real 25-minute plan.",
    details: {
      "Copyable message": "Would you be up for 25 minutes on Friday where we both open the thing we have been putting off?",
      "Send by": "Thursday lunchtime",
      "Real-world action": "Send it, then put the call in the calendar."
    }
  },
  {
    area: "Connection Anchors",
    type: "Repair Script",
    context: "Personal",
    date: "Feb 24",
    title: "Repair: missed the check-in",
    summary: "A short repair note keeps one missed moment from becoming disappearance.",
    details: {
      "Copyable message": "I missed our check-in. I care about it, and I can do Tuesday at 4 if that still works for you.",
      "Next step": "Send, then offer one concrete time.",
      "Why it matters": "The app rehearses connection; the person is outside it."
    }
  },
  {
    area: "HARD Goal Companion",
    type: "HARD Goal Overview",
    context: "Work",
    date: "Feb 22",
    title: "Goal: portfolio with calm",
    summary: "North star, emotional why, accountability, and this week's tiny step in one place.",
    details: {
      "North star": "Apply to roles with work I am proud to show.",
      "HARD scaffold": "Heartfelt why, vivid finish line, Friday check-ins, right-sized stretch.",
      "Next step": "Choose one project and write the roughest heading."
    }
  },
  {
    area: "HARD Goal Companion",
    type: "Weekly Companion",
    context: "Life",
    date: "Mar 3",
    title: "Week of Mar 3",
    summary: "One tiny step, one likely derail, and a restart plan without streak guilt.",
    details: {
      "This week's focus": "Make the portfolio visible again.",
      "Tiny step": "Open the page and drop in three rough bullets.",
      "Restart plan": "If blocked, do 90 seconds with Maya on the call."
    }
  }
];

const topOfMindCard = libraryCards[0];

const VOICE_ACTIVITY_RMS_THRESHOLD = 0.008;
const VOICE_AUTO_STOP_MIN_MS = 2500;
const VOICE_AUTO_STOP_SILENCE_MS = 5000;
const VOICE_MAX_RECORDING_MS = 55000;
const VOICE_MIN_RECORDING_MS = 600;
const VOICE_HISTORY_LIMIT = 9;

const state = {
  screen: "intro-screen",
  q: 0,
  answers: [],
  result: null,
  reveal: 0,
  filter: "All",
  area: "All",
  talkUiMode: "voice",
  talkMode: "Conversation",
  activeLibraryCard: null,
  orbMode: "rest",
  voiceStatus: "idle",
  voiceRecorder: null,
  voiceRecordingStartedAt: 0,
  voiceMaxTimer: null,
  voiceSilenceTimer: null,
  voiceLastActivityAt: 0,
  voiceHasSignal: false,
  activeVoiceAudio: null,
  activeVoiceAudioProtected: false,
  introVoicePlayed: false,
  introVoiceController: null,
  quizAdvanceTimer: null,
  messages: [
    {
      role: "assistant",
      content: initialAlexMessage
    }
  ]
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function showScreen(id) {
  $$(".screen").forEach((screen) => screen.classList.toggle("active", screen.id === id));
  const phone = $(".phone");
  phone?.classList.toggle("intro-active", id === "intro-screen");
  phone?.classList.toggle("quiz-active", id === "quiz-screen");
  phone?.classList.toggle("reveal-active", id === "reveal-screen");
  phone?.classList.toggle("immersive-active", id === "quiz-screen" || id === "reveal-screen");
  state.screen = id;
}

function showAppView(id) {
  $$(".app-view").forEach((view) => view.classList.toggle("active", view.id === id));
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === id));
}

function setTalkUiMode(mode) {
  state.talkUiMode = mode;
  $$(".talk-mode").forEach((view) => view.classList.toggle("active", view.dataset.talkMode === mode));
  $("#talk-view")?.classList.toggle("is-text-mode", mode === "text");
  $("#talk-view")?.classList.toggle("is-voice-mode", mode === "voice");
  if (mode === "text") {
    $("#transcript").scrollTop = $("#transcript").scrollHeight;
    $("#chat-input").focus();
  }
}

function getProfilePayload() {
  return state.result ? {
    handle: state.result.handle,
    capability: state.result.capability,
    primary: engines[state.result.primary].name,
    amplifier: engines[state.result.amplifier].name,
    rawScores: state.result.raw
  } : null;
}

function scoreQuiz() {
  const raw = { PS: 0, MI: 0, RA: 0, ER: 0 };
  state.answers.forEach((choice, index) => {
    raw[questions[index][choice === "A" ? 0 : 1]] += 1;
  });

  const pairs = [[0, 3], [1, 6], [2, 9], [4, 7], [5, 10], [8, 11]];
  const matchup = { PS: 0, MI: 0, RA: 0, ER: 0 };
  pairs.forEach(([a, b]) => {
    const winnerA = questions[a][state.answers[a] === "A" ? 0 : 1];
    const winnerB = questions[b][state.answers[b] === "A" ? 0 : 1];
    if (winnerA === winnerB) matchup[winnerA] += 1;
  });

  const fallback = ["ER", "MI", "PS", "RA"];
  const rank = Object.keys(engines).sort((a, b) => {
    if (matchup[b] !== matchup[a]) return matchup[b] - matchup[a];
    if (raw[b] !== raw[a]) return raw[b] - raw[a];
    return fallback.indexOf(a) - fallback.indexOf(b);
  });
  const [primary, amplifier] = rank;
  const [handle, capability, description] = archetypes[`${primary}-${amplifier}`];
  return { raw, matchup, primary, amplifier, handle, capability, description };
}

function getDisplayedChoices() {
  const [, , copyA, copyB] = questions[state.q];
  const topChoice = topChoiceByQuestion[state.q] || "A";
  const bottomChoice = topChoice === "A" ? "B" : "A";
  return {
    top: { key: topChoice, copy: topChoice === "A" ? copyA : copyB },
    bottom: { key: bottomChoice, copy: bottomChoice === "A" ? copyA : copyB }
  };
}

function renderQuestion() {
  const choices = getDisplayedChoices();
  const topButton = $(".choice[data-slot='top']");
  const bottomButton = $(".choice[data-slot='bottom']");
  topButton.dataset.choice = choices.top.key;
  bottomButton.dataset.choice = choices.bottom.key;
  $("#choice-top").textContent = choices.top.copy;
  $("#choice-bottom").textContent = choices.bottom.copy;
  $("#quiz-dots").innerHTML = questions.map((_, index) => `<span class="${index <= state.q ? "filled" : ""}"></span>`).join("");
  $$(".choice").forEach((button) => {
    button.classList.toggle("is-selected", state.answers[state.q] === button.dataset.choice);
  });
}

function selectQuizChoice(choice) {
  window.clearTimeout(state.quizAdvanceTimer);
  state.answers[state.q] = choice;
  renderQuestion();
  state.quizAdvanceTimer = window.setTimeout(goToNextQuestion, 260);
}

function goToNextQuestion() {
  if (!state.answers[state.q]) return;
  if (state.q < questions.length - 1) {
    state.q += 1;
    renderQuestion();
  } else {
    state.result = scoreQuiz();
    state.reveal = 0;
    renderReveal();
    showScreen("reveal-screen");
  }
}

function goToPreviousQuestion() {
  window.clearTimeout(state.quizAdvanceTimer);
  if (state.q > 0) {
    state.q -= 1;
    renderQuestion();
  } else {
    showScreen("welcome-screen");
  }
}

function makeRevealCards() {
  const result = state.result;
  const profile = revealProfiles[result.handle];
  const primary = engineReveal[result.primary];
  const amplifier = engineReveal[result.amplifier];
  const compass = profile.compass || amplifier.compass;
  return [
    { layout: "archetype", kicker: "Your Archetype", title: displayArchetypeName(result.handle), body: profile.tagline, action: "Discover yourself" },
    { layout: "core", kicker: "Your Core Engine", title: primary.title, body: primary.core },
    { layout: "compass", kicker: "Your Internal Compass", title: amplifier.title, body: compass },
    { layout: "ability", kicker: "The Rare Mix", title: "Your unique ability", body: profile.ability },
    { layout: "landscape", kicker: "The Rare Mix", title: "Your cognitive landscape", body: "" },
    { layout: "potential", kicker: "Untapped Potential", title: profile.potentialTitle, body: profile.potential },
    { layout: "summary", kicker: "", title: displayArchetypeName(result.handle), body: profile.tagline, action: "Share your uniqueness" }
  ];
}

function renderReveal() {
  const cards = makeRevealCards();
  const card = cards[state.reveal];
  const stage = $("#reveal-stage");
  stage.className = `reveal-stage reveal-layout-${card.layout}`;
  $("#reveal-progress").innerHTML = cards.map((_, i) => `<span class="${i <= state.reveal ? "filled" : ""}"></span>`).join("");
  $("#reveal-progress").style.display = card.layout === "archetype" || card.layout === "summary" ? "none" : "grid";
  $("#reveal-kicker").textContent = card.kicker;
  $("#reveal-title").textContent = card.title;
  $("#reveal-body").innerHTML = card.body;
  $("#engine-bars").style.display = card.layout === "landscape" ? "grid" : "none";
  $("#engine-bars").innerHTML = card.layout === "landscape" ? makeLandscapeBars() : "";
  $("#reveal-tags").style.display = card.layout === "summary" ? "flex" : "none";
  $("#reveal-tags").innerHTML = card.layout === "summary" ? [state.result.primary, state.result.amplifier].map((key) => `<span>${engineReveal[key].landscapeLabel}</span>`).join("") : "";
  $("#next-reveal").style.display = card.action ? "inline-flex" : "none";
  $("#reveal-action-text").textContent = card.action || "";
  $("#next-reveal").classList.toggle("is-share", card.layout === "summary");
  $("#next-reveal").classList.toggle("is-discover", card.layout === "archetype");
  $("#next-reveal .alex-dot-mark").style.display = card.layout === "archetype" ? "inline-block" : "none";
  $(".share-mark").style.display = card.layout === "summary" ? "inline-block" : "none";
  $("#summary-next").style.display = state.reveal > 0 ? "inline-flex" : "none";
  $("#reveal-continue-cue").style.display = "none";
  setOrbImages();
}

function displayArchetypeName(handle) {
  return handle.replace(/^The (.+)$/, (_, name) => `The ${name.toLowerCase()}`);
}

function makeLandscapeBars() {
  const order = [
    state.result.primary,
    state.result.amplifier,
    ...Object.keys(engines).filter((key) => key !== state.result.primary && key !== state.result.amplifier)
  ];
  return order.map((key) => {
    const value = state.result.raw[key];
    return `<div class="bar-label"><span>${engineReveal[key].landscapeLabel}</span><div class="bar"><span style="width:${Math.max(7, value / 6 * 100)}%"></span></div></div>`;
  }).join("");
}

function advanceReveal() {
  const cards = makeRevealCards();
  if (state.reveal < cards.length - 1) {
    state.reveal += 1;
    renderReveal();
  } else {
    showScreen("download-bridge-screen");
  }
}

async function shareArchetype() {
  if (!state.result) return;
  const text = `My Different Thinking archetype is ${displayArchetypeName(state.result.handle)}: ${state.result.description}`;
  if (navigator.share) {
    try {
      await navigator.share({ title: "My Different Thinking archetype", text });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Keep the share action non-blocking in the prototype.
    }
  }
}

function goToPreviousReveal() {
  if (state.reveal > 0) {
    state.reveal -= 1;
    renderReveal();
  } else {
    showScreen("quiz-screen");
  }
}

function renderLibrary() {
  const filters = ["All", "Life", "Work", "Personal", "Sports"];
  const areas = ["All", "Strengths & Proof", "Reframe Notes", "Connection Anchors", "HARD Goal Companion"];
  $("#filters").innerHTML = filters.map((f) => `<button class="${state.filter === f ? "active" : ""}" data-filter="${f}">${f}</button>`).join("");
  $("#areas").innerHTML = areas.map((a) => `<button class="${state.area === a ? "active" : ""}" data-area="${a}">${a}</button>`).join("");
  const cards = visibleCards();
  $("#top-card-title").textContent = topOfMindCard.title;
  $("#top-card-meta").innerHTML = [topOfMindCard.type, topOfMindCard.context, topOfMindCard.date].map((item) => `<span>${item}</span>`).join("");
  $("#top-card-summary").textContent = topOfMindCard.summary;
  $("#card-list").innerHTML = cards.map((card, index) => `
    <article class="library-card">
      <div class="meta"><span>${card.type}</span><span>${card.context}</span><span>${card.date}</span></div>
      <h3>${card.title}</h3>
      <p>${card.summary}</p>
      <div class="card-actions">
        <button class="ghost-button" data-open-card="${index}">Open</button>
        <button data-talk-context="${index}">Talk about this</button>
      </div>
    </article>
  `).join("");
}

function visibleCards() {
  return libraryCards.filter((card) => (state.filter === "All" || card.context === state.filter) && (state.area === "All" || card.area === state.area));
}

function openCard(index) {
  const card = visibleCards()[index] || libraryCards[0];
  const dialog = $("#card-dialog");
  state.activeLibraryCard = card;
  $("#dialog-type").textContent = `${card.area} · ${card.type}`;
  $("#dialog-title").textContent = card.title;
  $("#dialog-summary").textContent = card.summary;
  $("#dialog-details").innerHTML = Object.entries(card.details).map(([key, value]) => `<div><strong>${key}</strong>${value}</div>`).join("");
  dialog.hidden = false;
  $("#close-dialog").focus();
}

function addSessionCards() {
  libraryCards.unshift({
    area: "Reframe Notes",
    type: "Reframe Lens",
    context: "Work",
    date: "Today",
    title: "Context: start was invisible",
    summary: "The stuck feeling became clearer when Alex turned the task into one visible move.",
    details: {
      "Old story": "I should already know the plan.",
      "New story": "Motion can create information.",
      "Try now": "Do 90 seconds inside the work, then decide what the plan needs."
    }
  });
  renderLibrary();
}

function formatLibraryCardContext(card) {
  const detailText = Object.entries(card.details || {})
    .map(([key, value]) => `${key}: ${value}`)
    .join(" | ");
  return `Library card context. Area: ${card.area}. Type: ${card.type}. Context: ${card.context}. Date: ${card.date}. Title: ${card.title}. Summary: ${card.summary}. Details: ${detailText}. Use this card as context for the next coaching turn. It is pre-populated prototype content, so do not claim it was newly saved.`;
}

function getLibraryCoachPrompt(card) {
  if (!card) {
    return "Yes. Let’s use it as context, not as a verdict. What part feels most alive right now?";
  }

  if (card.area === "Strengths & Proof") {
    return "Yes. I’ve brought that proof into the conversation. Let’s use it as evidence, not pressure. Where do you want to reuse it now?";
  }

  if (card.area === "Reframe Notes") {
    return "Yes. I’ve brought that reframe in. Let’s use it to change the shape of this moment. What old story is trying to take over?";
  }

  if (card.area === "Connection Anchors") {
    return "Yes. I’ve brought that connection card in. Let’s turn it toward one real person, not keep it inside the app. What would make this easiest to send?";
  }

  if (card.area === "HARD Goal Companion") {
    return "Yes. I’ve brought that goal card in. Let’s keep it small and alive. Which piece needs attention: why, image, pressure, or this week’s step?";
  }

  return "Yes. I’ve brought that Library card in as context. What part feels most useful to revisit right now?";
}

function setTalkContext(cardOrTitle) {
  const card = typeof cardOrTitle === "object" && cardOrTitle ? cardOrTitle : null;
  const title = card ? card.title : String(cardOrTitle || "this");
  $("#card-dialog").hidden = true;
  showAppView("talk-view");
  setTalkUiMode("voice");
  const userMessage = `Can we talk about "${title}" from my Library?`;
  const alexMessage = getLibraryCoachPrompt(card);
  appendMessage("user", userMessage);
  appendMessage("assistant", alexMessage);
  if (card) {
    state.messages.push({ role: "user", content: formatLibraryCardContext(card) });
  }
  state.messages.push({ role: "user", content: userMessage }, { role: "assistant", content: alexMessage });
}

function clearVoiceTimers() {
  window.clearTimeout(state.voiceMaxTimer);
  window.clearInterval(state.voiceSilenceTimer);
  state.voiceMaxTimer = null;
  state.voiceSilenceTimer = null;
}

async function playInitialAlexVoiceOnce() {
  if (state.introVoicePlayed) return;
  state.introVoicePlayed = true;
  state.introVoiceController = new AbortController();
  setVoiceStatus("thinking");

  try {
    const response = await fetch("/api/speech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: state.introVoiceController.signal,
      body: JSON.stringify({ text: initialAlexMessage })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Alex voice is unavailable.");
    await playVoiceOutput(data.audioContent, data.audioMimeType || "audio/mpeg", { protectedPlayback: true });
  } catch (error) {
    if (error.name !== "AbortError") {
      appendMessage("assistant", "Alex is ready in voice mode, but the welcome audio could not play this time.");
    }
    setVoiceStatus("idle");
  } finally {
    state.introVoiceController = null;
  }
}

function setOrbImages() {
  const src = orbAssets[state.result?.handle] || orbAssets["The Launcher"];
  $("#reveal-stage")?.style.setProperty("--summary-orb", `url("${src}")`);
  ["#welcome-orb", "#reveal-orb", "#download-orb", "#talk-orb", "#cta-orb"].forEach((selector) => {
    const image = $(selector);
    if (image) image.src = src;
  });
  $$(".reveal-art").forEach((image) => {
    image.src = src;
  });
  $("#talk-orb")?.classList.remove("rest", "listening", "thinking", "speaking");
  $("#talk-orb")?.classList.add(state.orbMode);
}

function setVoiceStatus(status) {
  state.voiceStatus = status;
  state.orbMode = status === "listening" ? "listening" : status === "thinking" ? "thinking" : status === "speaking" ? "speaking" : "rest";
  const label = status === "listening" ? "Listening" : status === "thinking" ? "Thinking" : status === "speaking" ? "Speaking" : "Rest";
  $("#orb-state").textContent = label;
  $("#voice-talk-mode")?.setAttribute("data-voice-status", state.orbMode);
  setOrbImages();

  const voiceButton = $("#voice-button");
  const textButton = $("#mode-toggle");
  voiceButton?.classList.toggle("is-recording", status === "listening");
  voiceButton?.classList.toggle("is-speaking", status === "speaking");
  if (voiceButton) {
    voiceButton.disabled = status === "thinking";
    voiceButton.setAttribute("aria-label", status === "listening" ? "Microphone listening" : status === "speaking" ? "Alex is speaking" : "Start voice chat");
  }
  if (textButton) textButton.disabled = status === "listening" || status === "thinking";
}

async function handleVoiceButton() {
  if (state.voiceStatus === "listening") {
    await stopVoiceRecording();
    return;
  }

  if (state.voiceStatus === "speaking") {
    if (state.activeVoiceAudioProtected) return;
    stopActiveVoiceAudio();
    return;
  }

  await startVoiceRecording();
}

async function switchToVoiceAndStartRecording() {
  setTalkUiMode("voice");
  await startVoiceRecording();
}

async function startVoiceRecording() {
  if (state.voiceStatus === "listening" || state.voiceStatus === "thinking") return;
  if (state.activeVoiceAudioProtected) return;

  if (!navigator.mediaDevices?.getUserMedia) {
    appendMessage("assistant", "Voice recording is not available in this browser yet.");
    return;
  }

  try {
    stopActiveVoiceAudio();
    clearVoiceTimers();
    state.voiceHasSignal = false;
    state.voiceLastActivityAt = 0;
    state.voiceRecorder = await createPcmRecorder((rms) => {
      if (rms > VOICE_ACTIVITY_RMS_THRESHOLD) {
        state.voiceHasSignal = true;
        state.voiceLastActivityAt = Date.now();
        $("#voice-talk-mode")?.classList.add("has-voice-input");
      }
    });
    state.voiceRecordingStartedAt = Date.now();
    state.voiceMaxTimer = window.setTimeout(() => {
      if (state.voiceStatus === "listening") stopVoiceRecording();
    }, VOICE_MAX_RECORDING_MS);
    state.voiceSilenceTimer = window.setInterval(() => {
      const recordingDuration = Date.now() - state.voiceRecordingStartedAt;
      const silenceDuration = Date.now() - state.voiceLastActivityAt;
      if (
        state.voiceStatus === "listening" &&
        state.voiceHasSignal &&
        recordingDuration > VOICE_AUTO_STOP_MIN_MS &&
        silenceDuration > VOICE_AUTO_STOP_SILENCE_MS
      ) {
        stopVoiceRecording();
      }
    }, 250);
    setVoiceStatus("listening");
  } catch (error) {
    setVoiceStatus("idle");
    appendMessage("assistant", error.name === "NotAllowedError"
      ? "Microphone permission was not allowed. Please allow microphone access to use voice chat."
      : "I could not start voice recording. Please try again.");
  }
}

async function stopVoiceRecording() {
  const recorder = state.voiceRecorder;
  if (!recorder) return;

  state.voiceRecorder = null;
  clearVoiceTimers();
  $("#voice-talk-mode")?.classList.remove("has-voice-input");
  setVoiceStatus("thinking");

  try {
    const recordingDuration = Date.now() - state.voiceRecordingStartedAt;
    const recording = await recorder.stop();
    if (recordingDuration < VOICE_MIN_RECORDING_MS) {
      throw new Error("I need a slightly longer voice note to hear you clearly.");
    }
    await askAlexByVoice(recording.audioBuffer, recording.sampleRateHertz);
  } catch (error) {
    appendMessage("assistant", error.message || "Voice chat did not work this time. Please try again.");
    setVoiceStatus("idle");
  }
}

async function createPcmRecorder(onVoiceActivity) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true
    }
  });
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContextClass();
  await audioContext.resume();
  const source = audioContext.createMediaStreamSource(stream);
  const processor = audioContext.createScriptProcessor(4096, 1, 1);
  const chunks = [];

  processor.onaudioprocess = (event) => {
    const channel = event.inputBuffer.getChannelData(0);
    chunks.push(new Float32Array(channel));
    if (onVoiceActivity) {
      let sum = 0;
      for (let i = 0; i < channel.length; i += 1) sum += channel[i] * channel[i];
      onVoiceActivity(Math.sqrt(sum / channel.length));
    }
  };

  source.connect(processor);
  processor.connect(audioContext.destination);

  return {
    sampleRateHertz: audioContext.sampleRate,
    async stop() {
      processor.disconnect();
      source.disconnect();
      stream.getTracks().forEach((track) => track.stop());
      await audioContext.close();
      return {
        audioBuffer: encodeWav(mergeAudioChunks(chunks), audioContext.sampleRate),
        sampleRateHertz: audioContext.sampleRate
      };
    }
  };
}

function mergeAudioChunks(chunks) {
  const length = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const samples = new Float32Array(length);
  let offset = 0;
  chunks.forEach((chunk) => {
    samples.set(chunk, offset);
    offset += chunk.length;
  });
  return samples;
}

function encodeWav(samples, sampleRate) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (const sample of samples) {
    const clamped = Math.max(-1, Math.min(1, sample));
    view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
    offset += 2;
  }
  return buffer;
}

function writeAscii(view, offset, text) {
  for (let i = 0; i < text.length; i += 1) {
    view.setUint8(offset + i, text.charCodeAt(i));
  }
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

async function askAlexByVoice(audioBuffer, sampleRateHertz) {
  const response = await fetch("/api/voice-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: state.messages.slice(-VOICE_HISTORY_LIMIT),
      profile: getProfilePayload(),
      mode: state.talkMode,
      audioContent: arrayBufferToBase64(audioBuffer),
      sampleRateHertz
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Alex voice is unavailable.");

  appendMessage("user", data.transcript);
  appendMessage("assistant", data.reply);
  state.messages.push(
    { role: "user", content: data.transcript },
    { role: "assistant", content: data.reply }
  );

  if (data.audioContent) {
    await playVoiceOutput(data.audioContent, data.audioMimeType || "audio/mpeg");
  } else {
    setVoiceStatus("idle");
  }
}

function playVoiceOutput(audioContent, mimeType, options = {}) {
  return new Promise((resolve) => {
    stopActiveVoiceAudio(false);
    const audio = new Audio(`data:${mimeType};base64,${audioContent}`);
    state.activeVoiceAudio = audio;
    state.activeVoiceAudioProtected = Boolean(options.protectedPlayback);
    setVoiceStatus("speaking");

    audio.addEventListener("ended", () => {
      if (state.activeVoiceAudio === audio) state.activeVoiceAudio = null;
      state.activeVoiceAudioProtected = false;
      setVoiceStatus("idle");
      resolve();
    }, { once: true });

    audio.addEventListener("error", () => {
      if (state.activeVoiceAudio === audio) state.activeVoiceAudio = null;
      state.activeVoiceAudioProtected = false;
      appendMessage("assistant", "Alex replied in text, but the audio could not play in this browser.");
      setVoiceStatus("idle");
      resolve();
    }, { once: true });

    audio.play().catch(() => {
      if (state.activeVoiceAudio === audio) state.activeVoiceAudio = null;
      state.activeVoiceAudioProtected = false;
      appendMessage("assistant", "Alex replied in text, but the browser blocked audio playback.");
      setVoiceStatus("idle");
      resolve();
    });
  });
}

function stopActiveVoiceAudio(updateStatus = true) {
  if (!state.activeVoiceAudio) return;
  state.activeVoiceAudio.pause();
  state.activeVoiceAudio.currentTime = 0;
  state.activeVoiceAudio = null;
  state.activeVoiceAudioProtected = false;
  if (updateStatus) setVoiceStatus("idle");
}

function bindEvents() {
  $("#join-now").addEventListener("click", () => showScreen("welcome-screen"));

  $("#start-quiz").addEventListener("click", () => {
    window.clearTimeout(state.quizAdvanceTimer);
    state.q = 0;
    state.answers = [];
    state.result = null;
    renderQuestion();
    showScreen("quiz-screen");
  });

  $$(".choice").forEach((button) => button.addEventListener("click", () => {
    selectQuizChoice(button.dataset.choice);
  }));

  $("#quiz-next").addEventListener("click", goToNextQuestion);
  $("#quiz-back").addEventListener("click", goToPreviousQuestion);
  $("#quiz-close").addEventListener("click", () => {
    window.clearTimeout(state.quizAdvanceTimer);
    showScreen("welcome-screen");
  });

  $("#next-reveal").addEventListener("click", () => {
    if (state.reveal === makeRevealCards().length - 1) {
      shareArchetype();
      return;
    }
    advanceReveal();
  });
  $("#summary-next").addEventListener("click", advanceReveal);
  $("#reveal-back").addEventListener("click", goToPreviousReveal);

  $("#reveal-screen").addEventListener("click", (event) => {
    if (event.target.closest("#next-reveal, #summary-next, #reveal-back")) return;
    if (state.reveal > 0 && state.reveal < makeRevealCards().length - 1) {
      advanceReveal();
    }
  });

  $("#preview-download").addEventListener("click", () => showScreen("download-screen"));

  $("#start-app").addEventListener("click", () => {
    setTalkUiMode("voice");
    showAppView("talk-view");
    showScreen("app-screen");
    playInitialAlexVoiceOnce();
  });

  $$(".tab").forEach((tab) => tab.addEventListener("click", () => {
    showAppView(tab.dataset.tab);
  }));

  $("#mode-toggle").addEventListener("click", () => setTalkUiMode("text"));

  $("#voice-mode-toggle").addEventListener("click", switchToVoiceAndStartRecording);

  $("#voice-button").addEventListener("click", handleVoiceButton);

  $("#chat-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = $("#chat-input");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    appendMessage("user", text);
    state.messages.push({ role: "user", content: text });
    state.orbMode = "thinking";
    $("#orb-state").textContent = "Thinking";
    setOrbImages();
    await askAlex();
  });

  document.addEventListener("click", (event) => {
    const back = event.target.closest("[data-back]");
    if (back) showScreen(back.dataset.back);

    const filter = event.target.closest("[data-filter]");
    if (filter) {
      state.filter = filter.dataset.filter;
      renderLibrary();
    }

    const area = event.target.closest("[data-area]");
    if (area) {
      state.area = area.dataset.area;
      renderLibrary();
    }

    const open = event.target.closest("[data-open-card]");
    if (open) openCard(Number(open.dataset.openCard));

    const talk = event.target.closest("[data-talk-context]");
    if (talk) {
      const index = Number(talk.dataset.talkContext);
      const card = talk.dataset.talkContext === "top"
        ? topOfMindCard
        : (Number.isFinite(index) ? visibleCards()[index] : visibleCards()[0]) || libraryCards[0];
      setTalkContext(card);
    }
  });

  $("#close-dialog").addEventListener("click", () => $("#card-dialog").hidden = true);
  $("#card-dialog").addEventListener("click", (event) => {
    if (event.target.id === "card-dialog") event.currentTarget.hidden = true;
  });
  $("#dialog-talk").addEventListener("click", () => setTalkContext(state.activeLibraryCard || $("#dialog-title").textContent));
}

function appendMessage(role, content) {
  const div = document.createElement("div");
  div.className = `bubble ${role === "user" ? "user" : "alex"}`;
  div.textContent = content;
  $("#transcript").appendChild(div);
  $("#transcript").scrollTop = $("#transcript").scrollHeight;
}

async function askAlex() {
  const send = $("#chat-send");
  send.disabled = true;
  send.setAttribute("aria-label", "Sending");
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: state.messages,
        profile: getProfilePayload(),
        mode: state.talkMode
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Alex is unavailable.");
    appendMessage("assistant", data.reply);
    state.messages.push({ role: "assistant", content: data.reply });
  } catch (error) {
    const hint = location.protocol === "file:"
      ? "Open the prototype through the local server at http://127.0.0.1:8123/index.html, not directly from the file."
      : "Make sure server.js is running with the Gemini or Vertex configuration set.";
    const message = error.message && error.message !== "Alex is unavailable."
      ? error.message
      : `I could not reach the model yet. ${hint}`;
    appendMessage("assistant", message);
  } finally {
    state.orbMode = "rest";
    $("#orb-state").textContent = "Rest";
    setOrbImages();
    send.disabled = false;
    send.setAttribute("aria-label", "Send");
  }
}

function drawOrb(canvas, getMode, getResult) {
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const center = size / 2;
  let t = 0;

  function frame() {
    t += 0.016;
    const result = getResult();
    const primary = result?.primary || "PS";
    const amp = result?.amplifier || "ER";
    const mode = getMode();
    const pulse = mode === "speaking" ? Math.sin(t * 7) * 18 : mode === "listening" ? Math.sin(t * 4) * 8 : Math.sin(t * 2) * 5;
    const radius = size * 0.28 + pulse;
    ctx.clearRect(0, 0, size, size);

    const glow = ctx.createRadialGradient(center, center, radius * 0.2, center, center, radius * 1.5);
    glow.addColorStop(0, `${engines[primary].color}aa`);
    glow.addColorStop(0.46, `${engines[amp].color}55`);
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(center, center, radius * 1.45, 0, Math.PI * 2);
    ctx.fill();

    const sphere = ctx.createRadialGradient(center - radius * 0.34, center - radius * 0.38, 10, center, center, radius);
    sphere.addColorStop(0, "#fff8");
    sphere.addColorStop(0.18, engines[primary].color);
    sphere.addColorStop(0.56, engines[amp].color);
    sphere.addColorStop(1, "#070b10");
    ctx.fillStyle = sphere;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, radius * 0.96, 0, Math.PI * 2);
    ctx.clip();
    for (let i = 0; i < 9; i += 1) {
      const y = center - radius * 0.75 + i * radius * 0.18 + Math.sin(t * 1.4 + i) * 8;
      ctx.strokeStyle = i % 2 ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.16)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(center + Math.sin(t + i) * 12, y, radius * (0.8 - i * 0.025), radius * 0.12, Math.sin(t / 2) * 0.22, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (mode === "thinking") {
      for (let i = 0; i < 34; i += 1) {
        const a = i * 1.618 + t;
        const r = (Math.sin(i * 9.2) * 0.5 + 0.5) * radius * 0.82;
        ctx.fillStyle = "rgba(255,255,255,0.46)";
        ctx.fillRect(center + Math.cos(a) * r, center + Math.sin(a) * r, 2, 2);
      }
    }
    ctx.restore();

    if (mode === "speaking") {
      ctx.strokeStyle = `${engines[primary].color}88`;
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.arc(center, center, radius + 18 + i * 22 + Math.sin(t * 7 + i) * 4, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    requestAnimationFrame(frame);
  }
  frame();
}

bindEvents();
renderQuestion();
renderLibrary();
setTalkUiMode("voice");
setVoiceStatus("idle");
