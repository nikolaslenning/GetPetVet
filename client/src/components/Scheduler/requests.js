const axios = require("axios");

export const getCalendar = (data) => axios.get(`/scheduler`, data);

export const addCalendar = data => axios.post(`/scheduler`, data);

export const editCalendar = data =>
  axios.put(`/scheduler/${data.id}`, data);

export const deleteCalendar = id => axios.delete(`/scheduler/${id}`);