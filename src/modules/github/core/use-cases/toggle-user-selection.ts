import {
  GithubContextEvent,
  GithubContextEventType,
} from "@/modules/github/context";

export const toggleUserSelection = (
  index: number,
  selectedIndexes: number[]
) => {
  return async (dispatch: React.Dispatch<GithubContextEvent>) => {
    if (!selectedIndexes.includes(index)) {
      dispatch({
        type: GithubContextEventType.USER_SELECTED,
        userIndex: index,
      });
    } else {
      dispatch({
        type: GithubContextEventType.USER_DESELECTED,
        userIndex: index,
      });
    }
  };
};
