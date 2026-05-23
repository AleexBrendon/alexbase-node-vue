import { http } from "../../../api/http";
import type {
  CreateUserPayload,
  UpdateUserPayload,
  User,
} from "../types/user.type";

export type UsersResponse = {
  data: User[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};

export async function getUsers(params?: {
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<UsersResponse> {
  const response = await http.get("/users", {
    params,
  });

  return response.data.data;
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const response = await http.post("/users", payload);

  return response.data.data;
}

export async function updateUser(
  id: string,
  payload: UpdateUserPayload
): Promise<User> {
  const response = await http.patch(`/users/${id}`, payload);

  return response.data.data;
}

export async function deleteUser(id: string): Promise<void> {
  await http.delete(`/users/${id}`);
}