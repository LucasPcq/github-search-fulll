import {
  GithubUserListViewModelType,
  useGithubUserListViewModel,
} from "./GithubUserListViewModel";

import GithubUserListItem from "./components/GithubUserListItem";

import "./styles/GithubUserListView.css";

const GithubUserListView = () => {
  const githubUserListViewModel = useGithubUserListViewModel();

  const { type } = githubUserListViewModel;

  let content: React.ReactNode;

  if (type === GithubUserListViewModelType.USERS_LOADING) {
    content = <p className="loading-alert">Loading...</p>;
  }

  if (type === GithubUserListViewModelType.NO_USERS) {
    const { message } = githubUserListViewModel;
    content = <p className="informations-alert">{message}</p>;
  }

  if (type === GithubUserListViewModelType.ERROR_FETCHING_USERS) {
    const { message } = githubUserListViewModel;
    content = <p className="error-alert">{message}</p>;
  }

  if (type === GithubUserListViewModelType.USERS_LOADED) {
    const { users, onClickToggleSelectUser } = githubUserListViewModel;
    content = users.map((user) => (
      <GithubUserListItem
        key={user.index}
        user={user}
        onClickToggleSelectUser={onClickToggleSelectUser}
      />
    ));
  }

  return <div className="container-github-user-list">{content}</div>;
};

export default GithubUserListView;
