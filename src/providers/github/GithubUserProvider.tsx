import { useReducer } from "react";

import {
  GithubContext,
  GithubContextState,
  githubContextReducer,
} from "../../context/github/useGithubContext";

const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: GithubContextState = {
    users: [],
    selectedUserIds: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubContextReducer, initialState);

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
