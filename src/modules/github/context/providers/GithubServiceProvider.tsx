import { GithubServiceContext } from "../useGithubServiceContext";

import { githubService } from "@/modules/github/core/services/github.service";
import { fetchHttpClient } from "@/shared/adapters/http";

import GithubProvider from "@/modules/github/context/providers/GithubProvider";

const GithubServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const githubServiceInstance = githubService(fetchHttpClient());

  return (
    <GithubServiceContext.Provider
      value={{ githubService: githubServiceInstance }}
    >
      <GithubProvider>{children}</GithubProvider>
    </GithubServiceContext.Provider>
  );
};

export default GithubServiceProvider;
