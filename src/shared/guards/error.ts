import { HttpClientError, ServiceError } from "../adapters/errors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHttpClientError = (error: any): error is HttpClientError => {
  return (
    typeof error.status === "number" && typeof error.statusText === "string"
  );
};

export const isServiceError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): error is ServiceError => {
  return typeof error.status === "number" && typeof error.message === "string";
};
