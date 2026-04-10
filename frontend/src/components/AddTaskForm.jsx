import { useState } from 'react';
import { createTask } from '../services/taskService';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const newTask = await createTask(title.trim());
      onAdd(newTask);
      setTitle('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          id="task-input"
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          maxLength={100}
          aria-label="New task title"
        />
        <button
          id="add-task-btn"
          type="submit"
          className="btn btn-primary"
          disabled={!title.trim() || isSubmitting}
        >
          {isSubmitting ? 'Adding…' : 'Add Task'}
        </button>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}
