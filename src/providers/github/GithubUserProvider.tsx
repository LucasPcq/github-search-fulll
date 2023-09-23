import { useCallback, useState } from "react";

import { GithubContext } from "../../context/github/useGithubContext";

import { GithubUser } from "../../core/github/types/Github";

import { githubService } from "../../core/github/services/github.service";
import { fetchHttpClient } from "../../shared/adapters/http";

import { debounce } from "../../shared/utils";

const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<GithubUser[]>([]);

  const debouncedSearch = debounce(async (userLogin: string) => {
    const { items } = await githubService(fetchHttpClient()).fetchUsersByLogin(
      userLogin
    );
    setUsers(items);
  }, 500);

  const searchGithubUsersByUserLogin = useCallback(debouncedSearch, [
    debouncedSearch,
  ]);

  return (
    <GithubContext.Provider value={{ searchGithubUsersByUserLogin, users }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
