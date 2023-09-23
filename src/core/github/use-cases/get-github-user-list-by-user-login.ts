import { IGithubService } from "../services";

export const getGithubUserListByUserLogin =
  (githubService: IGithubService) => async (userLogin: string) => {
    const { items } = await githubService.fetchUsersByLogin(userLogin);
    return items;
  };
