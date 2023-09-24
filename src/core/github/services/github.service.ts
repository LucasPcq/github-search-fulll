import { HttpClient } from "../../../shared/adapters/http";
import { ServiceError } from "../../../shared/adapters/errors";
import { isHttpClientError } from "../../../shared/guards/error";

import { FetchUsers } from "../dto/fetch-users.dto";

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
          } as ServiceError;
        }

        throw {
          status: error.status,
          message: error.statusText,
        } as ServiceError;
      }

      throw {
        status: 0,
        message: "Unknow error",
      };
    }
  },
});
