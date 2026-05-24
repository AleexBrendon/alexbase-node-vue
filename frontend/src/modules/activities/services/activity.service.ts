import { http } from "../../../api/http";
import type { Activity } from "../types/activity.type";

export async function getActivities(): Promise<Activity[]> {
  const response = await http.get("/activities");

  return response.data.data ?? [];
}