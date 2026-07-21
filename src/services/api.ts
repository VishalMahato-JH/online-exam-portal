import axios from "axios"

const api = axios.create({
  baseURL: "https://online-exam-backend-production-24cd.up.railway.appnpm run dev/api"
});

export default api