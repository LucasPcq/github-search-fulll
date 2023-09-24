import { Header } from "../../layouts/Header";

import GithubSearchPresenter from "../github-search/GithubSearchPresenter";
import GithubUserListPresenter from "../github-user-list/GithubUserListPresenter";

import GithubProvider from "../../providers/github/GithubUserProvider";

import "./styles/App.css";
import GithubActionsToolbarPresenter from "../github-actions-toolbar/GithubActionsToolbarPresenter";

function App() {
  return (
    <>
      <Header />
      <GithubProvider>
        <GithubSearchPresenter />
        <GithubActionsToolbarPresenter />
        <GithubUserListPresenter />
      </GithubProvider>
    </>
  );
}

export default App;
