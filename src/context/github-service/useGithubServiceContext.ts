import { createContext, useContext } from "react";
import { IGithubService } from "../../core/github/services";

export const GithubServiceContext = createContext<{
  githubService: IGithubService;
} | null>(null);

export const useGithubServiceContext = () => {
  const githubServiceContext = useContext(GithubServiceContext);

  if (!githubServiceContext) {
    throw new Error(
      "useGithubServiceContext has to be used within <GithubServiceContext.Provider>"
    );
  }

  return githubServiceContext;
};
