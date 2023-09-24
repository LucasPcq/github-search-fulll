import { useGithubContext } from "../../context/github/useGithubContext";
import { GithubContextEventType } from "../../context/github/EventContext";

export enum GithubUserListViewModelType {
  NO_USERS = "NO_USERS",
  USERS_LOADING = "USERS_LOADING",
  USERS_LOADED = "USERS_LOADED",
  ERROR_FETCHING_USERS = "ERROR_FETCHING_USERS",
}

export type GithubUserListItemView = {
  index: number;
  id: number;
  login: string;
  avatar: string;
  url: string;
  isSelected: boolean;
  displayEditCheckbox: boolean;
  onClickToggleSelectUser: (userIndex: number) => void;
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
    }
  | {
      type: GithubUserListViewModelType.ERROR_FETCHING_USERS;
      message: string;
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

  if (state.error) {
    return {
      type: GithubUserListViewModelType.ERROR_FETCHING_USERS,
      message: state.error,
    };
  }

  const onClickToggleSelectUser = (userIndex: number) => {
    if (!state.selectedUserIndexes.includes(userIndex)) {
      dispatch({
        type: GithubContextEventType.USER_SELECTED,
        userIndexes: userIndex,
      });
    } else {
      dispatch({
        type: GithubContextEventType.USER_DESELECTED,
        userIndexes: userIndex,
      });
    }
  };

  return {
    type: GithubUserListViewModelType.USERS_LOADED,
    users: state.users.map((user, index) => {
      return {
        index,
        id: user.id,
        login: user.login,
        avatar: user.avatar_url,
        url: user.html_url,
        isSelected: state.selectedUserIndexes.includes(index),
        displayEditCheckbox: state.isEditModeActivate,
        onClickToggleSelectUser,
      };
    }),
  };
};
