import { IGithubService } from "../services";
import { isGithubServiceError } from "../services/github.service";

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

      try {
        const { items } = await githubService.fetchUsersByLogin(userLogin);

        dispatch({
          type: GithubContextEventType.USER_LIST_RETRIEVAL,
          users: items,
        });
      } catch (error) {
        if (isGithubServiceError(error)) {
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
