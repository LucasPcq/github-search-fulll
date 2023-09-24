import { Header } from "@/layouts/header/Header";

import GithubServiceProvider from "@/modules/github/context/providers/GithubServiceProvider";

import GithubSearchView from "@/ui/github/github-search/GithubSearchView";
import GithubActionsToolbarView from "@/ui/github/github-actions-toolbar/GithubActionsToolbarView";
import GithubUserListView from "@/ui/github/github-user-list/GithubUserListView";

import "./App.css";

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
