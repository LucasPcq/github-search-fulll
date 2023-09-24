import { useCallback, useRef } from "react";

import { useGithubContext } from "../../context/github/useGithubContext";
import { GithubContextEventType } from "../../context/github/EventContext";

import { useGithubServiceContext } from "../../context/github-service/useGithubServiceContext";

import { getGithubUserListByUserLogin } from "../../core/github/use-cases/get-github-user-list-by-user-login";

import { debounce } from "../../shared/utils";

export type GithubSearchViewModel = {
  onUserLoginChange: (userLogin: string) => void;
};

export const useGithubSearchViewModel = (): GithubSearchViewModel => {
  const { dispatch } = useGithubContext();
  const { githubService } = useGithubServiceContext();

  const debouncedSearch = useRef(
    debounce(async (userLogin: string) => {
      getGithubUserListByUserLogin(githubService)(userLogin)(dispatch);
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

  return {
    onUserLoginChange: searchGithubUsersByUserLogin,
  };
};
