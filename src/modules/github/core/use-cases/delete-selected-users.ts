import {
  GithubContextEvent,
  GithubContextEventType,
} from "@/modules/github/context";

export const deleteSelectedUsers = (selectedIndexes: number[]) => {
  return async (dispatch: React.Dispatch<GithubContextEvent>) => {
    dispatch({
      type: GithubContextEventType.USERS_DELETED,
      userIndexes: selectedIndexes,
    });
  };
};
