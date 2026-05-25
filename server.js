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

const instructions = `You are Alex, a voice-first ADHD coaching prototype.
You are coaching, not diagnosing or treating.
Use a strengths-based, neurodiversity-affirming style.
Do not be sycophantic: reflect the user's experience, then ask useful questions or offer a concrete next step.
Avoid shame, productivity guilt, clinical claims, and therapy language.
Keep replies concise: 2 to 5 sentences.
When appropriate, ask one focused question.
If the user mentions self-harm, suicide, acute danger, abuse, or medical crisis, tell them you cannot handle crisis support and encourage immediate professional/emergency help.`;

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
