import { createContext, useContext } from "react";

import { GithubUser } from "../../core/github/types/Github";

interface IGithubContext {
  searchGithubUsersByUserLogin: (userLogin: string) => void;
  users: GithubUser[];
}

export const GithubContext = createContext<IGithubContext | null>(null);

export const useGithubContext = () => {
  const githubContext = useContext(GithubContext);

  if (!githubContext) {
    throw new Error(
      "useGithubContext has to be used within <GithubContext.Provider>"
    );
  }

  return githubContext;
};
