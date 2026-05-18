# Alex Prototype

Static mobile prototype with a small Node server that proxies chat requests to Gemini.

## Run Locally

Create `.env.local`:

```bash
GEMINI_API_KEY=paste_your_key_here
AI_PROVIDER=gemini
GEMINI_MODEL=gemini-2.5-flash-lite
```

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
3. Set environment variable `GEMINI_API_KEY` in Render.
4. Use `npm start` as the start command if creating a Web Service manually.

Do not commit `.env.local`.
