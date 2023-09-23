import { HttpClient } from "../../../shared/adapters/http";
import { GithubUser } from "../types/Github";

interface FetchUsers {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}

export interface IGithubService {
  fetchUsersByLogin: (searchLogin: string) => Promise<FetchUsers>;
}

export const githubService = (http: HttpClient): IGithubService => ({
  fetchUsersByLogin: async (searchLogin: string) => {
    const data = await http.get<FetchUsers>(
      `https://api.github.com/search/users?q=${searchLogin}`
    );
    return data;
  },
});
