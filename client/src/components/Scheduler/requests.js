const APIURL = "http://localhost:3000";
const axios = require("axios");
export const getCalendar = () => axios.get(`${APIURL}/calendar`);
export const addCalendar = data => axios.post(`${APIURL}/calendar`, data);
export const editCalendar = data =>
  axios.put(`${APIURL}/calendar/${data.id}`, data);
export const deleteCalendar = id => axios.delete(`${APIURL}/calendar/${id}`);