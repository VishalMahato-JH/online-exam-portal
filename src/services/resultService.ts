import api from "./api";

export const getRecentResults = async () => {

  const response = await api.get("/results/recent");

  return response.data;

};

export const getLeaderboard = async () => {
  const response = await api.get("/results/leaderboard");
  return response.data;
};