import { useState } from 'react';
import { toggleTask, deleteTask } from '../services/taskService';

export default function TaskItem({ task, onToggle, onDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await toggleTask(task.id, !task.completed);
      onToggle(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTask(task.id);
      onDelete(task.id);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <li className={`task-item${task.completed ? ' task-item--completed' : ''}`}>
      <label className="task-label">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={isLoading}
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <span className="task-title">{task.title}</span>
      </label>

      <button
        className="btn btn-danger"
        onClick={handleDelete}
        disabled={isLoading}
        aria-label={`Delete task: ${task.title}`}
      >
        {isLoading ? '…' : 'Delete'}
      </button>

      {error && <p className="task-error" role="alert">{error}</p>}
    </li>
  );
}
