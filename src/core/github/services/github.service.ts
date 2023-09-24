import { HttpClient, isHttpClientError } from "../../../shared/adapters/http";
import { GithubUser } from "../types/Github";

export interface FetchUsers {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}

export interface GithubServiceError {
  status: number;
  message: string;
}

export const isGithubServiceError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): error is GithubServiceError => {
  return typeof error.status === "number" && typeof error.message === "string";
};

export interface IGithubService {
  fetchUsersByLogin: (searchLogin: string) => Promise<FetchUsers>;
}

export const githubService = (http: HttpClient): IGithubService => ({
  fetchUsersByLogin: async (searchLogin: string): Promise<FetchUsers> => {
    try {
      const response = await http.get<FetchUsers>(
        `https://api.github.com/search/users?q=${searchLogin}`
      );

      return response;
    } catch (error: unknown) {
      if (isHttpClientError(error)) {
        if (error.status === 403) {
          throw {
            status: 403,
            message: "Rate limit exceeded",
          } as GithubServiceError;
        }

        throw {
          status: error.status,
          message: error.statusText,
        } as GithubServiceError;
      }

      throw {
        status: 0,
        message: "Unknow error",
      };
    }
  },
});
