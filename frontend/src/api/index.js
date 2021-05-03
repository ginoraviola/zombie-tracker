import axios from 'axios';

const API = axios.create({baseURL: 'https://zombietrack.herokuapp.com/'});

export const getLocations = () => API.get('/locations');
export const getLocationInfo = id => API.get(`/location/${id}`);
export const removeZombie = data => API.post('/remove', data);
export const relocateZombie = data => API.post('/relocate', data);
