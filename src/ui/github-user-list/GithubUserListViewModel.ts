import { useGithubContext } from "../../context/github/useGithubContext";

export enum GithubUserListViewModelType {
  NO_USERS = "NO_USERS",
  USERS_LOADED = "USERS_LOADED",
}

export type GithubUserListViewModel =
  | {
      type: GithubUserListViewModelType.NO_USERS;
      message: string;
    }
  | {
      type: GithubUserListViewModelType.USERS_LOADED;
      users: {
        id: number;
        login: string;
        avatar: string;
        url: string;
      }[];
    };

export const useGithubUserListViewModel = (): GithubUserListViewModel => {
  const { users } = useGithubContext();

  if (!users) {
    return {
      type: GithubUserListViewModelType.NO_USERS,
      message: "No users.",
    };
  }

  return {
    type: GithubUserListViewModelType.USERS_LOADED,
    users: users.map((user) => {
      return {
        id: user.id,
        login: user.login,
        avatar: user.avatar_url,
        url: user.html_url,
      };
    }),
  };
};
