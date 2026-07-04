import client from './client'
//This file contains functions for making API requests to the backend server for managing students.

export async function fetchStudents() {
  const { data } = await client.get('students');
  return data;
}

export async function fetchStudent(id) {
  const { data } = await client.get(`students/${id}`);
  return data;
}

export async function createStudent(student) {
  const { data } = await client.post('students', student);
  return data;
}

export async function updateStudent(id, student) {
  const { data } = await client.put(`students/${id}`, student);
  return data;
}

export async function deleteStudent(id) {
  await client.delete(`/students/${id}`);
}