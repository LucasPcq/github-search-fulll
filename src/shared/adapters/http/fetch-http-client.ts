import { HttpClient, HttpClientError } from ".";

export const fetchHttpClient = (): HttpClient => ({
  get: async <ResponseType>(
    url: string,
    headers?: Record<string, string>
  ): Promise<ResponseType> => {
    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      const error: HttpClientError = {
        status: response.status,
        statusText: response.statusText,
      };

      return Promise.reject(error);
    }

    return response.json();
  },
});
