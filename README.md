# Suhail Hossain — MERN Stack Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-00e5ff?style=for-the-badge&logo=google-cloud)](https://ais-pre-yqoefgbltu6unsda4ttaj7-394138180261.asia-northeast1.run.app)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

> Modern, responsive developer portfolio for **Suhail Hossain**, Full-Stack MERN Developer specializing in React, Node.js, Express, MongoDB, and Tailwind CSS.

---

## 🌐 Live Application URLs

- **Public Production Link**: [https://ais-pre-yqoefgbltu6unsda4ttaj7-394138180261.asia-northeast1.run.app](https://ais-pre-yqoefgbltu6unsda4ttaj7-394138180261.asia-northeast1.run.app)
- **GitHub Profile**: [https://github.com/SuhailDE](https://github.com/SuhailDE)

---

## ✨ Features

- **Hero & Branding**:
  - Recreated with exact styling from design mockup: `SH.` brand wordmark, `Open to opportunities` status pill, headline, and `Contact Me ↗` / `About Me` CTAs.
  - Floating `Full-Stack Web Development` showcase card with `React · Node.js · Express · MongoDB`.
  - Centered circular down arrow navigation.
- **Backend & MongoDB Layer**:
  - Full-stack Node.js Express server mounting Vite middlewares in development.
  - Persistent MongoDB database collections (`projects`, `skills`, `reviews`, `messages`).
  - **Live MongoDB Console**: An interactive in-app playground allowing recruiters to test MongoDB methods (`find`, `countDocuments`, `stats`) and monitor execution latency.
  - **Inquiries Inbox**: Complete CRUD interface to review, mark as read, or delete submitted contact messages.
- **Full-Stack Projects Showcase**:
  - High-resolution mockups for featured systems (ShopSphere E-Commerce, DevPulse Hub, TaskFlow Kanban, StreamSync Media).
  - Deep-dive architectural specs modal showing data models, API endpoints, and live/source links.
- **Skills & Technical Matrix**:
  - Interactive tabs across Frontend, Backend, Databases, and DevOps with proficiency indicators.
- **Career Timeline & Credentials**:
  - Verified work milestones, education, and MongoDB Certified Developer credentials.
- **Endorsements & Working Recommendation Submission**:
  - Verified client feedback and interactive review submission form.
- **Interactive Contact Section**:
  - Working message submission directly to the MongoDB backend with confetti celebrations and 1-click email copy.

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti |
| **Backend** | Node.js, Express.js REST API, JSON Body Parser, CORS |
| **Database** | MongoDB / Mongoose compatible document store with JSON persistence |
| **Tooling & Build** | Vite 8, TSX, ESLint, PostCSS |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/SuhailDE/mern-portfolio.git
cd mern-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/status` | Server uptime and MongoDB connection health |
| `GET` | `/api/projects` | Fetch all showcase projects with optional filtering |
| `GET` | `/api/projects/:id` | Fetch detailed project architecture by ID/slug |
| `GET` | `/api/skills` | Categorized tech stack & proficiency ratings |
| `GET` | `/api/reviews` | Client testimonials and ratings |
| `POST` | `/api/reviews` | Submit a new recommendation to the database |
| `GET` | `/api/messages` | Fetch contact inquiries stored in the database |
| `POST` | `/api/contact` | Submit a message through the contact form |
| `PATCH`| `/api/messages/:id/read` | Toggle message read/unread state |
| `DELETE`| `/api/messages/:id` | Remove a message from the database |
| `POST` | `/api/mongo/query` | Interactive MongoDB playground query executor |

---

## 👤 Author

**Suhail Hossain**
- GitHub: [@SuhailDE](https://github.com/SuhailDE)
- Email: [suhail0168@gmail.com](mailto:suhail0168@gmail.com)
