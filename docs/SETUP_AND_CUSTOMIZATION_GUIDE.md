# CMR DMS / DocAI Marketing Site — Setup & Customization Guide

This guide lists **everything you need to add, replace, or customize** for the site to be fully branded and production-ready.

---

## 1) Why you currently see placeholders or "Unable to load feature data"

### A) Placeholder blocks (e.g., "Platform dashboard overview")
This is expected when media files are not present yet. The site is intentionally built to show styled placeholders until you upload real assets.

### B) "Unable to load feature data"
This appears when opening `features.html` directly via `file://` in some browsers because `fetch('data/features.json')` is restricted for local files.

**Fix options:**
1. Recommended: run from a web server (e.g. `python -m http.server 8000`) and open `http://localhost:8000/features.html`.
2. Backup: the site now includes local fallback feature data in `js/features-fallback-data.js`.

---

## 2) Required assets to upload (exact filenames)

Place all files in: `assets/`

| Required File | Purpose / Where Used | Recommended Format | Notes |
|---|---|---|---|
| `logo.png` | Header + footer brand mark on all pages | PNG, transparent | 200×200+ source recommended |
| `hero-dashboard.png` | Homepage hero dashboard image | PNG/JPG | Wide ratio (~16:9) |
| `feature-documents.png` | Features page entry | PNG/JPG | 1600px wide recommended |
| `feature-sharing.png` | Features page entries (sharing + user access) | PNG/JPG | 1600px wide recommended |
| `feature-workflow.png` | Features page workflow block | PNG/JPG | Include process graph if possible |
| `feature-ai.png` | AI page annotated visual + features block | PNG/JPG | Keep key UI controls visible |
| `feature-ai-summary.png` | AI page summary visual | PNG/JPG | Should show summary panel output |
| `feature-audit.png` | Features page audit block | PNG/JPG | Include tables/log UI |
| `feature-signature.png` | Features page signatures block | PNG/JPG | Show signature placement UI |
| `feature-search.png` | Features extra visuals section | PNG/JPG | Deep-search results screenshot |
| `feature-comments.png` | Features page collaboration block | PNG/JPG | Threaded comments view |
| `feature-clients.png` | Features extra visuals section | PNG/JPG | Client directory screen |
| `feature-branding.png` | Features page branding/localization block | PNG/JPG | White-label settings screen |
| `feature-multilang.png` | Features extra visuals section | PNG/JPG | Language selector/interface |
| `feature-reminders.png` | Features page reminders block | PNG/JPG | Reminder panel/list |
| `feature-file-request.png` | Features page file requests block | PNG/JPG | Link creation + upload rules |
| `security-diagram.png` | Security page architecture visual + storage/admin feature | PNG/JPG | Technical diagram preferred |
| `demo-workflow.mp4` | Homepage + How-It-Works demo video | MP4 (H.264) | 10–30s loop-friendly clip |
| `demo-ai.mp4` | AI page demo video | MP4 (H.264) | 10–30s loop-friendly clip |

---

## 3) Content/customization points (edit these files)

### Brand, navigation, and legal
- Update product naming or nav labels in all page headers/footers:
  - `index.html`, `features.html`, `how-it-works.html`, `ai.html`, `security.html`, `contact.html`
- Update legal links (`Privacy Policy`, `Terms of Use`) from `#` placeholders to real URLs in each footer.

### Contact details
Edit `contact.html`:
- Form destination (`mailto:hello@cmrdms.com`) — replace with your real endpoint or form service.
- Contact info block (email, phone, HQ address).

### Feature content source
Primary feature content file:
- `data/features.json`

Fallback feature content file (auto-generated mirror for local-file usage):
- `js/features-fallback-data.js`

If you edit `data/features.json`, you should regenerate fallback data similarly or keep both in sync.

### Visual theme controls
Edit in `css/global.css`:
- `:root` color variables (`--bg-deep`, `--text-primary`, `--text-secondary`, etc.)
- Typography and section spacing tokens.

Edit in `css/nav.css`:
- Nav contrast, blur, and mobile panel style.

---

## 4) Folder structure (where files belong)

- HTML pages: root folder
- CSS: `css/`
- JS: `js/`
- Images/videos: `assets/`
- Feature data: `data/features.json`
- Setup guide: `docs/SETUP_AND_CUSTOMIZATION_GUIDE.md`

---

## 5) Local preview instructions

```bash
cd /path/to/site-root
python -m http.server 8000
```
Open:
- `http://localhost:8000/index.html`
- `http://localhost:8000/features.html`

---

## 6) Deployment checklist

- [ ] All 19 required assets uploaded with exact filenames into `assets/`
- [ ] Contact info and endpoint updated in `contact.html`
- [ ] Privacy/Terms links updated in all footers
- [ ] `data/features.json` content approved
- [ ] Site tested at 375px / 768px / 1280px / 1920px
- [ ] Verified from hosted URL (not only local files)

