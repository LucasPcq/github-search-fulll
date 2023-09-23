import { GithubSearchListItem } from "./components/GithubSearchListItem";

import "./styles/GithubSearchListView.css";

export const GithubSearchListView = () => {
  return (
    <>
      <div className="container-github-search-actions">
        <input
          type="text"
          placeholder="Github Login..."
          className="input-github-search"
        />
        <div className="container-actions">
          <label className="label-input-select-all">
            <input type="checkbox" />
            Select all elements
          </label>
          <div className="container-delete-and-duplicate-actions">
            <img
              src="./src/assets/icons/duplicate.svg"
              className="duplicate-icon"
            />
            <img src="./src/assets/icons/trash.svg" className="delete-icon" />
          </div>
        </div>
      </div>
      <div className="container-github-search-list">
        <GithubSearchListItem />
        <GithubSearchListItem />
        <GithubSearchListItem />
        <GithubSearchListItem />
        <GithubSearchListItem />
        <GithubSearchListItem />
        <GithubSearchListItem />
        <GithubSearchListItem />
      </div>
    </>
  );
};
