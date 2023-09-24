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
  onUserLoginChange: (userLogin: string) => void;
};

export const useGithubSearchViewModel = (): GithubSearchViewModel => {
  const { dispatch } = useGithubContext();

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

  return {
    onUserLoginChange: searchGithubUsersByUserLogin,
  };
};
