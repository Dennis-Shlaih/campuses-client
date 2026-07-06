
import client from './client'//imports client file from my local machine
//This file contains functions for making API requests to the backend server for managing campuses.

export async function getAllCampuses() { // this function allows for retrieval of information from the backend via
  const { data } = await client.get('/campuses'); // the usage of the messanger client. and the get funciton followed by /campuses which is the location that follows after it is the path
  return data; // returns the campuses, await is also what allows for the function to be paused until the information is retrieved because it takes time.
};

export async function getCampus(id) { //same story getCampus this time individual so it gets an id
  const { data } = await client.get(`/campuses/${id}`); //from the backend so we use await to wait for it
  return data;
};

export async function createCampus(input) { //here we are creating a campus by sending information out to the backend from the frontend
  const { data } = await client.post('/campuses', input); //.post sends the info out instead of recieving we wait for it with await pause this function
  return data;
};

export async function updateCampus(id, input) { //similar idea here here we update an already existing campus
  const { data } = await client.put(`/campuses/${id}`, input); // we are updating said campus with put to update informaitno that is already their basically replacing it ofcourse also from the backend so we wait for it
  return data;
};

export async function deleteCampus(id) { //same idea but were not returning anything still have to wait for the stale message to arrive in the backend though
  await client.delete(`/campuses/${id}`);
};

