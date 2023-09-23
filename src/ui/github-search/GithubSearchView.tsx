import "./styles/GithubSearchView.css";

interface Props {
  userLogin: string;
  onUserLoginChange: (userLogin: string) => void;
}

const GithubSearchView = ({ userLogin, onUserLoginChange }: Props) => {
  return (
    <div className="container-github-search-actions">
      <input
        type="text"
        placeholder="Github Login..."
        className="input-github-search"
        value={userLogin}
        onChange={(e) => onUserLoginChange(e.target.value)}
      />
      <div className="container-actions">
        <label className="label-input-select-all">
          <input type="checkbox" />
          Select all elements
        </label>
        <div className="container-delete-and-duplicate-actions">
          <img
            src="./src/shared/assets/icons/duplicate.svg"
            className="duplicate-icon"
          />
          <img
            src="./src/shared/assets/icons/trash.svg"
            className="delete-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default GithubSearchView;
