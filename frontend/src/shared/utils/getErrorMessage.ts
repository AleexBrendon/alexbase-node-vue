import type { AxiosError } from "axios";

type ApiErrorResponse = {
  message?: string;
};

export function getErrorMessage(
  error: unknown,
  fallback = "Ocorreu um erro inesperado.",
) {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  return axiosError.response?.data?.message || fallback;
}