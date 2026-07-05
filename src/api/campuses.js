
import client from './client'
//This file contains functions for making API requests to the backend server for managing campuses.

export async function getAllCampuses() {
  const { data } = await client.get('/campuses');
  return data;
};

export async function getCampus(id) {
  const { data } = await client.get(`/campuses/${id}`);
  return data;
};

export async function createCampus(input) {
  const { data } = await client.post('/campuses', input);
  return data;
};

export async function updateCampus(id, input) {
  const { data } = await client.put(`/campuses/${id}`, input);
  return data;
};

export async function deleteCampus(id) {
  await client.delete(`/campuses/${id}`);
};

