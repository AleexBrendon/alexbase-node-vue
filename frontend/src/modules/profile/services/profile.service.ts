import { http } from "../../../api/http";
import type {
  ProfileUser,
  UpdateProfilePayload,
} from "../types/profile.type";

export async function getProfile(): Promise<ProfileUser> {
  const response = await http.get("/me");

  return response.data.data;
}

export async function updateProfile(
  payload: UpdateProfilePayload,
): Promise<ProfileUser> {
  const response = await http.patch("/me", payload);

  return response.data.data;
}