# Personal Portfolio Website

A full-stack, interactive portfolio website built with **React**, **Node.js**, and **PostgreSQL**.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS 4, Framer Motion |
| Backend  | Node.js, Express 5, TypeScript      |
| Database | PostgreSQL 16, Prisma ORM           |
| DevOps   | Docker Compose                      |

## Features

- Animated hero with typing effect
- Interactive skills filter with progress bars
- Expandable experience timeline
- Project cards with modal detail view
- Contact form with backend persistence and email notifications
- Fully responsive design
- Dark theme with glassmorphism effects

## Quick Start

### Prerequisites

- Node.js 20+
- Docker Desktop (for PostgreSQL)

### 1. Start PostgreSQL

```bash
docker compose up -d
```

### 2. Install dependencies

```bash
npm run install:all
```

### 3. Setup database

```bash
npm run db:setup
```

### 4. Run development servers

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
│       ├── hooks/        # Custom React hooks
│       ├── lib/          # API client
│       └── types/        # TypeScript types
├── backend/           # Express API
│   ├── prisma/        # Schema & seed data
│   └── src/routes/    # API endpoints
└── docker-compose.yml # PostgreSQL container
```

## Customizing Your Content

Edit `backend/prisma/seed.ts` with your personal details, then re-run:

```bash
npm run db:setup
```

## API Endpoints

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/api/profile`        | Profile information  |
| GET    | `/api/skills`         | Skills list          |
| GET    | `/api/experience`     | Work experience      |
| GET    | `/api/projects`       | Projects             |
| GET    | `/api/education`      | Education            |
| GET    | `/api/certifications` | Certifications       |
| POST   | `/api/contact`        | Send contact message |
| GET    | `/api/assets/resume`  | Resume PDF from Google Drive |
| GET    | `/api/assets/avatar`  | Profile photo from Google Drive |

## Contact Form Email

When someone submits the contact form, the message is saved to the database and an email notification is sent to **anujpatel299@gmail.com**.

### Gmail setup (one-time)

1. Enable [2-Step Verification](https://myaccount.google.com/signinoptions/two-step-verification) on your Google account
2. Create an [App Password](https://myaccount.google.com/apppasswords) (choose "Mail" and your device)
3. Add to `backend/.env`:

```env
CONTACT_EMAIL_TO=anujpatel299@gmail.com
SMTP_USER=anujpatel299@gmail.com
SMTP_PASS=your_16_character_app_password
```

4. Restart the backend (`npm run dev`)

> Use the App Password, not your regular Gmail password. If `SMTP_PASS` is empty, messages are still saved to the database but no email is sent.

## Google Drive — Resume & Profile Photo

Your resume and profile photo are loaded **live from a Google Drive folder** by **filename**. When you delete and re-upload a file with the **same name**, the website picks up the new version within ~2 minutes (restart the backend for instant refresh).

### Your folder setup

| Setting | Value |
| ------- | ----- |
| Folder | `My website content` |
| Resume | `Anuj_resume.pdf` |
| Photo | `anuj.jpg` |

### Option A — Folder + Service Account (recommended)

Required for **delete & re-upload with same name** to work automatically.

1. **Create a Google Drive folder** and upload `Anuj_resume.pdf` and `anuj.jpg`
2. **Get the folder ID** from the URL:  
   `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
3. **Create a Google Cloud service account** (one-time setup):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a project → enable **Google Drive API**
   - IAM → Service Accounts → Create → Keys → Add JSON key
   - Save the JSON file as `backend/google-service-account.json`
4. **Share the Drive folder** with the service account email  
   (looks like `something@project-id.iam.gserviceaccount.com`) as **Viewer**
5. **Add to `backend/.env`:**

```env
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
GOOGLE_DRIVE_RESUME_FILENAME=Anuj_resume.pdf
GOOGLE_DRIVE_AVATAR_FILENAME=anuj.jpg
GOOGLE_DRIVE_SERVICE_ACCOUNT_KEY_FILE=./google-service-account.json
```

6. Restart the backend

> **Updating files:** Delete the old file on Drive, upload a new one with the **exact same filename**. The site will serve the new version automatically — no code or `.env` changes needed.

### Option B — Simple file IDs (no Google Cloud setup)

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

> **Tip:** To update your resume, use **File → Replace** on the same Drive file (keeps the same ID). If you upload a brand-new file, update the file ID in `.env`.

## Deploy to the Internet (Vercel + Render + Neon)

Free hosting setup:

| Service | Hosts | URL you'll get |
| ------- | ----- | -------------- |
| [Neon](https://neon.tech) | PostgreSQL database | Connection string |
| [Render](https://render.com) | Express API (backend) | `https://portfolio-api.onrender.com` |
| [Vercel](https://vercel.com) | React frontend | `https://your-site.vercel.app` |

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

### Step 2 — Create database on Neon

1. Sign up at [neon.tech](https://neon.tech)
2. **New Project** → name it `portfolio`
3. Copy the **connection string** (starts with `postgresql://...neon.tech/...`)
4. Keep it for Step 3

### Step 3 — Deploy backend on Render

1. Sign up at [render.com](https://render.com) → connect GitHub
2. **New → Blueprint** → select your repo (uses `render.yaml` automatically)  
   **OR** **New → Web Service** with these settings:

| Setting | Value |
| ------- | ----- |
| Root Directory | `backend` |
| Build Command | `npm install --include=dev && npm run render:build` |
| Start Command | `npm start` |
| Instance Type | Free |

3. Add **Environment Variables**:

```env
DATABASE_URL=your_neon_connection_string
CORS_ORIGIN=https://YOUR-SITE.vercel.app
CONTACT_EMAIL_TO=anujpatel299@gmail.com
SMTP_USER=anujpatel299@gmail.com
SMTP_PASS=your_gmail_app_password
GOOGLE_DRIVE_RESUME_FILE_ID=your_resume_file_id
GOOGLE_DRIVE_AVATAR_FILE_ID=your_photo_file_id
```

4. Deploy and copy your backend URL (e.g. `https://portfolio-api.onrender.com`)

> **Note:** Free Render services sleep after 15 min of inactivity. First request may take ~30–60 seconds.

> Set `CORS_ORIGIN` to your Vercel URL after Step 4. You can redeploy Render once you have it.

### Step 4 — Deploy frontend on Vercel

1. Sign up at [vercel.com](https://vercel.com) → connect GitHub
2. **Add New → Project** → import your repo
3. Settings:

| Setting | Value |
| ------- | ----- |
| Root Directory | `frontend` |
| Framework Preset | Vite (auto-detected) |
| Build Command | `npm run build` |
| Output Directory | `dist` |

4. Add **Environment Variable**:

```env
VITE_API_URL=https://portfolio-api.onrender.com
```

(Use your actual Render URL from Step 3, no trailing slash.)

5. Click **Deploy**

### Step 5 — Finish CORS

Go back to Render → your backend → **Environment** → update:

```env
CORS_ORIGIN=https://your-actual-site.vercel.app
```

Redeploy the backend if needed.

### Step 6 — Test live site

- Open your Vercel URL
- Check profile, projects, and resume load
- Submit the contact form → check **anujpatel299@gmail.com**

### Custom domain (optional)

- **Vercel:** Project → Settings → Domains
- **Render:** Service → Settings → Custom Domains

Update `CORS_ORIGIN` and `VITE_API_URL` if you change domains.
