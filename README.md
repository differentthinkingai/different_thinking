# Alex Prototype

Static mobile prototype with a small Node server that proxies chat requests to Gemini on Vertex AI.

## Run Locally

Create `.env.local`:

```bash
AI_PROVIDER=vertex
GOOGLE_CLOUD_PROJECT=your_project_id
GOOGLE_CLOUD_LOCATION=global
VERTEX_MODEL=gemini-3.5-flash
```

For voice chat, the same Google Cloud project also needs Speech-to-Text and
Text-to-Speech enabled. If the app is not running on Google Cloud, add a service
account JSON secret:

```bash
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

Optional voice settings:

```bash
SPEECH_LANGUAGE_CODE=en-GB
TTS_LANGUAGE_CODE=en-GB
TTS_VOICE_NAME=en-GB-Chirp3-HD-Aoede
TTS_SSML_GENDER=FEMALE
```

`TTS_VOICE_NAME` chooses the exact Google Text-to-Speech voice. If it is not
set, the app falls back to `TTS_SSML_GENDER`.

Start the server:

```bash
npm start
```

Open:

```text
http://127.0.0.1:8123/index.html
```

## Deploy On Render

1. Push this folder to a GitHub repository.
2. In Render, create a new Blueprint or Web Service from that repository.
3. Set environment variables for Vertex AI.
4. Use `npm start` as the start command if creating a Web Service manually.

Do not commit `.env.local`.
