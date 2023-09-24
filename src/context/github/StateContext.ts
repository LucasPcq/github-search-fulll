import { GithubUser } from "../../core/github/types/Github";

export type GithubStateContext = {
  users: GithubUser[];
  selectedUserIds: number[];
  loading: boolean;
  isEditModeActivate: boolean;
};

export const initialGithubStateContext: GithubStateContext = {
  users: [],
  selectedUserIds: [],
  loading: false,
  isEditModeActivate: false,
};
