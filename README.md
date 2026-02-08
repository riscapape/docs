# P2P Foundation Documentation

Automated documentation pipeline for P2P Foundation using Docusaurus.

## Quick Start

```bash
# Install dependencies
npm install

# Build documentation from sources
python3 build_docs.py

# Start dev server
npm run start
```

## Project Structure

```
Documentation/                 # Git repository root
├── sources/                   # 📁 SOURCE OF TRUTH - Add your MD files here
│   ├── whitepaper.md         # Whitepaper documentation
│   └── sdk.md                # SDK documentation
│
├── docs.config.json          # ⚙️ Configuration for all documentation
├── build_docs.py             # 🔧 Build script
│
├── docs/                     # Generated whitepaper docs (auto-generated)
├── sdk/                      # Generated SDK docs (auto-generated)
├── sidebars/                 # Generated sidebars (auto-generated)
├── docusaurus.config.ts      # Generated config (auto-generated)
│
├── src/                      # React components & styling
├── static/                   # Static assets (images, etc.)
├── package.json              # Node.js dependencies
│
└── .github/
    └── workflows/
        └── deploy.yml        # CI/CD pipeline
```

## Adding New Documentation

### Step 1: Create your markdown file

Add a new `.md` file to the `sources/` folder:

```markdown
# **My Documentation Title**

Introduction text here.

# **1. First Chapter**

## **1.1 Subsection**

Content here...

# **2. Second Chapter**

More content...
```

**Important:** Use `#` (H1) for main chapters and `##` (H2) for subsections.

### Step 2: Add to configuration

Edit `docs.config.json` and add your doc to the `docs` array:

```json
{
  "docs": [
    {
      "id": "mydoc",
      "source": "sources/mydoc.md",
      "outputDir": "mydoc",
      "routeBasePath": "mydoc",
      "navbarLabel": "My Doc",
      "navbarPosition": "left",
      "sidebarId": "mydocSidebar",
      "extractImages": true,
      "splitByHeading": 1,
      "numberSections": true,
      "generateTocLinks": true,
      "skipSections": ["My Documentation Title"]
    }
  ]
}
```

### Step 3: Build

```bash
python3 build_docs.py
```

That's it! Your documentation will be available at `/mydoc` with a navbar link.

## Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `id` | string | Unique identifier for the doc |
| `source` | string | Path to source markdown file |
| `outputDir` | string | Where to generate the doc files |
| `routeBasePath` | string | URL path (e.g., `/sdk`) |
| `navbarLabel` | string | Label shown in navbar |
| `navbarPosition` | string | `left` or `right` |
| `sidebarId` | string | Sidebar identifier |
| `extractImages` | boolean | Extract base64 images to files |
| `splitByHeading` | number | Split on heading level (1 = H1) |
| `numberSections` | boolean | Add number prefixes to files |
| `generateTocLinks` | boolean | Generate TOC links in sidebar |
| `skipSections` | array | Section titles to exclude |

## Commands

```bash
# Build all documentation
python3 build_docs.py

# Clean and rebuild
python3 build_docs.py --clean

# Start development server
npm run start

# Build for production
npm run build
```

## CI/CD Pipeline

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. **On every push to `main`:**
   - Builds documentation from sources
   - Builds the Docusaurus site
   - Deploys to GitHub Pages

2. **On pull requests:**
   - Builds and validates (no deployment)

### Setup GitHub Pages

1. Go to your repo Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to `main` branch to trigger deployment

## Markdown Format Guidelines

### Chapter Structure

Use H1 (`#`) for main chapters:
```markdown
# **0. Vision**
# **1. Getting Started**
# **2. API Reference**
```

Use H2 (`##`) for subsections:
```markdown
## **1.1 Installation**
## **1.2 Configuration**
```

### Images

You can embed base64 images and they'll be automatically extracted:
```markdown
![Description][image1]

[image1]: data:image/png;base64,iVBORw0KGgo...
```

### Code Blocks

Standard markdown code blocks are supported:
````markdown
```typescript
const client = new P2PClient({ apiKey: 'xxx' });
```
````

## Environment configuration

Important constants are driven by environment variables for easy deployment. Copy `.env.example` to `.env` and adjust:

| Variable | Used by | Description |
|----------|---------|-------------|
| `KNOWLEDGE_API_URL` | Frontend (build time) | Backend API URL. Set to your API server when frontend and backend are on different hosts. |
| `PORT` | Backend | Port the Knowledge API listens on (default `3001`). |
| `OLLAMA_HOST` | Backend | Ollama base URL (default `http://localhost:11434`). |
| `LLM_MODEL` | Backend | LLM model name (default `llama3.1`). |
| `CORS_ORIGINS` | Backend | Comma-separated allowed origins for CORS when frontend is on another server. |

See `.env.example` for all options and examples.

## Deployment Options

### Hosting the backend on a different server

1. **Backend server:** Deploy the Knowledge API (e.g. `apps/knowledge-api`) on its own host. Set:
   - `PORT`, `OLLAMA_HOST`, `LLM_MODEL`
   - `CORS_ORIGINS` to your docs site URL(s), e.g. `https://docs.p2p.me` (no trailing slash).
2. **Build the frontend** with the backend URL baked in:
   ```bash
   KNOWLEDGE_API_URL=https://api.docs.p2p.me npm run build
   ```
   Or set `KNOWLEDGE_API_URL` in `.env` before running `npm run build`.
3. Deploy the built site (e.g. `build/`) to your docs host. The AI Chat page will call the backend URL you set at build time.

### GitHub Pages (included)
Push to `main` branch - automatic deployment via GitHub Actions.

### Vercel
```bash
npm run build
# Deploy the `build/` folder
```
Set **Environment variable** `KNOWLEDGE_API_URL` in the Vercel dashboard if the API is elsewhere.

### Netlify
Connect your GitHub repo, set build command to:
```
python3 build_docs.py && npm run build
```
Add `KNOWLEDGE_API_URL` in Netlify environment variables if the backend is on a different server.

## License

© P2P Foundation
