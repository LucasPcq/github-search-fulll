import { GithubUser } from "../../../core/github/types/Github";

import {
  GithubContextEvent,
  GithubContextEventType,
  githubContextReducer,
} from "../EventContext";

import { GithubStateContext } from "../StateContext";

const state: GithubStateContext = {
  users: [],
  selectedUserIndexes: [],
  loading: false,
  error: null,
  isEditModeActivate: false,
};

const mockedUsers: GithubUser[] = [
  {
    login: "lucas",
    id: 1467716,
    node_id: "MDQ6VXNlcjE0Njc3MTY=",
    avatar_url: "https://avatars.githubusercontent.com/u/1467716?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/lucas",
    html_url: "https://github.com/lucas",
    followers_url: "https://api.github.com/users/lucas/followers",
    following_url: "https://api.github.com/users/lucas/following{/other_user}",
    gists_url: "https://api.github.com/users/lucas/gists{/gist_id}",
    starred_url: "https://api.github.com/users/lucas/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/lucas/subscriptions",
    organizations_url: "https://api.github.com/users/lucas/orgs",
    repos_url: "https://api.github.com/users/lucas/repos",
    events_url: "https://api.github.com/users/lucas/events{/privacy}",
    received_events_url: "https://api.github.com/users/lucas/received_events",
    type: "User",
    site_admin: false,
    score: 1.0,
  },
  {
    login: "lucasrmagalhaes",
    id: 43296467,
    node_id: "MDQ6VXNlcjQzMjk2NDY3",
    avatar_url: "https://avatars.githubusercontent.com/u/43296467?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/lucasrmagalhaes",
    html_url: "https://github.com/lucasrmagalhaes",
    followers_url: "https://api.github.com/users/lucasrmagalhaes/followers",
    following_url:
      "https://api.github.com/users/lucasrmagalhaes/following{/other_user}",
    gists_url: "https://api.github.com/users/lucasrmagalhaes/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/lucasrmagalhaes/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/lucasrmagalhaes/subscriptions",
    organizations_url: "https://api.github.com/users/lucasrmagalhaes/orgs",
    repos_url: "https://api.github.com/users/lucasrmagalhaes/repos",
    events_url: "https://api.github.com/users/lucasrmagalhaes/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/lucasrmagalhaes/received_events",
    type: "User",
    site_admin: false,
    score: 1.0,
  },
];

describe("githubContextReducer", () => {
  it("Event USER_SEARCH_INITIATED", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.USER_SEARCH_INITIATED,
      userLogin: "Lucas",
    };

    const newState = githubContextReducer(state, event);

    expect(newState.loading).toBe(true);
  });
  it("Event USER_LIST_RETRIEVAL", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.USER_LIST_RETRIEVAL,
      users: mockedUsers,
    };

    const newState = githubContextReducer(state, event);

    expect(newState.loading).toBe(false);
    expect(newState.users).toBe(mockedUsers);
  });
});
