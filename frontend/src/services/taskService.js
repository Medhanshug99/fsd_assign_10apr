const BASE_URL = 'http://localhost:3001/api/tasks';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
};

export const getTasks = () =>
  fetch(BASE_URL).then(handleResponse);

export const createTask = (title) =>
  fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  }).then(handleResponse);

export const toggleTask = (id, completed) =>
  fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  }).then(handleResponse);

export const deleteTask = (id) =>
  fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
