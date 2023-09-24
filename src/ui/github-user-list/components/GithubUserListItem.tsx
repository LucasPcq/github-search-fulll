import { GithubUserListItemView } from "../GithubUserListViewModel";

import "../styles/GithubUserListItem.css";

const GithubUserListItem = ({
  user: { index, id, avatar, login, url, displayEditCheckbox, isSelected },
  onClickToggleSelectUser,
}: {
  user: GithubUserListItemView;
  onClickToggleSelectUser: (index: number) => void;
}) => {
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
