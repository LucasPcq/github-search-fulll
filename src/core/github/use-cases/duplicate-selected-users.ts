import {
  GithubContextEvent,
  GithubContextEventType,
} from "../../../context/github/EventContext";

export const duplicateSelectedUsers = (selectedIndexes: number[]) => {
  return async (dispatch: React.Dispatch<GithubContextEvent>) => {
    dispatch({
      type: GithubContextEventType.USERS_DUPLICATED,
      userIndexes: selectedIndexes,
    });
  };
};
