import { useGithubSearchViewModel } from "./GithubSearchViewModel";

import "./styles/GithubSearchView.css";

const GithubSearchView = () => {
  const { onUserLoginChange } = useGithubSearchViewModel();

  return (
    <div className="container-github-search">
      <input
        type="text"
        placeholder="Github Login..."
        className="input-github-search"
        onChange={(e) => onUserLoginChange(e.target.value)}
      />
    </div>
  );
};

export default GithubSearchView;
