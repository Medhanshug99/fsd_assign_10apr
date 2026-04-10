# Checkd

A no-frills task manager. Add things you need to do, check them off, delete them when you're done. That's literally it.

Built this as a 2-hour full-stack exercise — wanted to keep it tight and actually finish it rather than spiral into feature creep.

---

## Stack

- **Frontend** — React + Vite, plain Fetch API
- **Backend** — Node.js + Express
- **Storage** — In-memory (resets on restart, intentional)

---

## Running locally

You'll need two terminals open.

**Backend first:**
```bash
cd backend
npm install
npm start
```
Starts on port 3001.

**Then the frontend:**
```bash
cd frontend
npm install
npm run dev
```
Opens at `http://localhost:5173`.

That's it. No env files, no config, no Docker.

---

## Folder layout

```
backend/
  app.js
  routes/taskRoutes.js
  controllers/taskController.js
  data/store.js

frontend/
  src/
    App.jsx
    components/
      AddTaskForm.jsx
      TaskItem.jsx
      TaskList.jsx
    services/
      taskService.js
```

Kept the API calls in one file (`taskService.js`) so components don't have raw fetch calls scattered everywhere. Controllers handle the logic, routes just wire things up. Pretty standard separation.

---

## API

```
GET    /api/tasks        → get all tasks
POST   /api/tasks        → create a task  { title: "..." }
PATCH  /api/tasks/:id    → toggle done    { completed: true/false }
DELETE /api/tasks/:id    → remove it
```

Errors always come back as `{ "error": "message" }` with the right status code (400, 404, 500).

---

## A few things I was deliberate about

- The UI doesn't update until the server actually responds. No optimistic updates. Safer, more honest.
- Buttons lock during requests so you can't spam-click and get weird state.
- Whitespace-only titles get rejected on both ends — frontend skips the request, backend double-checks anyway.
- Each task handles its own error display. If toggling one task fails, it shows under that task, not globally.

---

## What's not here (on purpose)

No database, no login, no filters. The goal was to build something correct and clean within 2 hours, not to build Notion.

Data lives in memory and disappears on restart. That's a known trade-off, not a bug.

---

## If you want to run your own version

Fork it, `npm install` in both folders, and you're good. No API keys, no accounts, no setup drama.
