import { fetchHttpClient } from "./fetch-http-client";

export interface HttpClient {
  get: <ResponseType>(
    url: string,
    headers?: Record<string, string>
  ) => Promise<ResponseType>;
}

export type HttpClientError = {
  status: number;
  statusText: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHttpClientError = (error: any): error is HttpClientError => {
  return (
    typeof error.status === "number" && typeof error.statusText === "string"
  );
};

export { fetchHttpClient };
