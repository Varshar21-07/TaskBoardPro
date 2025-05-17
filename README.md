# TaskBoard Pro

A full-stack Kanban project management app with team collaboration, Google login, email invites, and persistent storage using MongoDB.

---

## Features
- User authentication (local & Google OAuth)
- Create/manage projects and tasks (CRUD)
- Kanban board with drag-and-drop task status
- Invite project members by email
- Project owner/member management
- All data stored in MongoDB
- Responsive React frontend (Vite + MUI)

---

## Project Structure

```
backend/         # Node.js/Express/MongoDB API
  server.js
  src/
    models/      # Mongoose models (User, Project, Task)
    controllers/ # API logic
    routes/      # Express routes
    utils/       # Email sending, etc.

taskboardpro/    # React frontend (Vite + MUI)
  src/
    api/         # API calls
    pages/       # Main UI pages
    context/     # Auth context
```

---

## Getting Started (Development)

### 1. Clone the repo
```sh
git clone <your-repo-url>
cd ProIntern
```

### 2. Setup Backend
```sh
cd backend
npm install
# Create .env file (see below)
npm start
```

#### .env example
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/taskboardpro
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

### 3. Setup Frontend
```sh
cd ../taskboardpro
npm install
# Create .env file (see below)
npm run dev
```

#### taskboardpro/.env example
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Deployment

- Deploy backend (Node.js) to [Render](https://render.com), [Railway](https://railway.app), or [Heroku](https://heroku.com)
- Deploy frontend (Vite/React) [Vercel](https://vercel.com)
- Set all environment variables in your host's dashboard
- Update `VITE_API_BASE_URL` in frontend to point to your deployed backend

---

## API Endpoints (Backend)
- `/api/auth` - Auth routes (login, Google, etc)
- `/api/users` - User CRUD
- `/api/projects` - Project CRUD, invite/add member
- `/api/tasks` - Task CRUD

---

## Scripts

### Backend
- `npm start` — Start Express server

### Frontend
- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

---

## Credits
- React, Vite, Material UI
- Node.js, Express, Mongoose
- MongoDB Atlas
- Nodemailer
- Google OAuth
