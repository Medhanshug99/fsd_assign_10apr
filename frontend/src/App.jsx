import { useEffect, useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { getTasks } from './services/taskService';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggle = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const retryLoad = () => {
    setError(null);
    setLoading(true);
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Tasks</h1>
        {tasks.length > 0 && (
          <p className="app-subtitle">{remaining} of {tasks.length} remaining</p>
        )}
      </header>

      <main className="app-main">
        <AddTaskForm onAdd={handleAdd} />

        {loading && <p className="status-message">Loading…</p>}

        {error && (
          <div className="global-error" role="alert">
            <span>Failed to load tasks: {error}</span>
            <button className="btn btn-ghost" onClick={retryLoad}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}
