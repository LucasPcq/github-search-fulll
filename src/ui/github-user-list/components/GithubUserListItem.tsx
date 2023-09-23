import "../styles/GithubUserListItem.css";

interface Props {
  user: {
    id: number;
    login: string;
    avatar: string;
    url: string;
  };
}

const GithubUserListItem = ({ user }: Props) => {
  const { avatar, url, id, login } = user;

  return (
    <div className="item-github-user-list">
      <input type="checkbox" className="select-github-profile" />
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
