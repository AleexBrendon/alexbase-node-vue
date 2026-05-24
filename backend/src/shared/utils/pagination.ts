import type { Request } from "express";

export function getPaginationParams(request: Request) {
  const page = Math.max(Number(request.query.page) || 1, 1);
  const perPage = Math.min(
    Math.max(Number(request.query.perPage) || 5, 1),
    100
  );

  const skip = (page - 1) * perPage;

  return {
    page,
    perPage,
    skip,
  };
}