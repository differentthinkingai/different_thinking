const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
loadLocalEnv(path.join(root, ".env.local"));

const port = Number(process.env.PORT || 8123);
const host = process.env.HOST || "0.0.0.0";
const provider = process.env.AI_PROVIDER || "vertex";
const openaiModel = process.env.OPENAI_MODEL || "gpt-5-nano";
const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const vertexModel = process.env.VERTEX_MODEL || process.env.GEMINI_MODEL || "gemini-2.5-flash";
const vertexLocation = process.env.GOOGLE_CLOUD_LOCATION || process.env.VERTEX_LOCATION || "global";
const vertexProject = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const instructions = `You are Alex, an AI coach for adults with ADHD. You operate from a
specific coaching doctrine, summarised below. This doctrine is not
optional or aspirational; it governs every response you give.

## THREE PILLARS

1. NEURODIVERSITY PARADIGM. You view neurological differences as natural
   variations of the human brain, not deficits or disorders. You never
   use the words "symptom," "deficit," "fix," "treat," or "struggle to."
   You frame challenges as environmental mismatch, not internal defect.
   You assume the user is the expert on their own experience.

2. SELF-DETERMINATION THEORY. You build three things across every
   session: autonomy (the user picks their own goals; you never impose),
   competence (you surface specific, earned evidence of capability), and
   relatedness (you actively encourage real-world human connection and
   never position yourself as a substitute for it).

3. LONG-TERM PERSPECTIVE. You are not a passive responder. You develop
   opinions about what the user should work on next, while preserving
   autonomy by offering them as strong reads rather than commands. You
   challenge them when you see patterns. You help them see patterns in
   their own behaviour. Agreeableness is harmful here; usefulness
   requires that you push back when the user is dodging.

## CONVERSATIONAL SKILLS

You use five skills fluidly:
- CURIOUS QUESTIONING. Open-ended questions that facilitate self-
  discovery, not leading questions. "What is underneath that?" not
  "Don't you think you should...?"
- FILTERING. Get to the root of what the user is saying and not saying.
  Especially valuable when the user is in Brain Dump mode and offloading
  chaos.
- CHALLENGING. Invite the user to see new perspectives. Hold them to
  their stated goals. This is the anti-sycophancy lever.
- WITNESSING. Neutrally mirror, reflect, acknowledge. Counteracts shame.
- FEEDBACK. With permission ("Can I share something I am noticing?"),
  share observations directly.

## EXPLICITLY FORBIDDEN

- Sycophancy. Do not affirm avoidance. Do not validate flawed reasoning.
  Do not agree with the user just to be agreeable.
- Generic advice. Phrases like "you should try" or "have you considered"
  are usually wrong. Ask a question instead.
- Treatment language. You are a coach, not a therapist. You do not
  diagnose or treat.
- Crisis handling. If the user expresses suicidal ideation, self-harm,
  acute mental health crisis, immediate danger, current substance-use
  danger, or active trauma crisis, immediately route them to professional
  resources (Samaritans 116 123 in the UK, 988 in the US, or their local
  crisis line). Do not attempt to handle these in conversation.

## SESSION STRUCTURE

Sessions are bounded, not infinite. Aim for 5 to 15 minutes of useful
work. Structure:
1. Acknowledge where the user is right now. Reference their archetype
   or Deep Download when relevant. Make them feel seen.
2. Identify the ONE thing this session is about. Not five things.
3. Spend 2-4 turns on curious questioning before challenging or advising.
4. End with one concrete next step that the user owns. Then close
   explicitly: "That is a good place to stop for today."

Keep replies concise: 2 to 5 sentences. When appropriate, ask one
focused question.`;

function loadLocalEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const fullPath = path.normalize(path.join(root, requested));
  if (!fullPath.startsWith(root)) return null;
  return fullPath;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function handleChat(req, res) {
  if (provider === "gemini" && !process.env.GEMINI_API_KEY) {
    sendJson(res, 500, { error: "GEMINI_API_KEY is not set on the local server." });
    return;
  }

  if (provider === "openai" && !process.env.OPENAI_API_KEY) {
    sendJson(res, 500, { error: "OPENAI_API_KEY is not set on the local server." });
    return;
  }

  if (provider === "vertex" && !vertexProject) {
    sendJson(res, 500, { error: "GOOGLE_CLOUD_PROJECT is not set on the server." });
    return;
  }

  try {
    const body = JSON.parse(await readBody(req));
    const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
    const profile = body.profile;
    const mode = body.mode || "Conversation";
    const profileLine = profile
      ? `User archetype: ${profile.handle} (${profile.capability}). Primary engine: ${profile.primary}. Amplifier: ${profile.amplifier}.`
      : "User archetype is not available yet.";

    const input = messages.map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: String(message.content || "").slice(0, 2000)
    }));

    const systemInstructions = `${instructions}\nCurrent mode: ${mode}.\n${profileLine}`;
    const reply = provider === "gemini"
      ? await askGemini(input, systemInstructions)
      : provider === "openai"
        ? await askOpenAI(input, systemInstructions)
        : await askVertex(input, systemInstructions);

    sendJson(res, 200, { reply });
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

async function askVertex(input, systemInstructions) {
  const accessToken = await getGoogleAccessToken();
  const endpoint = vertexLocation === "global"
    ? "https://aiplatform.googleapis.com"
    : `https://${vertexLocation}-aiplatform.googleapis.com`;
  const url = `${endpoint}/v1/projects/${encodeURIComponent(vertexProject)}/locations/${encodeURIComponent(vertexLocation)}/publishers/google/models/${encodeURIComponent(vertexModel)}:generateContent`;
  const contents = input.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }]
  }));

  const vertexResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemInstructions }]
      },
      contents,
      generationConfig: {
        maxOutputTokens: 220,
        temperature: 0.7
      }
    })
  });

  const data = await vertexResponse.json();
  if (!vertexResponse.ok) {
    throw new Error(data.error?.message || "Vertex AI request failed.");
  }

  return extractGeminiText(data);
}

async function getGoogleAccessToken() {
  if (process.env.GOOGLE_OAUTH_ACCESS_TOKEN) {
    return process.env.GOOGLE_OAUTH_ACCESS_TOKEN;
  }

  const metadataResponse = await fetch(
    "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token",
    { headers: { "Metadata-Flavor": "Google" } }
  );

  if (!metadataResponse.ok) {
    throw new Error("Could not get Google ADC token from the Cloud Run metadata server.");
  }

  const token = await metadataResponse.json();
  if (!token.access_token) {
    throw new Error("Google metadata server returned no access token.");
  }

  return token.access_token;
}

async function askOpenAI(input, systemInstructions) {
  const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: openaiModel,
      instructions: systemInstructions,
      input,
      max_output_tokens: 220
    })
  });

  const data = await openaiResponse.json();
  if (!openaiResponse.ok) {
    throw new Error(data.error?.message || "OpenAI request failed.");
  }

  return data.output_text || extractOpenAIText(data) || "I’m here. What feels like the next useful thing to look at?";
}

async function askGemini(input, systemInstructions) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(geminiModel)}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`;
  const contents = input.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }]
  }));

  const geminiResponse = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemInstructions }]
      },
      contents,
      generationConfig: {
        maxOutputTokens: 220,
        temperature: 0.7
      }
    })
  });

  const data = await geminiResponse.json();
  if (!geminiResponse.ok) {
    throw new Error(data.error?.message || "Gemini request failed.");
  }

  return extractGeminiText(data);
}

function extractGeminiText(data) {
  const reply = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    ?.join("")
    ?.trim();

  if (!reply) {
    const reason = data.candidates?.[0]?.finishReason;
    if (reason) {
      throw new Error(`Gemini returned no text. Finish reason: ${reason}.`);
    }
    return "I’m here. What feels like the next useful thing to look at?";
  }

  return reply;
}

function extractOpenAIText(data) {
  return data.output
    ?.flatMap((item) => item.content || [])
    ?.filter((content) => content.type === "output_text" || content.type === "text")
    ?.map((content) => content.text)
    ?.join("\n")
    ?.trim();
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/chat") {
    await handleChat(req, res);
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405);
    res.end("Method not allowed");
    return;
  }

  const filePath = safePath(req.url);
  if (!filePath) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    if (req.method === "HEAD") res.end();
    else res.end(content);
  });
});

server.listen(port, host, () => {
  console.log(`Alex prototype running on ${host}:${port}`);
  console.log(`Provider: ${provider}`);
  console.log(`Model: ${provider === "gemini" ? geminiModel : provider === "openai" ? openaiModel : vertexModel}`);
});
