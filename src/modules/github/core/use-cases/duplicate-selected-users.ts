import {
  GithubContextEvent,
  GithubContextEventType,
} from "@/modules/github/context";

export const duplicateSelectedUsers = (selectedIndexes: number[]) => {
  return async (dispatch: React.Dispatch<GithubContextEvent>) => {
    dispatch({
      type: GithubContextEventType.USERS_DUPLICATED,
      userIndexes: selectedIndexes,
    });
  };
};
