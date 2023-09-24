import { GithubUser } from "@/modules/github/core/types/GithubUser";

import { GithubStateContext } from "./StateContext";

export enum GithubContextEventType {
  USER_SEARCH_INITIATED = "USER_SEARCH_INITIATED",
  USER_LIST_RETRIEVAL = "USER_LIST_RETRIEVAL",
  USER_SELECTED = "USER_SELECTED",
  USER_DESELECTED = "USER_DESELECTED",
  ALL_USER_SELECTED = "ALL_USER_SELECTED",
  ALL_USER_DESELECTED = "ALL_USER_DESELECTED",
  USERS_DELETED = "USERS_DELETED",
  USERS_DUPLICATED = "USER_DUPLICATED",
  EDIT_MODE_ACTIVATED = "EDIT_MODE_ACTIVATED",
  EDIT_MODE_DESACTIVATED = "EDIT_MODE_DESACTIVATED",
  ERROR_FETCHING_USERS = "ERROR_FETCHING_USERS",
}

export type GithubContextEvent =
  | {
      type: GithubContextEventType.USER_SEARCH_INITIATED;
      userLogin: string;
    }
  | {
      type: GithubContextEventType.USER_LIST_RETRIEVAL;
      users: GithubUser[];
    }
  | {
      type: GithubContextEventType.USER_SELECTED;
      userIndex: number;
    }
  | {
      type: GithubContextEventType.USER_DESELECTED;
      userIndex: number;
    }
  | {
      type: GithubContextEventType.ALL_USER_SELECTED;
    }
  | {
      type: GithubContextEventType.ALL_USER_DESELECTED;
    }
  | {
      type: GithubContextEventType.USERS_DELETED;
      userIndexes: number[];
    }
  | {
      type: GithubContextEventType.USERS_DUPLICATED;
      userIndexes: number[];
    }
  | {
      type: GithubContextEventType.EDIT_MODE_ACTIVATED;
    }
  | {
      type: GithubContextEventType.EDIT_MODE_DESACTIVATED;
    }
  | {
      type: GithubContextEventType.ERROR_FETCHING_USERS;
      message: string;
    };

export const githubContextReducer = (
  state: GithubStateContext,
  event: GithubContextEvent
): GithubStateContext => {
  switch (event.type) {
    case GithubContextEventType.USER_SEARCH_INITIATED:
      return { ...state, loading: true, selectedIndexes: [] };

    case GithubContextEventType.USER_LIST_RETRIEVAL:
      return {
        ...state,
        loading: false,
        users: event.users,
      };

    case GithubContextEventType.USER_SELECTED:
      return {
        ...state,
        selectedIndexes: [...state.selectedIndexes, event.userIndex],
      };

    case GithubContextEventType.USER_DESELECTED:
      return {
        ...state,
        selectedIndexes: state.selectedIndexes.filter(
          (id) => id !== event.userIndex
        ),
      };

    case GithubContextEventType.ALL_USER_SELECTED:
      return {
        ...state,
        selectedIndexes: Array.from(state.users.keys()),
      };

    case GithubContextEventType.ALL_USER_DESELECTED:
      return {
        ...state,
        selectedIndexes: [],
      };

    case GithubContextEventType.USERS_DELETED:
      return {
        ...state,
        users: state.users.filter(
          (_user, index) => !event.userIndexes.includes(index)
        ),
        selectedIndexes: [],
      };

    case GithubContextEventType.USERS_DUPLICATED:
      return {
        ...state,
        users: [
          ...state.users,
          ...state.users.filter((_user, index) =>
            event.userIndexes.includes(index)
          ),
        ],
        selectedIndexes: [],
      };

    case GithubContextEventType.EDIT_MODE_ACTIVATED:
      return {
        ...state,
        isEditModeActivate: true,
      };

    case GithubContextEventType.EDIT_MODE_DESACTIVATED:
      return {
        ...state,
        isEditModeActivate: false,
        selectedIndexes: [],
      };

    case GithubContextEventType.ERROR_FETCHING_USERS:
      return {
        ...state,
        loading: false,
        error: event.message,
      };

    default:
      return state;
  }
};
