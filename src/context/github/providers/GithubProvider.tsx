import { useReducer } from "react";

import { GithubContext } from "../useGithubContext";
import { initialGithubStateContext } from "../StateContext";
import { githubContextReducer } from "../EventContext";

const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    githubContextReducer,
    initialGithubStateContext
  );

  return (
    <GithubContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
