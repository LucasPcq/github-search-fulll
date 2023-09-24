import { GithubUser } from "../types/GithubUser";

export interface FetchUsers {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}
