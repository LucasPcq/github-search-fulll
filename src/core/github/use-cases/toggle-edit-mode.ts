import {
  GithubContextEvent,
  GithubContextEventType,
} from "../../../context/github/EventContext";

export const toggleEditMode = (currentEditMode: boolean) => {
  return async (dispatch: React.Dispatch<GithubContextEvent>) => {
    if (currentEditMode) {
      dispatch({ type: GithubContextEventType.EDIT_MODE_DESACTIVATED });
    } else {
      dispatch({ type: GithubContextEventType.EDIT_MODE_ACTIVATED });
    }
  };
};
