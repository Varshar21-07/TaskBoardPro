const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}

export async function getProjects() {
  return fetchJSON(`${API_BASE_URL}/projects`);
}

export async function getProjectById(id) {
  return fetchJSON(`${API_BASE_URL}/projects/${id}`);
}

export async function createProject(data) {
  return fetchJSON(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateProject(id, data) {
  return fetchJSON(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteProject(id) {
  return fetchJSON(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
  });
}

export async function getTasks(projectId) {
  const url = projectId ? `${API_BASE_URL}/tasks?projectId=${projectId}` : `${API_BASE_URL}/tasks`;
  return fetchJSON(url);
}

export async function getTaskById(id) {
  return fetchJSON(`${API_BASE_URL}/tasks/${id}`);
}

export async function createTask(data) {
  return fetchJSON(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateTask(id, data) {
  return fetchJSON(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteTask(id) {
  return fetchJSON(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
}

export async function inviteProjectMember({ email, projectId, inviterName }) {
  return fetchJSON(`${API_BASE_URL}/projects/invite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, projectId, inviterName }),
  });
}

export async function addProjectMember({ projectId, email }) {
  return fetchJSON(`${API_BASE_URL}/projects/add-member`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, email }),
  });
}
