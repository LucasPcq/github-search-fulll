import { Header } from "../../layouts/Header";

import GithubServiceProvider from "../../context/github-service/providers/GithubServiceProvider";

import GithubSearchView from "../github-search/GithubSearchView";
import GithubActionsToolbarView from "../github-actions-toolbar/GithubActionsToolbarView";
import GithubUserListView from "../github-user-list/GithubUserListView";

import "./styles/App.css";

const App = () => {
  return (
    <>
      <Header />
      <GithubServiceProvider>
        <GithubSearchView />
        <GithubActionsToolbarView />
        <GithubUserListView />
      </GithubServiceProvider>
    </>
  );
};

export default App;
