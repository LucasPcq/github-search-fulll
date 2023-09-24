import GithubActionsToolbarView from "./GithubActionsToolbarView";
import { useGithubActionsToolbarViewMoidel } from "./GithubActionsToolbarViewModel";

const GithubActionsToolbarPresenter = () => {
  const githubActionsToolbarViewModel = useGithubActionsToolbarViewMoidel();

  return <GithubActionsToolbarView {...githubActionsToolbarViewModel} />;
};

export default GithubActionsToolbarPresenter;
