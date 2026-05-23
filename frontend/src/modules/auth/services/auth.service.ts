import { http } from "../../../api/http";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await http.post("/auth/login", payload);

  return response.data.data;
}

export async function register(payload: RegisterPayload): Promise<AuthUser> {
  const response = await http.post("/auth/register", payload);

  return response.data.data;
}