import {
  GithubUserListViewModel,
  GithubUserListViewModelType,
} from "./GithubUserListViewModel";

import GithubUserListItem from "./components/GithubUserListItem";

import "./styles/GithubUserListView.css";

const GithubUserListView = (props: GithubUserListViewModel) => {
  const { type } = props;

  if (type === GithubUserListViewModelType.NO_USERS) {
    const { message } = props;
    return <p>{message}</p>;
  }

  const { users } = props;

  return (
    <>
      <div className="container-github-user-list">
        {users.map((user) => (
          <GithubUserListItem user={user} key={user.id} />
        ))}
      </div>
    </>
  );
};

export default GithubUserListView;
