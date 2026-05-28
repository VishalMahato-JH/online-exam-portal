import axios from "axios";

const API = "http://localhost:8081/api/auth";

export const loginUser = async (
  email: string,
  password: string
) => {

  const response = await axios.post(
    `${API}/login`,
    {
      email: email,
      password: password,
    }
  );

  return response.data;
};