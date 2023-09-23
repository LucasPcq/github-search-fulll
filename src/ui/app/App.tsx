import { Header } from "../../layouts/Header";
import { GithubSearchListView } from "../github-search-list/GithubSearchListView";

import "./styles/App.css";

function App() {
  return (
    <>
      <Header />
      <GithubSearchListView />
    </>
  );
}

export default App;
