import { fakeUsers } from "../../core/services/in-memory";

import {
  GithubContextEvent,
  GithubContextEventType,
  githubContextReducer,
} from "../EventContext";

import { GithubStateContext } from "../StateContext";

const state: GithubStateContext = {
  users: [],
  selectedIndexes: [],
  loading: false,
  error: null,
  isEditModeActivate: false,
};

describe("githubContextReducer", () => {
  it("Event USER_SEARCH_INITIATED should set login to true", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.USER_SEARCH_INITIATED,
      userLogin: "Lucas",
    };

    const newState = githubContextReducer(state, event);

    expect(newState.loading).toBe(true);
  });
  it("Event USER_LIST_RETRIEVAL should set login to false and set users fetched", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.USER_LIST_RETRIEVAL,
      users: fakeUsers,
    };

    const newState = githubContextReducer(state, event);

    expect(newState.loading).toBe(false);
    expect(newState.users).toBe(fakeUsers);
  });
  it("Event USER_SELECTED should add user index from selectedUserIndexes", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.USER_SELECTED,
      userIndex: 0,
    };

    const newState = githubContextReducer(state, event);
    expect(newState.selectedIndexes).toContain(0);
  });
  it("Event USER_DESELECT should remove user index from selectedUserIndexes", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.USER_DESELECTED,
      userIndex: 0,
    };

    const newState = githubContextReducer(
      { ...state, selectedIndexes: [0] },
      event
    );
    expect(newState.selectedIndexes).toEqual([]);
  });
  it("Event ALL_USER_SELECTED should add all user indexes from selectedUserIndexes", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.ALL_USER_SELECTED,
    };

    const newState = githubContextReducer(
      { ...state, users: fakeUsers },
      event
    );
    expect(newState.selectedIndexes).toEqual([0, 1]);
  });
  it("Event ALL_USER_DESELECTED should remove all user indexes from selectedUserIndexes", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.ALL_USER_DESELECTED,
    };

    const newState = githubContextReducer(
      { ...state, users: fakeUsers },
      event
    );
    expect(newState.selectedIndexes).toEqual([]);
  });
  it("Event USERS_DELETED should remove all user selected from users and empty the selectedUserIndexes", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.USERS_DELETED,
      userIndexes: [1],
    };

    const newState = githubContextReducer(
      { ...state, users: fakeUsers, selectedIndexes: [1] },
      event
    );

    expect(newState.users).toEqual([fakeUsers[0]]);
    expect(newState.selectedIndexes).toEqual([]);
  });
  it("Event USERS_DUPLICATE should duplicate all user selected from users and empty the selectedUserIndexes", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.USERS_DUPLICATED,
      userIndexes: [1],
    };

    const newState = githubContextReducer(
      { ...state, users: fakeUsers, selectedIndexes: [1] },
      event
    );

    expect(newState.users).toEqual([fakeUsers[0], fakeUsers[1], fakeUsers[1]]);
    expect(newState.selectedIndexes).toEqual([]);
  });
  it("Event EDIT_MODE_ACTIVATED should activate the edit mode", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.EDIT_MODE_ACTIVATED,
    };

    const newState = githubContextReducer(state, event);

    expect(newState.isEditModeActivate).toEqual(true);
  });
  it("Event EDIT_MODE_DESACTIVATED should desactivate the edit mode", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.EDIT_MODE_DESACTIVATED,
    };

    const newState = githubContextReducer(state, event);

    expect(newState.isEditModeActivate).toEqual(false);
  });
  it("Event ERROR_FETCHING_USERS should set error message and loading to false", () => {
    const event: GithubContextEvent = {
      type: GithubContextEventType.ERROR_FETCHING_USERS,
      message: "Rate limit exceed.",
    };

    const newState = githubContextReducer(state, event);

    expect(newState.loading).toEqual(false);
    expect(newState.error).toEqual("Rate limit exceed.");
  });
});
