import { GithubUser } from "../../core/github/types/Github";

export type GithubStateContext = {
  users: GithubUser[];
  selectedUserIds: number[];
  loading: boolean;
  error: string | null;
  isEditModeActivate: boolean;
};

export const initialGithubStateContext: GithubStateContext = {
  users: [],
  selectedUserIds: [],
  loading: false,
  error: null,
  isEditModeActivate: false,
};
