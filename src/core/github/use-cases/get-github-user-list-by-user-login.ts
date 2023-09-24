import { IGithubService } from "../services/github.service";

import {
  GithubContextEvent,
  GithubContextEventType,
} from "../../../context/github/EventContext";

import { isServiceError } from "../../../shared/guards/error";

export const getGithubUserListByUserLogin =
  (githubService: IGithubService) => (userLogin: string) => {
    return async (dispatch: React.Dispatch<GithubContextEvent>) => {
      if (userLogin.length < 1) {
        return dispatch({
          type: GithubContextEventType.USER_LIST_RETRIEVAL,
          users: [],
        });
      }

      try {
        const { items } = await githubService.fetchUsersByLogin(userLogin);

        dispatch({
          type: GithubContextEventType.USER_LIST_RETRIEVAL,
          users: items,
        });
      } catch (error) {
        if (isServiceError(error)) {
          if (error.status === 403) {
            return dispatch({
              type: GithubContextEventType.ERROR_FETCHING_USERS,
              message: "Rate limit exceeded. Please try again.",
            });
          }
          return dispatch({
            type: GithubContextEventType.ERROR_FETCHING_USERS,
            message: "Failed fetching users.",
          });
        }
      }
    };
  };
