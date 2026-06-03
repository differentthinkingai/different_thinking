const http = require("http");
const crypto = require("crypto");
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
const maxOutputTokens = Number(process.env.MAX_OUTPUT_TOKENS || 2000);
const maxRequestBytes = Number(process.env.MAX_REQUEST_BYTES || 8_000_000);
const speechLanguageCode = process.env.SPEECH_LANGUAGE_CODE || "en-GB";
const speechModel = process.env.SPEECH_MODEL || "";
const ttsLanguageCode = process.env.TTS_LANGUAGE_CODE || "en-GB";
const ttsVoiceName = process.env.TTS_VOICE_NAME || "";
const ttsSsmlGender = process.env.TTS_SSML_GENDER || "MALE";
const ttsSpeakingRate = Number(process.env.TTS_SPEAKING_RATE || 1);
const ttsPitch = Number(process.env.TTS_PITCH || 0);
let cachedGoogleAccessToken = null;

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
      if (body.length > maxRequestBytes) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function handleChat(req, res) {
  try {
    validateChatProvider();
    const body = JSON.parse(await readBody(req));
    const input = normalizeMessages(body.messages).slice(-10);
    const systemInstructions = buildSystemInstructions(body.profile, body.mode);
    const reply = await askConfiguredModel(input, systemInstructions);

    sendJson(res, 200, { reply });
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

async function handleVoiceChat(req, res) {
  try {
    validateChatProvider();
    const body = JSON.parse(await readBody(req));
    const audioContent = String(body.audioContent || "").replace(/^data:audio\/[a-z0-9+.-]+;base64,/i, "");
    const sampleRateHertz = Number(body.sampleRateHertz);
    if (!audioContent) throw new Error("No voice recording was received.");
    if (!Number.isFinite(sampleRateHertz) || sampleRateHertz <= 0) {
      throw new Error("The voice recording sample rate was not available.");
    }

    const transcript = await transcribeSpeech(audioContent, sampleRateHertz);
    if (!transcript) {
      throw new Error("I could not hear enough speech to transcribe. Please try again.");
    }

    const input = normalizeMessages(body.messages)
      .slice(-9)
      .concat({ role: "user", content: transcript });
    const systemInstructions = buildSystemInstructions(body.profile, body.mode);
    const reply = await askConfiguredModel(input, systemInstructions);
    const audio = await synthesizeSpeech(reply);

    sendJson(res, 200, {
      transcript,
      reply,
      audioContent: audio.audioContent,
      audioMimeType: audio.mimeType
    });
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

function validateChatProvider() {
  if (provider === "gemini" && !process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set on the server.");
  }

  if (provider === "openai" && !process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set on the server.");
  }

  if (provider === "vertex" && !vertexProject) {
    throw new Error("GOOGLE_CLOUD_PROJECT is not set on the server.");
  }
}

function normalizeMessages(messages) {
  return (Array.isArray(messages) ? messages : []).map((message) => ({
    role: message.role === "assistant" ? "assistant" : "user",
    content: String(message.content || "").slice(0, 2000)
  }));
}

function buildSystemInstructions(profile, mode = "Conversation") {
  const profileLine = profile
    ? `User archetype: ${profile.handle} (${profile.capability}). Primary engine: ${profile.primary}. Amplifier: ${profile.amplifier}.`
    : "User archetype is not available yet.";
  return `${instructions}\nCurrent mode: ${mode}.\n${profileLine}`;
}

async function askConfiguredModel(input, systemInstructions) {
  return provider === "gemini"
    ? askGemini(input, systemInstructions)
    : provider === "openai"
      ? askOpenAI(input, systemInstructions)
      : askVertex(input, systemInstructions);
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
        maxOutputTokens,
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

  if (cachedGoogleAccessToken && cachedGoogleAccessToken.expiresAt > Date.now() + 60_000) {
    return cachedGoogleAccessToken.token;
  }

  const serviceAccount = loadGoogleServiceAccount();
  if (serviceAccount) {
    return mintServiceAccountToken(serviceAccount);
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

function loadGoogleServiceAccount() {
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (rawJson) {
    const json = rawJson.trim().startsWith("{")
      ? rawJson
      : Buffer.from(rawJson, "base64").toString("utf8");
    return JSON.parse(json);
  }

  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (credentialsPath && fs.existsSync(credentialsPath)) {
    return JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
  }

  return null;
}

async function mintServiceAccountToken(serviceAccount) {
  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error("Google service account credentials are missing a client_email or private_key.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  }));
  const unsignedJwt = `${header}.${payload}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsignedJwt)
    .sign(serviceAccount.private_key, "base64url");

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsignedJwt}.${signature}`
    })
  });

  const token = await tokenResponse.json();
  if (!tokenResponse.ok || !token.access_token) {
    throw new Error(token.error_description || token.error || "Could not mint a Google access token.");
  }

  cachedGoogleAccessToken = {
    token: token.access_token,
    expiresAt: Date.now() + Number(token.expires_in || 3600) * 1000
  };
  return cachedGoogleAccessToken.token;
}

function base64Url(value) {
  return Buffer.from(value).toString("base64url");
}

async function transcribeSpeech(audioContent, sampleRateHertz) {
  const accessToken = await getGoogleAccessToken();
  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: Math.round(sampleRateHertz),
    languageCode: speechLanguageCode,
    enableAutomaticPunctuation: true
  };
  if (speechModel) config.model = speechModel;

  const speechResponse = await fetch("https://speech.googleapis.com/v1/speech:recognize", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      config,
      audio: { content: audioContent }
    })
  });

  const data = await speechResponse.json();
  if (!speechResponse.ok) {
    throw new Error(data.error?.message || "Google Speech-to-Text request failed.");
  }

  return data.results
    ?.map((result) => result.alternatives?.[0]?.transcript || "")
    ?.join(" ")
    ?.trim() || "";
}

async function synthesizeSpeech(text) {
  const accessToken = await getGoogleAccessToken();
  const voice = { languageCode: ttsLanguageCode };
  if (ttsVoiceName) voice.name = ttsVoiceName;
  else voice.ssmlGender = ttsSsmlGender;

  const ttsResponse = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: { text: limitUtf8Bytes(text, 3900) },
      voice,
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: ttsSpeakingRate,
        pitch: ttsPitch
      }
    })
  });

  const data = await ttsResponse.json();
  if (!ttsResponse.ok || !data.audioContent) {
    throw new Error(data.error?.message || "Google Text-to-Speech request failed.");
  }

  return { audioContent: data.audioContent, mimeType: "audio/mpeg" };
}

function limitUtf8Bytes(text, maxBytes) {
  let output = "";
  let bytes = 0;
  for (const character of String(text || "")) {
    const characterBytes = Buffer.byteLength(character);
    if (bytes + characterBytes > maxBytes) break;
    output += character;
    bytes += characterBytes;
  }
  return output;
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
      max_output_tokens: maxOutputTokens
    })
  });

  const data = await openaiResponse.json();
  if (!openaiResponse.ok) {
    throw new Error(data.error?.message || "OpenAI request failed.");
  }

  if (data.status === "incomplete") {
    const reason = data.incomplete_details?.reason || "unknown";
    throw new Error(`Alex's reply was cut off before it finished. Please try again. Reason: ${reason}.`);
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
        maxOutputTokens,
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
  const finishReason = data.candidates?.[0]?.finishReason;
  const reply = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    ?.join("")
    ?.trim();

  if (finishReason === "MAX_TOKENS") {
    throw new Error("Alex's reply was cut off before it finished. Please try again.");
  }

  if (!reply) {
    if (finishReason) {
      throw new Error(`Gemini returned no text. Finish reason: ${finishReason}.`);
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

  if (req.method === "POST" && req.url === "/api/voice-chat") {
    await handleVoiceChat(req, res);
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
