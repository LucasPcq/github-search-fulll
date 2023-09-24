import React, { createContext, useContext } from "react";

import { GithubUser } from "../../core/github/types/Github";

export type GithubContextState = {
  users: GithubUser[];
  selectedUserIds: number[];
  loading: boolean;
  isEditModeActivate: boolean;
};

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
      userId: number;
    }
  | {
      type: GithubContextEventType.USER_DESELECTED;
      userId: number;
    }
  | {
      type: GithubContextEventType.ALL_USER_SELECTED;
    }
  | {
      type: GithubContextEventType.ALL_USER_DESELECTED;
    }
  | {
      type: GithubContextEventType.USERS_DELETED;
      userIds: number[];
    }
  | {
      type: GithubContextEventType.USERS_DUPLICATED;
      userIds: number[];
    }
  | {
      type: GithubContextEventType.EDIT_MODE_ACTIVATED;
    }
  | {
      type: GithubContextEventType.EDIT_MODE_DESACTIVATED;
    };

export interface GithubContextType {
  state: GithubContextState;
  dispatch: React.Dispatch<GithubContextEvent>;
}

export const githubContextReducer = (
  state: GithubContextState,
  event: GithubContextEvent
): GithubContextState => {
  switch (event.type) {
    case GithubContextEventType.USER_SEARCH_INITIATED:
      return { ...state, loading: true };

    case GithubContextEventType.USER_LIST_RETRIEVAL:
      return { ...state, loading: false, users: event.users };

    case GithubContextEventType.USER_SELECTED:
      return {
        ...state,
        selectedUserIds: [...state.selectedUserIds, event.userId],
      };

    case GithubContextEventType.USER_DESELECTED:
      return {
        ...state,
        selectedUserIds: state.selectedUserIds.filter(
          (id) => id !== event.userId
        ),
      };

    case GithubContextEventType.ALL_USER_SELECTED:
      return {
        ...state,
        selectedUserIds: state.users.map((user) => user.id),
      };

    case GithubContextEventType.ALL_USER_DESELECTED:
      return {
        ...state,
        selectedUserIds: [],
      };

    case GithubContextEventType.USERS_DELETED:
      return {
        ...state,
        users: state.users.filter((user) => !event.userIds.includes(user.id)),
        selectedUserIds: [],
      };

    case GithubContextEventType.USERS_DUPLICATED:
      return {
        ...state,
        users: [
          ...state.users,
          ...state.users.filter((user) => event.userIds.includes(user.id)),
        ],
        selectedUserIds: [],
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
        selectedUserIds: [],
      };

    default:
      return state;
  }
};

export const GithubContext = createContext<GithubContextType | null>(null);

export const useGithubContext = () => {
  const githubContext = useContext(GithubContext);

  if (!githubContext) {
    throw new Error(
      "useGithubContext has to be used within <GithubContext.Provider>"
    );
  }

  return githubContext;
};
