import { useGithubContext } from "../../context/github/useGithubContext";
import { GithubContextEventType } from "../../context/github/EventContext";

export enum GithubUserListViewModelType {
  NO_USERS = "NO_USERS",
  USERS_LOADING = "USERS_LOADING",
  USERS_LOADED = "USERS_LOADED",
}

export type GithubUserListItemView = {
  id: number;
  login: string;
  avatar: string;
  url: string;
  isSelected: boolean;
  displayEditCheckbox: boolean;
  onClickToggleSelectUser: (userId: number) => void;
};

export type GithubUserListViewModel =
  | {
      type: GithubUserListViewModelType.USERS_LOADING;
    }
  | {
      type: GithubUserListViewModelType.NO_USERS;
      message: string;
    }
  | {
      type: GithubUserListViewModelType.USERS_LOADED;
      users: GithubUserListItemView[];
    };

export const useGithubUserListViewModel = (): GithubUserListViewModel => {
  const { state, dispatch } = useGithubContext();

  if (state.loading) {
    return {
      type: GithubUserListViewModelType.USERS_LOADING,
    };
  }

  if (state.users.length < 1) {
    return {
      type: GithubUserListViewModelType.NO_USERS,
      message: "No users",
    };
  }

  const onClickToggleSelectUser = (userId: number) => {
    if (!state.selectedUserIds.includes(userId)) {
      dispatch({ type: GithubContextEventType.USER_SELECTED, userId });
    } else {
      dispatch({ type: GithubContextEventType.USER_DESELECTED, userId });
    }
  };

  return {
    type: GithubUserListViewModelType.USERS_LOADED,
    users: state.users.map((user) => {
      return {
        id: user.id,
        login: user.login,
        avatar: user.avatar_url,
        url: user.html_url,
        isSelected: state.selectedUserIds.includes(user.id),
        displayEditCheckbox: state.isEditModeActivate,
        onClickToggleSelectUser,
      };
    }),
  };
};
