import { GithubSearchViewModel } from "./GithubSearchViewModel";
import "./styles/GithubSearchView.css";

const GithubSearchView = ({
  messageElementsSelected,
  atLeastOneElementSelected,
  actions,
}: GithubSearchViewModel) => {
  const {
    onUserLoginChange,
    onClickToggleSelectAllUsers,
    onClickDeleteSelectedUsers,
    onClickDuplicateSelectedUsers,
  } = actions;

  return (
    <div className="container-github-search-actions">
      <input
        type="text"
        placeholder="Github Login..."
        className="input-github-search"
        onChange={(e) => onUserLoginChange(e.target.value)}
      />
      <div className="container-actions">
        <label className="label-input-select-all">
          <input
            type="checkbox"
            onChange={() => onClickToggleSelectAllUsers()}
            checked={atLeastOneElementSelected}
          />
          {messageElementsSelected}
        </label>
        <div className="container-delete-and-duplicate-actions">
          <img
            src="./src/shared/assets/icons/duplicate.svg"
            className="duplicate-icon"
            onClick={onClickDuplicateSelectedUsers}
          />
          <img
            src="./src/shared/assets/icons/trash.svg"
            className="delete-icon"
            onClick={onClickDeleteSelectedUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default GithubSearchView;
