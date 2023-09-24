import {
  GithubContextEvent,
  GithubContextEventType,
} from "../../../context/github/EventContext";

export const deleteSelectedUsers = (selectedIndexes: number[]) => {
  return async (dispatch: React.Dispatch<GithubContextEvent>) => {
    dispatch({
      type: GithubContextEventType.USERS_DELETED,
      userIndexes: selectedIndexes,
    });
  };
};
