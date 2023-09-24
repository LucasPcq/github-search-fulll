import { GithubUserListItemView } from "../GithubUserListViewModel";

import "../styles/GithubUserListItem.css";

const GithubUserListItem = ({
  index,
  id,
  login,
  avatar,
  url,
  isSelected,
  displayEditCheckbox,
  onClickToggleSelectUser,
}: GithubUserListItemView) => {
  return (
    <div className="item-github-user-list">
      {displayEditCheckbox && (
        <input
          type="checkbox"
          className="select-github-profile"
          onChange={() => onClickToggleSelectUser(index)}
          checked={isSelected}
        />
      )}
      <img src={avatar} className="github-avatar" />
      <div className="github-user-informations">
        <p className="github-id">{id}</p>
        <p className="github-login">{login}</p>
      </div>
      <a href={url} target="_blank" className="button-github-profile">
        View profile
      </a>
    </div>
  );
};

export default GithubUserListItem;
