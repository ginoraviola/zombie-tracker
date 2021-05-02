import axios from "axios";

const API = axios.create({ baseURL: 'http://192.168.1.22:5000' });

export const getLocations = () => API.get('/locations');
export const getLocationInfo = (id) => API.get(`/location/${id}`);
export const removeZombie = (data) => API.post('/remove', data);
export const relocateZombie = (data) => API.post('/relocate', data);

