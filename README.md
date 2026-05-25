# Alex Prototype

Static mobile prototype with a small Node server that proxies chat requests to Gemini on Vertex AI.

## Run Locally

Create `.env.local`:

```bash
AI_PROVIDER=vertex
GOOGLE_CLOUD_PROJECT=your_project_id
GOOGLE_CLOUD_LOCATION=global
VERTEX_MODEL=gemini-2.5-flash
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
3. Set environment variables for Vertex AI.
4. Use `npm start` as the start command if creating a Web Service manually.

Do not commit `.env.local`.
