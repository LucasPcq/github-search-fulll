import { useGithubContext } from "../../context/github/useGithubContext";

import { toggleSelectAllUsers } from "../../core/github/use-cases/toggle-select-all-users";
import { toggleEditMode } from "../../core/github/use-cases/toggle-edit-mode";
import { deleteSelectedUsers } from "../../core/github/use-cases/delete-selected-users";
import { duplicateSelectedUsers } from "../../core/github/use-cases/duplicate-selected-users";

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
      deleteSelectedUsers(state.selectedIndexes)(dispatch);

    const onClickDuplicateSelectedUsers = () =>
      duplicateSelectedUsers(state.selectedIndexes)(dispatch);

    const onClickToggleSelectAllUsers = () =>
      toggleSelectAllUsers(state.selectedIndexes)(dispatch);

    const onClickToggleEditMode = () =>
      toggleEditMode(state.isEditModeActivate)(dispatch);

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
      state.selectedIndexes.length > 0
        ? `${state.selectedIndexes.length} elements selected`
        : "Select all elements";

    return {
      messageElementsSelected,
      atLeastOneElementSelected: state.selectedIndexes.length > 0,
      textEditMode,
      actions,
      displayActions: state.isEditModeActivate,
    };
  };
