import { GithubUser } from "@/modules/github/core/types/GithubUser";

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
