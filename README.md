# Personal Portfolio Website

A full-stack, interactive portfolio website built with **React**, **Node.js**, and static content — no database required.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS 4, Framer Motion |
| Backend  | Node.js, Express 5, TypeScript      |
| Content  | Static TypeScript data files        |
| Hosting  | Vercel (frontend) + Render (API)    |

## Features

- Animated hero with typing effect
- Interactive skills filter with progress bars
- Expandable experience timeline
- Project cards with modal detail view
- Contact form with email notifications
- Resume & photo from Google Drive
- Fully responsive design
- Dark theme with glassmorphism effects

## Quick Start

### Prerequisites

- Node.js 20+

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure backend

Copy `backend/.env.example` to `backend/.env` and add your Gmail App Password + Google Drive file IDs.

### 3. Run development servers

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
my_website/
├── frontend/          # React + Vite app
│   └── src/
│       ├── components/   # UI sections
│       ├── data/         # Portfolio content (edit this!)
│       ├── hooks/        # Custom React hooks
│       └── lib/          # API client (contact form)
├── backend/           # Express API (contact + assets only)
│   └── src/routes/
└── render.yaml        # Render deploy config
```

## Customizing Your Content

Edit `frontend/src/data/portfolio.ts` with your personal details — no database or restart needed beyond saving the file (hot reload in dev).

## API Endpoints

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/api/health`         | Health check         |
| POST   | `/api/contact`        | Send contact email   |
| GET    | `/api/assets/resume`  | Resume PDF from Google Drive |
| GET    | `/api/assets/avatar`  | Profile photo from Google Drive |

## Contact Form Email

When someone submits the contact form, an email is sent to **anujpatel299@gmail.com**.

### Gmail setup (one-time)

1. Enable [2-Step Verification](https://myaccount.google.com/signinoptions/two-step-verification) on your Google account
2. Create an [App Password](https://myaccount.google.com/apppasswords) (choose "Mail" and your device)
3. Add to `backend/.env`:

```env
CONTACT_EMAIL_TO=
SMTP_USER=
SMTP_PASS=your_16_character_app_password
```

4. Restart the backend (`npm run dev`)

> Use the App Password, not your regular Gmail password.

## Google Drive — Resume & Profile Photo

Your resume and profile photo are loaded from Google Drive via the backend.

### Option B — Simple file IDs (recommended)

1. Upload resume and photo to Google Drive
2. Right-click each file → **Share** → **Anyone with the link** → Viewer
3. Copy the file ID from the share URL:  
   `https://drive.google.com/file/d/FILE_ID_HERE/view`
4. **Add to `backend/.env`:**

```env
GOOGLE_DRIVE_RESUME_FILE_ID=your_resume_file_id
GOOGLE_DRIVE_AVATAR_FILE_ID=your_photo_file_id
```

5. Restart the backend

> **Tip:** To update your resume, use **File → Replace** on the same Drive file (keeps the same ID).

## Deploy to the Internet (Vercel + Render)

No database needed — just two free services:

| Service | Hosts | URL you'll get |
| ------- | ----- | -------------- |
| [Vercel](https://vercel.com) | React frontend | `https://your-site.vercel.app` |
| [Render](https://render.com) | Express API (contact + assets) | `https://portfolio-api.onrender.com` |

### Step 1 — Push code to GitHub

```powershell
cd C:\workspace\projects\my_website
git init
git add .
git commit -m "Initial portfolio"
```

Create a new repo at [github.com/new](https://github.com/new), then:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/my-website.git
git branch -M main
git push -u origin main
```

> Never commit `.env` files — they are in `.gitignore`.

### Step 2 — Deploy backend on Render

1. Sign up at [render.com](https://render.com) → connect GitHub
2. **New → Blueprint** → select your repo (uses `render.yaml`)
3. Add **Environment Variables**:

```env
CORS_ORIGIN=https://YOUR-SITE.vercel.app
CONTACT_EMAIL_TO=
SMTP_USER=
SMTP_PASS=your_gmail_app_password
GOOGLE_DRIVE_RESUME_FILE_ID=your_resume_file_id
GOOGLE_DRIVE_AVATAR_FILE_ID=your_photo_file_id
```

4. Deploy and copy your backend URL (e.g. `https://portfolio-api.onrender.com`)

> Free Render services sleep after 15 min of inactivity. First request may take ~30–60 seconds.

### Step 3 — Deploy frontend on Vercel

1. Sign up at [vercel.com](https://vercel.com) → connect GitHub
2. **Add New → Project** → import your repo
3. Settings:

| Setting | Value |
| ------- | ----- |
| Root Directory | `frontend` |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

4. Add **Environment Variable**:

```env
VITE_API_URL=https://portfolio-api.onrender.com
```

5. Click **Deploy**

### Step 4 — Update CORS on Render

Set `CORS_ORIGIN` to your actual Vercel URL and redeploy the backend if needed.

### Step 5 — Test

- Open your Vercel URL

### Custom domain (optional)

- **Vercel:** Project → Settings → Domains
- Update `CORS_ORIGIN` on Render to match your custom domain
