import { createContext, useContext } from "react";

import { IGithubService } from "@/modules/github/core/services/github.service";

export interface GithubServiceContextType {
  githubService: IGithubService;
}

export const GithubServiceContext =
  createContext<GithubServiceContextType | null>(null);

export const useGithubServiceContext = () => {
  const githubServiceContext = useContext(GithubServiceContext);

  if (!githubServiceContext) {
    throw new Error(
      "useGithubServiceContext has to be used within <GithubServiceContext.Provider>"
    );
  }

  return githubServiceContext;
};
