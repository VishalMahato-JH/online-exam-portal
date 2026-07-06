import api from "./api";

export const loginUser = async (
  email: string,
  password: string
) => {

  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  const parts =
    response.data.split("|");

  localStorage.setItem(
    "token",
    parts[0]
  );

  localStorage.setItem(
    "email",
    parts[1]
  );

  localStorage.setItem(
    "role",
    parts[2]
  );

  localStorage.setItem(
  "name",
  parts[3]
  );

  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {

  const response =
    await api.post(
      "/auth/register",
      {
        name,
        email,
        password,
        role: "STUDENT",
      }
    );

  return response.data;
};