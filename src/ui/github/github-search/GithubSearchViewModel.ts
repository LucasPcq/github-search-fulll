import { useCallback, useRef } from "react";

import {
  useGithubContext,
  useGithubServiceContext,
  GithubContextEventType,
} from "@/modules/github/context";

import { getGithubUserListByUserLogin } from "@/modules/github/core/use-cases";

import { debounce } from "@/shared/utils";

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
