import React, { createContext, useContext } from "react";

import { GithubStateContext } from "./StateContext";
import { GithubContextEvent } from "./EventContext";

export interface GithubContextType {
  state: GithubStateContext;
  dispatch: React.Dispatch<GithubContextEvent>;
}

export const GithubContext = createContext<GithubContextType | null>(null);

export const useGithubContext = () => {
  const githubContext = useContext(GithubContext);

  if (!githubContext) {
    throw new Error(
      "useGithubContext has to be used within <GithubContext.Provider>"
    );
  }

  return githubContext;
};
