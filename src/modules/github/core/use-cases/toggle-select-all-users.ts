import {
  GithubContextEvent,
  GithubContextEventType,
} from "@/modules/github/context";

export const toggleSelectAllUsers = (selectedIndexes: number[]) => {
  return async (dispatch: React.Dispatch<GithubContextEvent>) => {
    if (selectedIndexes.length === 0) {
      dispatch({ type: GithubContextEventType.ALL_USERS_SELECTED });
    } else {
      dispatch({ type: GithubContextEventType.ALL_USERS_DESELECTED });
    }
  };
};
