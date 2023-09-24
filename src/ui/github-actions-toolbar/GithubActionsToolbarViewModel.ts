import { useGithubContext } from "../../context/github/useGithubContext";
import { GithubContextEventType } from "../../context/github/EventContext";

export type GithubActionsToolbarViewModel = {
  messageElementsSelected: string;
  atLeastOneElementSelected: boolean;
  displayActions: boolean;
  textEditMode: string;
  actions: {
    onClickDeleteSelectedUsers: () => void;
    onClickDuplicateSelectedUsers: () => void;
    onClickToggleSelectAllUsers: () => void;
    onClickToggleEditMode: () => void;
  };
};

export const useGithubActionsToolbarViewModel =
  (): GithubActionsToolbarViewModel => {
    const { state, dispatch } = useGithubContext();

    const onClickDeleteSelectedUsers = () =>
      dispatch({
        type: GithubContextEventType.USERS_DELETED,
        userIndexes: state.selectedUserIndexes,
      });

    const onClickDuplicateSelectedUsers = () =>
      dispatch({
        type: GithubContextEventType.USERS_DUPLICATED,
        userIndexes: state.selectedUserIndexes,
      });

    const onClickToggleSelectAllUsers = () => {
      if (state.selectedUserIndexes.length === 0) {
        dispatch({ type: GithubContextEventType.ALL_USER_SELECTED });
      } else {
        dispatch({ type: GithubContextEventType.ALL_USER_DESELECTED });
      }
    };

    const onClickToggleEditMode = () => {
      if (state.isEditModeActivate) {
        dispatch({ type: GithubContextEventType.EDIT_MODE_DESACTIVATED });
      } else {
        dispatch({ type: GithubContextEventType.EDIT_MODE_ACTIVATED });
      }
    };

    const actions = {
      onClickDeleteSelectedUsers,
      onClickDuplicateSelectedUsers,
      onClickToggleSelectAllUsers,
      onClickToggleEditMode,
    };

    const textEditMode = state.isEditModeActivate
      ? "Disable Edit Mode"
      : "Activate Edit Mode";

    const messageElementsSelected =
      state.selectedUserIndexes.length > 0
        ? `${state.selectedUserIndexes.length} elements selected`
        : "Select all elements";

    return {
      messageElementsSelected,
      atLeastOneElementSelected: state.selectedUserIndexes.length > 0,
      textEditMode,
      actions,
      displayActions: state.isEditModeActivate,
    };
  };
