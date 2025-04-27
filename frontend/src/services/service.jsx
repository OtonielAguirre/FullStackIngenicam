import axios from "axios";
 
const http = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
 
const getAll = () => {
  return http.get("/tasks");
};
 
const create = (data) => {
  return http.post("/tasks", data);
};
 
const update = (id, data) => {
  return http.put(`/tasks/${id}`, data);
};

 
export default {
  getAll,
  create,
  update,
};