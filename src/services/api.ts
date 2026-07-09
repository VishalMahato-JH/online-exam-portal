import axios from "axios"

const api = axios.create({

  baseURL: "https://online-exam-backend-rs3l.onrender.com/api"
})

export default api