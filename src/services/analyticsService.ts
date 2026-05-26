import api from "./api"
import type { AnalyticsData } from "../types/analytics"

export const getAnalytics = async (): Promise<AnalyticsData> => {

  const response = await api.get("/admin/analytics")

  return response.data
}