export type ProfileUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfilePayload = {
  name?: string;
  email?: string;
  password?: string;
};