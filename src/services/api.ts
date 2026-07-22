import axios from "axios"

const api = axios.create({
  baseURL: "https://online-exam-backend-production-6419.up.railway.app/api"
});

export default api