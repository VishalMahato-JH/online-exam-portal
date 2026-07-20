import axios from "axios"

const api = axios.create({
  baseURL: "https://online-exam-backend-production-89c9.up.railway.app/api"
});

export default api