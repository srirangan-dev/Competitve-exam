# ApexPrep — JEE & NEET Exam Prep Platform

A full-stack competitive exam preparation platform for JEE and NEET aspirants, featuring MCQ-based mock tests, study notes, video lectures, a study planner, revision tracker, exam notifications, and an AI-powered chatbot for doubt solving.

> **Note:** The app currently displays both "ApexPrep" (logo) and "Learnify" (subtitle) branding — looks like a rebrand in progress. Update this once the naming is finalized.

> ⚠️ **Repo/URL check needed:** This README was originally built for the `Competitve-exam` GitHub repo (deployed at `competitve-exam.vercel.app`), but the dashboard screenshot you shared is from `jee-neet-exam.vercel.app` — which matches the *separate* "JEE & NEET Exam Prep Platform" project on your resume. Please confirm: is `Competitve-exam` the same codebase as `jee-neet-exam.vercel.app`, or are these two different repos/deployments? I've used the live URL from your screenshot below, but the repo link may need correcting.

🔗 **Live Demo:** [jee-neet-exam.vercel.app](https://jee-neet-exam.vercel.app)

---

## ✨ Features

- 📊 **Dashboard** — student overview with subject mastery, weekly test scores, upcoming tests, and recent activity feed
- 📖 **Mock Tests** — full-length and subject-wise mock exams (e.g. "Full Mock Test 4" – 180m, 75 Qs)
- ✅ **Question Bank** — topic-wise practice questions
- 📅 **Study Planner** — exam countdown tracking (e.g. "45 days remaining" for JEE Advanced 2025)
- 📄 **Notes** — study notes by subject/topic
- 🔄 **Revisions** — revision tracker
- 🔔 **Exam Notifications** — scheduled test/exam alerts via SMTP email
- 📰 **Current Affairs** — GK/current affairs section (useful for exams like NEET/general aptitude)
- ▶️ **Video Lectures** — recorded lecture content
- 🤖 **AI-powered chatbot** (powered by Groq AI) — floating chat widget for doubt solving and personalized guidance
- 🔐 **Secure user authentication & profile management**
- ⚙️ **Settings** — including light/dark mode toggle
- 📊 **Subject mastery tracking** — per-subject progress bars (e.g. Physics 72%, Chemistry 65%, Mathematics 80%)
- 📈 **Weekly test score visualization** — bar chart of daily test performance (Mon–Sun)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI / Chatbot | Groq AI (LLM inference) |
| Auth | JWT-based authentication *(confirm exact method used)* |
| Email | SMTP integration for notifications |
| Deployment | Frontend on Vercel, Backend on Render |

> **Note:** Repo language stats show JavaScript (96.9%), CSS (3%), HTML (0.1%) — indicating a React + plain CSS setup with no TypeScript. Vite is used as the build tool/dev server for the frontend.

---

## 📁 Project Structure

```
Competitve-exam/
├── school/          # Main application code
└── package.json     # Project dependencies and scripts
```

> ⚠️ I couldn't browse the full file tree (GitHub blocks automated crawling, and the API was rate-limited). Please expand this section with the actual subfolders inside `school/` (e.g. `client/`, `server/`, `models/`, `routes/`, `components/`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Installation

```bash
# Clone the repository
git clone https://github.com/srirangan-dev/Competitve-exam.git
cd Competitve-exam

# Install dependencies
npm install

# Start the Vite frontend dev server
npm run dev

# In a separate terminal, start the backend server
npm start
```

> Since the frontend uses Vite, the dev script is typically `npm run dev` (not `npm start`) — check your `package.json` scripts and update this section to match.

### Environment Variables

Create a `.env` file in the root directory with the following (adjust based on your actual config):

```
# Backend
MONGODB_URI=your_mongodb_atlas_connection_string
SMTP_USER=your_email
SMTP_PASS=your_email_password
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
PORT=5000

# Frontend (Vite requires the VITE_ prefix to expose vars to the client)
VITE_API_BASE_URL=http://localhost:5000
```

> ⚠️ Get your Groq API key from [console.groq.com](https://console.groq.com). Never commit your `.env` file — make sure it's listed in `.gitignore`.

---

## 📦 Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com)
- **Backend:** Deployed on [Render](https://render.com)
- **Database:** MongoDB Atlas (cloud-hosted)

---

## 👤 Author

**Sri Rangan T**
- GitHub: [@srirangan-dev](https://github.com/srirangan-dev)
- LinkedIn: [sri-rangan-3a2a48333](https://linkedin.com/in/sri-rangan-3a2a48333)
- LeetCode: [Srirangant](https://leetcode.com/u/Srirangant)

---

## 📄 License

This project is open source. Add a license file (e.g., MIT) if you intend for others to use or contribute to it.
