import { useGithubActionsToolbarViewModel } from "./GithubActionsToolbarViewModel";

import "./styles/GithubActionsToolbarView.css";

const GithubActionsToolbarView = () => {
  const {
    actions,
    textEditMode,
    displayActions,
    atLeastOneElementSelected,
    messageElementsSelected,
  } = useGithubActionsToolbarViewModel();

  const {
    onClickDeleteSelectedUsers,
    onClickDuplicateSelectedUsers,
    onClickToggleEditMode,
    onClickToggleSelectAllUsers,
  } = actions;

  return (
    <div className="container-github-actions-toolbar">
      <button onClick={onClickToggleEditMode}>{textEditMode}</button>
      {displayActions && (
        <div className="container-actions">
          <label className="label-input-select-all">
            <input
              type="checkbox"
              onChange={onClickToggleSelectAllUsers}
              checked={atLeastOneElementSelected}
            />
            {messageElementsSelected}
          </label>
          <div className="container-delete-and-duplicate-actions">
            <button
              className="button-duplicate"
              onClick={onClickDuplicateSelectedUsers}
              aria-label="Duplicate Selected Users"
            >
              <img
                src="./src/shared/assets/icons/duplicate.svg"
                className="duplicate-icon"
                alt="Duplicate Icon"
              />
            </button>
            <button
              className="button-delete"
              onClick={onClickDeleteSelectedUsers}
              aria-label="Delete Selected Users"
            >
              <img
                src="./src/shared/assets/icons/trash.svg"
                className="delete-icon"
                alt="Delete Icon"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubActionsToolbarView;
