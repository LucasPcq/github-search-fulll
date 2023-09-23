import { useGithubUserListViewModel } from "./GithubUserListViewModel";

import GithubUserListView from "./GithubUserListView";

const GithubUserListPresenter = () => {
  const githubUserListViewModel = useGithubUserListViewModel();

  return <GithubUserListView {...githubUserListViewModel} />;
};

export default GithubUserListPresenter;
