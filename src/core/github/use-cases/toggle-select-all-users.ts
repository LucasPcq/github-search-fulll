import {
  GithubContextEvent,
  GithubContextEventType,
} from "../../../context/github/EventContext";

export const toggleSelectAllUsers = (selectedIndexes: number[]) => {
  return async (dispatch: React.Dispatch<GithubContextEvent>) => {
    if (selectedIndexes.length === 0) {
      dispatch({ type: GithubContextEventType.ALL_USER_SELECTED });
    } else {
      dispatch({ type: GithubContextEventType.ALL_USER_DESELECTED });
    }
  };
};
