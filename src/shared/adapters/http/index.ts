import { fetchHttpClient } from "./fetch-http-client";

export interface HttpClient {
  get: <ResponseType>(
    url: string,
    headers?: Record<string, string>
  ) => Promise<ResponseType>;
}

export { fetchHttpClient };
