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
  "ER-PS": ["The Visionary", "Heart Led Vision", "You turn deeply held values into maps for meaningful change."],
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

const libraryCards = [
  {
    area: "Strengths & Proof",
    type: "Strength Snapshot",
    context: "Life",
    date: "Jan 28",
    title: "Calm under pressure",
    summary: "When the plan changed, you picked a next step instead of freezing.",
    details: {
      "When this shows up": "Last-minute plan changes, messy handoffs, ambiguous starts.",
      "Why it matters": "You stabilise chaos into action.",
      "Reuse it": "Name the next visible move before solving the whole system."
    }
  },
  {
    area: "Reframe Notes",
    type: "Reframe Lens",
    context: "Work",
    date: "Feb 11",
    title: "Data, not verdict",
    summary: "A missed plan is signal about conditions, not a character diagnosis.",
    details: {
      "Use when": "A task slips and shame starts writing the story.",
      "Try now": "Ask what condition was missing: time, clarity, energy, support.",
      "New story": "The setup failed before you did."
    }
  },
  {
    area: "Connection Anchors",
    type: "Reach-out Script",
    context: "Personal",
    date: "Feb 14",
    title: "Reach out to Maya",
    summary: "A low-pressure note asking for a Friday portfolio check-in.",
    details: {
      "Copyable message": "Would you be up for a 15-minute portfolio check Friday? I need a real person to help me start.",
      "Send by": "Thursday afternoon",
      "Why it matters": "Real-world support, not app dependency."
    }
  },
  {
    area: "HARD Goal Companion",
    type: "Weekly Companion",
    context: "Work",
    date: "Feb 17",
    title: "Week of Feb 17",
    summary: "Open the portfolio file, choose one project, and write the roughest possible heading.",
    details: {
      "This week’s focus": "Make the portfolio visible again.",
      "Tiny step": "Create one project page title.",
      "Restart plan": "If blocked, open Figma for 90 seconds only."
    }
  }
];

const state = {
  screen: "welcome-screen",
  q: 0,
  answers: [],
  result: null,
  reveal: 0,
  filter: "All",
  area: "All",
  talkMode: "Conversation",
  orbMode: "rest",
  messages: [
    {
      role: "assistant",
      content: "I’m Alex. Tell me what you want to work through, or brain dump what is in your head."
    }
  ]
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function showScreen(id) {
  $$(".screen").forEach((screen) => screen.classList.toggle("active", screen.id === id));
  state.screen = id;
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

function renderQuestion() {
  const [engineA, engineB, copyA, copyB] = questions[state.q];
  $("#quiz-count").textContent = `${state.q + 1}/12`;
  $("#quiz-progress").style.width = `${((state.q + 1) / questions.length) * 100}%`;
  $("#choice-a").textContent = copyA;
  $("#choice-b").textContent = copyB;
  $(".choice[data-choice='A'] span").style.color = engines[engineA].color;
  $(".choice[data-choice='B'] span").style.color = engines[engineB].color;
}

function makeRevealCards() {
  const result = state.result;
  const primary = engines[result.primary];
  const amplifier = engines[result.amplifier];
  return [
    ["Your Archetype", result.handle, `${result.capability}. ${result.description}`],
    ["Your Core Engine", primary.name, primary.name === "Rapid Activation" ? "That is not impatience. That is how you are built. You bypass friction by starting before doubt kicks in." : `You lead with ${primary.label.toLowerCase()}. Alex starts from that strength, not from a deficit story.`],
    ["Your Internal Compass", amplifier.name, amplifier.name === "Emotional Resonance" ? "You do not move for efficiency alone. Meaning is the fuel that gives your momentum direction." : `Your ${amplifier.label.toLowerCase()} shapes how your core engine becomes useful in real life.`],
    ["Your Unique Ability", "The Rare Mix", `When ${primary.name.toLowerCase()} meets ${amplifier.name.toLowerCase()}, you become ${result.capability.toLowerCase()}.`],
    ["Your Cognitive Landscape", "How your energy flows", "This is not a scorecard. It is the topography Alex uses to personalise coaching."],
    ["Untapped Potential", "The shadow of the strength", "Your strongest engine can overrun the room when conditions are wrong. Alex helps you notice that early without turning it into shame."],
    ["Your Archetype", result.handle, "Screenshot this one. Your first session starts from here."]
  ];
}

function renderReveal() {
  const cards = makeRevealCards();
  const [kicker, title, body] = cards[state.reveal];
  $("#reveal-kicker").textContent = kicker;
  $("#reveal-title").textContent = title;
  $("#reveal-body").textContent = body;
  $("#prev-reveal").disabled = state.reveal === 0;
  $("#next-reveal").textContent = state.reveal === cards.length - 1 ? "Continue" : "Next";
  $("#reveal-dots").innerHTML = cards.map((_, i) => `<span class="${i === state.reveal ? "active" : ""}"></span>`).join("");

  const showBars = state.reveal === 4 || state.reveal === 6;
  $("#engine-bars").style.display = showBars ? "grid" : "none";
  $("#engine-bars").innerHTML = Object.keys(engines).map((key) => {
    const value = state.result.raw[key];
    return `<div class="bar-label"><span>${engines[key].label}</span><span>${value}/6</span><div class="bar"><span style="width:${Math.max(12, value / 6 * 100)}%; background:${engines[key].color}"></span></div></div>`;
  }).join("");
  setOrbImages();
}

function renderLibrary() {
  const filters = ["All", "Life", "Work", "Personal", "Sports"];
  const areas = ["All", "Strengths & Proof", "Reframe Notes", "Connection Anchors", "HARD Goal Companion"];
  $("#filters").innerHTML = filters.map((f) => `<button class="${state.filter === f ? "active" : ""}" data-filter="${f}">${f}</button>`).join("");
  $("#areas").innerHTML = areas.map((a) => `<button class="${state.area === a ? "active" : ""}" data-area="${a}">${a}</button>`).join("");
  const cards = visibleCards();
  const top = cards[0] || libraryCards[0];
  $("#top-card-summary").textContent = top.summary;
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
  $("#dialog-type").textContent = `${card.area} · ${card.type}`;
  $("#dialog-title").textContent = card.title;
  $("#dialog-summary").textContent = card.summary;
  $("#dialog-details").innerHTML = Object.entries(card.details).map(([key, value]) => `<div><strong>${key}</strong>${value}</div>`).join("");
  $("#card-dialog").showModal();
}

function addSessionCards() {
  libraryCards.unshift({
    area: "Reframe Notes",
    type: "Reframe Lens",
    context: "Work",
    date: "Today",
    title: "Start is the plan",
    summary: "You do not need the whole route before taking the first honest step.",
    details: {
      "Use when": "Planning becomes a way to avoid contact with the task.",
      "Try now": "Do 90 seconds inside the work, then decide what the plan needs.",
      "New story": "Motion can create information."
    }
  });
  renderLibrary();
}

function setTalkContext(text) {
  $("#card-dialog").close();
  $$(".app-view").forEach((view) => view.classList.toggle("active", view.id === "talk-view"));
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === "talk-view"));
  $("#transcript").insertAdjacentHTML("beforeend", `<div class="bubble user">Can we talk about “${text}”?</div><div class="bubble alex">Yes. Let’s use it as context, not as a verdict. What part feels most alive right now?</div>`);
}

function setOrbImages() {
  const src = orbAssets[state.result?.handle] || orbAssets["The Launcher"];
  ["#welcome-orb", "#reveal-orb", "#talk-orb", "#cta-orb"].forEach((selector) => {
    const image = $(selector);
    if (image) image.src = src;
  });
  $("#talk-orb")?.classList.remove("rest", "listening", "thinking", "speaking");
  $("#talk-orb")?.classList.add(state.orbMode);
}

function bindEvents() {
  $("#start-quiz").addEventListener("click", () => {
    state.q = 0;
    state.answers = [];
    renderQuestion();
    showScreen("quiz-screen");
  });

  $$(".choice").forEach((button) => button.addEventListener("click", () => {
    state.answers[state.q] = button.dataset.choice;
    if (state.q < questions.length - 1) {
      state.q += 1;
      renderQuestion();
    } else {
      state.result = scoreQuiz();
      state.reveal = 0;
      renderReveal();
      showScreen("reveal-screen");
    }
  }));

  $("#next-reveal").addEventListener("click", () => {
    if (state.reveal < 6) {
      state.reveal += 1;
      renderReveal();
    } else {
      showScreen("download-screen");
    }
  });

  $("#prev-reveal").addEventListener("click", () => {
    state.reveal = Math.max(0, state.reveal - 1);
    renderReveal();
  });

  $("#start-app").addEventListener("click", () => showScreen("app-screen"));

  $$(".tab").forEach((tab) => tab.addEventListener("click", () => {
    $$(".tab").forEach((item) => item.classList.toggle("active", item === tab));
    $$(".app-view").forEach((view) => view.classList.toggle("active", view.id === tab.dataset.tab));
  }));

  $("#mode-toggle").addEventListener("click", () => {
    state.talkMode = state.talkMode === "Conversation" ? "Brain Dump" : "Conversation";
    $("#mode-label").textContent = state.talkMode === "Conversation" ? "Conversation Coaching" : "Brain Dump / Yap";
  });

  $("#voice-button").addEventListener("click", () => {
    const next = { rest: "listening", listening: "thinking", thinking: "speaking", speaking: "rest" };
    state.orbMode = next[state.orbMode];
    $("#orb-state").textContent = state.orbMode[0].toUpperCase() + state.orbMode.slice(1);
    setOrbImages();
  });

  $("#finish-session").addEventListener("click", () => {
    addSessionCards();
    $$(".app-view").forEach((view) => view.classList.toggle("active", view.id === "library-view"));
    $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === "library-view"));
  });

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
      const card = (Number.isFinite(index) ? visibleCards()[index] : visibleCards()[0]) || libraryCards[0];
      setTalkContext(card.title);
    }
  });

  $("#close-dialog").addEventListener("click", () => $("#card-dialog").close());
  $("#dialog-talk").addEventListener("click", () => setTalkContext($("#dialog-title").textContent));
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
  send.textContent = "...";
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: state.messages,
        profile: state.result ? {
          handle: state.result.handle,
          capability: state.result.capability,
          primary: engines[state.result.primary].name,
          amplifier: engines[state.result.amplifier].name,
          rawScores: state.result.raw
        } : null,
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
      : "Make sure server.js is running with OPENAI_API_KEY set.";
    appendMessage("assistant", `I could not reach the model yet. ${hint}`);
  } finally {
    state.orbMode = "rest";
    $("#orb-state").textContent = "Rest";
    setOrbImages();
    send.disabled = false;
    send.textContent = "Send";
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
setOrbImages();
