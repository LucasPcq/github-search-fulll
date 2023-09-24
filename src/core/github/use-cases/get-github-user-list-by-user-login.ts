import { IGithubService } from "../services";

import {
  GithubContextEvent,
  GithubContextEventType,
} from "../../../context/github/EventContext";

export const getGithubUserListByUserLogin =
  (githubService: IGithubService) => (userLogin: string) => {
    return async (dispatch: React.Dispatch<GithubContextEvent>) => {
      if (userLogin.length < 1) {
        return dispatch({
          type: GithubContextEventType.USER_LIST_RETRIEVAL,
          users: [],
        });
      }

      const { items } = await githubService.fetchUsersByLogin(userLogin);

      dispatch({
        type: GithubContextEventType.USER_LIST_RETRIEVAL,
        users: items,
      });
    };
  };
