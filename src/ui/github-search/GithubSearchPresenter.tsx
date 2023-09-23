import { useState } from "react";

import { useGithubContext } from "../../context/github/useGithubContext";

import GithubSearchView from "./GithubSearchView";

const GithubSearchPresenter = () => {
  const { searchGithubUsersByUserLogin } = useGithubContext();

  const [userLogin, setUserLogin] = useState<string>("");

  const handleUserLoginChange = (userLogin: string) => {
    setUserLogin(userLogin);
    searchGithubUsersByUserLogin(userLogin);
  };

  return (
    <GithubSearchView
      userLogin={userLogin}
      onUserLoginChange={handleUserLoginChange}
    />
  );
};

export default GithubSearchPresenter;
