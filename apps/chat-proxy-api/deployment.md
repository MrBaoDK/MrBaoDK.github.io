# chat-proxy-api Deployment

Deploying the `chat-proxy-api` is very straightforward since it is built as a **Cloudflare Worker**. Cloudflare Workers offer a generous free tier (100,000 requests per day) and are perfect for serverless proxies like this.

Here is the step-by-step guide to deploying it:

### Step 1: Login to Cloudflare

Open your terminal, navigate to the `chat-proxy-api` folder, and log in to your Cloudflare account using Wrangler (the Cloudflare CLI).

```bash
cd apps/chat-proxy-api
npx wrangler login
```

_(This will open a browser window asking you to authorize Wrangler to access your Cloudflare account)._

### Step 2: Set your API Key securely

We don't want your Gemini API key hardcoded in the deployed code. You need to save it as a secure secret in Cloudflare:

```bash
npx wrangler secret put GEMINI_API_KEY
```

When prompted, paste your Gemini API key and hit Enter. Cloudflare will encrypt and store it securely for your Worker.

### Step 3: Deploy the Worker

Now, run the deployment script:

```bash
pnpm run deploy
```

Once this finishes, Wrangler will output a public URL that looks something like this:
`https://chat-proxy-api.<your-cloudflare-username>.workers.dev`

### Step 4: Update the Frontend URL

Before you deploy your React site to GitHub Pages, you need to tell your frontend to point to the new live server instead of `localhost`.

Open `site/src/App.tsx`, look for `handleSendMessage` (around line 150), and replace the `localhost` URL with your new Cloudflare Worker URL:

```diff
- response = await fetch('http://localhost:8787/api/chat', {
+ response = await fetch('https://chat-proxy-api.<your-cloudflare-username>.workers.dev/api/chat', {
```

### Step 5: Deploy the Website

Finally, go back to the root of your project and deploy your frontend to GitHub Pages using your standard workflow:

```bash
cd ../../
pnpm gh-deploy
```

That's it! Your AI assistant is now live, secure (API key hidden), and hosted on the edge. Let me know if you run into any permission issues or errors during the Wrangler login.
