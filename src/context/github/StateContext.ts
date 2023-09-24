import { GithubUser } from "../../core/github/types/Github";

export type GithubStateContext = {
  users: GithubUser[];
  selectedIndexes: number[];
  loading: boolean;
  error: string | null;
  isEditModeActivate: boolean;
};

export const initialGithubStateContext: GithubStateContext = {
  users: [],
  selectedIndexes: [],
  loading: false,
  error: null,
  isEditModeActivate: false,
};
