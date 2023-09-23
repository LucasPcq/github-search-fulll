import { HttpClient } from ".";

export const fetchHttpClient = (): HttpClient => ({
  get: async <ResponseType>(
    url: string,
    headers?: Record<string, string>
  ): Promise<ResponseType> => {
    const response = await fetch(url, { method: "GET", headers });
    return response.json();
  },
});
