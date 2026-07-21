import axios from "axios"

const api = axios.create({
  baseURL: "https://online-exam-backend-production-24cd.up.railway.app/api"
});

export default api