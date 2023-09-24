import { useCallback, useRef } from "react";

import {
  GithubContextEventType,
  useGithubContext,
} from "../../context/github/useGithubContext";

import { githubService } from "../../core/github/services/github.service";
import { getGithubUserListByUserLogin } from "../../core/github/use-cases/get-github-user-list-by-user-login";

import { fetchHttpClient } from "../../shared/adapters/http";
import { debounce } from "../../shared/utils";

export type GithubSearchViewModel = {
  messageElementsSelected: string;
  atLeastOneElementSelected: boolean;
  actions: {
    onClickDeleteSelectedUsers: () => void;
    onClickDuplicateSelectedUsers: () => void;
    onClickToggleSelectAllUsers: () => void;
    onUserLoginChange: (userLogin: string) => void;
  };
};

export const useGithubSearchViewModel = (): GithubSearchViewModel => {
  const { state, dispatch } = useGithubContext();

  //TODO: Improve that
  const debouncedSearch = useRef(
    debounce(async (userLogin: string) => {
      getGithubUserListByUserLogin(githubService(fetchHttpClient()))(userLogin)(
        dispatch
      );
    }, 700)
  );

  const searchGithubUsersByUserLogin = useCallback(
    (userLogin: string) => {
      dispatch({
        type: GithubContextEventType.USER_SEARCH_INITIATED,
        userLogin,
      });

      debouncedSearch.current(userLogin);
    },
    [dispatch]
  );

  const onClickDeleteSelectedUsers = () =>
    dispatch({
      type: GithubContextEventType.USERS_DELETED,
      userIds: state.selectedUserIds,
    });

  const onClickDuplicateSelectedUsers = () =>
    dispatch({
      type: GithubContextEventType.USERS_DUPLICATED,
      userIds: state.selectedUserIds,
    });

  const onClickToggleSelectAllUsers = () => {
    if (state.selectedUserIds.length === 0) {
      dispatch({ type: GithubContextEventType.ALL_USER_SELECTED });
    } else {
      dispatch({ type: GithubContextEventType.ALL_USER_DESELECTED });
    }
  };

  const actions = {
    onClickDeleteSelectedUsers,
    onClickDuplicateSelectedUsers,
    onClickToggleSelectAllUsers,
    onUserLoginChange: searchGithubUsersByUserLogin,
  };

  if (state.selectedUserIds.length > 0) {
    return {
      messageElementsSelected: `${state.selectedUserIds.length} elements selected`,
      atLeastOneElementSelected: true,
      actions,
    };
  }

  return {
    messageElementsSelected: "Select all elements",
    atLeastOneElementSelected: false,
    actions,
  };
};
