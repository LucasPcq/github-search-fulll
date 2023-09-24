import { GithubUser } from "../types/Github";

export interface FetchUsers {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}
