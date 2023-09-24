import { useGithubContext } from "@/modules/github/context";

import {
  toggleSelectAllUsers,
  toggleEditMode,
  deleteSelectedUsers,
  duplicateSelectedUsers,
} from "@/modules/github/core/use-cases";

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
