import { GithubUser } from "../../core/github/types/Github";

export type GithubStateContext = {
  users: GithubUser[];
  selectedUserIndexes: number[];
  loading: boolean;
  error: string | null;
  isEditModeActivate: boolean;
};

export const initialGithubStateContext: GithubStateContext = {
  users: [],
  selectedUserIndexes: [],
  loading: false,
  error: null,
  isEditModeActivate: false,
};
