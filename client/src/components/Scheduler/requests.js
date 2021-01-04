const axios = require("axios");

export const getCalendar = (data) => axios.get(`/api/scheduler`, data);

export const addCalendar = data => axios.post(`/api/scheduler`, data);

export const editCalendar = data =>
  axios.put(`/api/scheduler/${data.id}`, data);

export const deleteCalendar = id => axios.delete(`/api/scheduler/${id}`);