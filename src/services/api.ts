import axios from "axios"

const api = axios.create({
  baseURL: "https://online-exam-backend-production-a3ea.up.railway.app/api"
});

export default api