import {
  GithubUserListViewModel,
  GithubUserListViewModelType,
} from "./GithubUserListViewModel";

import GithubUserListItem from "./components/GithubUserListItem";

import "./styles/GithubUserListView.css";

const GithubUserListView = (props: GithubUserListViewModel) => {
  const { type } = props;

  if (type === GithubUserListViewModelType.USERS_LOADING) {
    return (
      <div className="container-github-user-list">
        <p>Loading...</p>
      </div>
    );
  }

  if (type === GithubUserListViewModelType.NO_USERS) {
    const { message } = props;
    return (
      <div className="container-github-user-list">
        <p>{message}</p>
      </div>
    );
  }

  if (type === GithubUserListViewModelType.ERROR_FETCHING_USERS) {
    const { message } = props;
    return (
      <div className="container-github-user-list">
        <p className="error-alert">{message}</p>
      </div>
    );
  }

  const { users } = props;

  return (
    <>
      <div className="container-github-user-list">
        {users.map((user, index) => (
          <GithubUserListItem key={index} {...user} />
        ))}
      </div>
    </>
  );
};

export default GithubUserListView;
