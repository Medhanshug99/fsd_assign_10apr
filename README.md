# Task Manager

A simple full-stack task manager built with React and Express. You can add tasks, mark them as done, and delete them. Nothing fancy — just a clean, working CRUD app.

---

## Why I built this

This was a focused 2-hour exercise to practice building a proper full-stack app from scratch — writing a real REST API, connecting it to a React frontend, and handling edge cases correctly without cutting corners.

---

## Tech Stack

**Frontend**
- React (with hooks)
- Vite
- Plain Fetch API — no axios, no extra dependencies

**Backend**
- Node.js + Express
- In-memory storage (intentionally — no database setup needed)

---

## Project Structure

```
├── backend/
│   ├── app.js                  # Express app entry point
│   ├── routes/
│   │   └── taskRoutes.js       # Route definitions
│   ├── controllers/
│   │   └── taskController.js   # Business logic
│   └── data/
│       └── store.js            # In-memory task store
│
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── components/
│       │   ├── AddTaskForm.jsx
│       │   ├── TaskItem.jsx
│       │   └── TaskList.jsx
│       └── services/
│           └── taskService.js  # All API calls in one place
│
└── prd.txt                     # Original requirements
```

---

## Getting Started

You'll need two terminals — one for the backend, one for the frontend.

### Backend

```bash
cd backend
npm install
npm start
```

Runs on `http://localhost:3001`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

---

## API

| Method | Endpoint | What it does |
|--------|----------|--------------|
| GET | `/api/tasks` | Fetch all tasks |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Toggle completion |
| DELETE | `/api/tasks/:id` | Delete a task |

### Task shape

```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2026-04-10T10:00:00Z"
}
```

### Validation rules (POST)

- Title is required
- Title can't be blank (whitespace doesn't count)
- Max 100 characters

---

## Error Format

All errors come back in the same shape:

```json
{ "error": "Error message here" }
```

Status codes used: `400`, `404`, `500`

---

## What's handled

- Empty or whitespace-only titles are rejected on both frontend and backend
- Buttons disable during API calls so you can't double-submit
- Each task shows its own error if something goes wrong
- If the initial load fails, there's a retry button
- Deleting or toggling only updates the UI after the server responds

---

## What's intentionally missing

- No database — data resets when you restart the server (by design)
- No authentication
- No filtering or sorting
- No edit functionality

These were deliberately left out to stay focused on core CRUD and API design within the time constraint.

---

## Notes

Built as part of a full-stack development assignment. The goal was clean structure and correct behavior — not feature count.
