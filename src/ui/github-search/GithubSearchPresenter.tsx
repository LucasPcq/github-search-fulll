import { useGithubSearchViewModel } from "./GithubSearchViewModel";

import GithubSearchView from "./GithubSearchView";

const GithubSearchPresenter = () => {
  const githubSearchViewModel = useGithubSearchViewModel();

  return <GithubSearchView {...githubSearchViewModel} />;
};

export default GithubSearchPresenter;
