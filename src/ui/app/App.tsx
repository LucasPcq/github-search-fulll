import { Header } from "../../layouts/Header";

import GithubServiceProvider from "../../context/github-service/providers/GithubServiceProvider";

import GithubSearchPresenter from "../github-search/GithubSearchPresenter";
import GithubUserListPresenter from "../github-user-list/GithubUserListPresenter";
import GithubActionsToolbarPresenter from "../github-actions-toolbar/GithubActionsToolbarPresenter";

import "./styles/App.css";

const App = () => {
  return (
    <>
      <Header />
      <GithubServiceProvider>
        <GithubSearchPresenter />
        <GithubActionsToolbarPresenter />
        <GithubUserListPresenter />
      </GithubServiceProvider>
    </>
  );
};

export default App;
