# 🚀 Dealpost — Brand Agency Portfolio

> **Live Website:** [dealpost.co.in](https://dealpost.co.in)
> **Founded by:** Hariharan J V — Founder, Dealpost
> **Contact:** hello@dealpost.co.in | +91 8015004952

---

## 📖 About

**Dealpost** is a full-service brand and digital agency based in Chennai, India. This portfolio website showcases the agency's capabilities, philosophy, and client work across:

- Brand Identity & Strategy
- Social Media & Content
- Performance Marketing
- Software Development
- Packaging Design
- Spatial / Interior Branding

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| Routing | React Router v6 (SPA) |
| Styling | TailwindCSS 3 |
| Animation | Framer Motion + Lenis Smooth Scroll |
| Backend | Express.js (Node.js) |
| Email | Nodemailer (Gmail SMTP) |
| Build Tool | Vite 8 |
| Package Manager | PNPM |
| Process Manager | PM2 |
| Reverse Proxy | Nginx |
| Hosting | Hostinger VPS (Ubuntu) |
| Domain | dealpost.co.in (Cloudflare DNS) |

---

## 📁 Project Structure

```
dealpost-brand-narratives/
├── client/
│   ├── pages/
│   │   └── Index.tsx          # Main single-page application (all sections)
│   ├── components/ui/         # Reusable Radix UI components
│   ├── App.tsx                # SPA router setup
│   └── global.css             # TailwindCSS theme tokens
│
├── server/
│   ├── index.ts               # Express server setup
│   └── routes/
│       ├── contact.ts         # Lead form → Nodemailer email handler
│       └── demo.ts            # Demo API route
│
├── public/                    # Static assets served directly
│   ├── pdf_img_1.jpeg         # Dealpost logo
│   ├── pdf_img_*.jpeg/png     # Client brand assets
│   ├── project*.png/jpeg      # Project images
│   ├── sitemap.xml            # SEO sitemap
│   └── robots.txt             # Crawler directives
│
├── shared/
│   └── api.ts                 # Shared TypeScript interfaces
│
├── index.html                 # Root HTML with full SEO meta tags
├── vite.config.ts             # Vite build configuration
└── deploy_dealpost.py         # Automated SSH deployment script
```

---

## 🌐 Page Sections

The site is a single-page application with the following sections (in scroll order):

| # | Section ID | Description |
|---|---|---|
| 01 | `#home` | Hero — animated headline, floating project images |
| 02 | `#services` | Ecosystem — interactive node network of capabilities |
| 03 | `#engine` | The Engine — 9-step connected process pipeline |
| 04 | `#about` | Branding Transformation — before/after reveal |
| 05 | `#performance` | Content Multiplication — social content showcase |
| 06 | `#technology` | Software Development — live code animation |
| 06 | `#work` | Selected Work — horizontal scrolling project carousel |
| 07 | `#clients` | Client logos & testimonials |
| 08 | – | Packaging Design — 3D box animation |
| 09 | – | Spatial / Interior Design showcase |
| 10 | – | Performance Dashboard — animated KPI counters |
| 11 | – | Complete Business Lifecycle — sticky scroll timeline |
| 12 | `#founder` | Founder section — Hariharan J V |
| 13 | `#contact` | Contact form + email integration |

---

## ⚙️ Local Development

### Prerequisites
- Node.js 20+
- PNPM (`npm install -g pnpm`)

### Setup

```bash
# Clone the repo
git clone https://github.com/prawinkumar2k/dealpost-portfolio.git
cd dealpost-portfolio

# Install dependencies
pnpm install

# Start development server (client + backend on port 8080)
pnpm dev
```

Open [http://localhost:8080](http://localhost:8080)

---

## 🔧 Environment Variables

Create a `.env` file in the root with:

```env
PORT=3000
SMTP_USER=hello@dealpost.co.in
SMTP_PASS=your_gmail_app_password
```

> Never commit the `.env` file. It is already in `.gitignore`.

---

## 📧 Contact Form / Lead Generation

The contact form at the bottom of the page sends leads via **Nodemailer** to `hello@dealpost.co.in`.

**API Route:** `POST /api/contact`

**Request body:**
```json
{
  "name": "Client Name",
  "email": "client@email.com",
  "type": "Performance Marketing",
  "message": "I want to grow my brand..."
}
```

The `type` field is pre-filled automatically when a user clicks on any service node in the Ecosystem or Engine section.

---

## 🚀 Production Deployment

### Automated Deploy (Recommended)

```bash
python deploy_dealpost.py
```

This script:
1. SSH connects to the VPS
2. Uploads updated `client/pages/Index.tsx`
3. Uploads updated `server/routes/contact.ts`
4. Runs `pnpm build` on the server
5. Restarts the app via `pm2 restart all`

### Manual Deploy

```bash
pnpm build
# Then SCP dist to server + pm2 restart
```

---

## 🛡️ Infrastructure

### Nginx — `/etc/nginx/sites-enabled/dealpost`

```nginx
server {
    listen 80;
    server_name dealpost.co.in www.dealpost.co.in;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### PM2

```bash
pm2 list              # Check status
pm2 logs dealpost     # View logs
pm2 restart dealpost  # Restart
```

---

## 🔍 SEO Checklist

- ✅ Descriptive title — "Brand Strategy, Digital & Creative Agency – Chennai, India"
- ✅ Meta description (160 chars)
- ✅ Meta keywords (10 targeted terms)
- ✅ Open Graph tags (WhatsApp, Facebook, LinkedIn)
- ✅ Twitter Card (large image)
- ✅ JSON-LD Structured Data — Organization schema
- ✅ Canonical URL
- ✅ sitemap.xml at `/sitemap.xml`
- ✅ robots.txt with sitemap reference
- ✅ Logo as favicon and OG image

### Submit to Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → `https://dealpost.co.in`
3. Verify via Cloudflare DNS TXT record
4. Submit sitemap: `https://dealpost.co.in/sitemap.xml`

---

## 🎨 Brand Colors

| Token | Hex | Usage |
|---|---|---|
| Dark | `#061F1C` | Hero backgrounds |
| Primary | `#0E544C` | Main green |
| Secondary | `#126F65` | Mid sections |
| Accent | `#138F84` | Highlights, icons |
| Light | `#F3FAF7` | Light backgrounds |
| White | `#FFFFFF` | Text on dark |

---

## 📞 Support

- Email: **hello@dealpost.co.in**
- Phone: **+91 8015004952**
- VPS: `187.127.217.225` | PM2 App: `dealpost` | Port: `3000`
