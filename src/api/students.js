//This file contains functions for making API requests to the backend server for managing students.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Something went wrong");
  }
  return res.json();
}

export async function fetchStudents() {
  const res = await fetch(`${API_URL}/students`);
  return handleResponse(res);
}

export async function fetchStudent(id) {
  const res = await fetch(`${API_URL}/students/${id}`);
  return handleResponse(res);
}

export async function createStudent(student) {
  const res = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return handleResponse(res);
}

export async function updateStudent(id, student) {
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return handleResponse(res);
}

export async function deleteStudent(id) {
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}