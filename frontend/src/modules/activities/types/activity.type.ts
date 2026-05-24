export type Activity = {
  id: string;
  type: "created" | "updated" | "deleted" | string;
  title: string;
  description?: string | null;
  userId?: string | null;
  userName?: string | null;
  createdAt: string;
};