import "../styles/GithubSearchListItem.css";

export const GithubSearchListItem = () => {
  return (
    <div className="item-github-search-list">
      <input type="checkbox" className="select-github-profile" />
      <img
        src="https://avatars.githubusercontent.com/u/57531280?v=4"
        className="github-avatar"
      />
      <div className="github-user-informations">
        <p className="github-id">57531280</p>
        <p className="github-login">LucasPcq</p>
      </div>
      <a
        href="https://github.com/LucasPcq"
        target="_blank"
        className="button-github-profile"
      >
        View profile
      </a>
    </div>
  );
};
