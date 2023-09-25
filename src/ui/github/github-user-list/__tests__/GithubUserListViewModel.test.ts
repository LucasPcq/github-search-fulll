import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import {
  GithubUserListViewModelType,
  useGithubUserListViewModel,
} from "../GithubUserListViewModel";

import * as GithubContext from "@/modules/github/context";
import { GithubContextType } from "@/modules/github/context";
import { fakeUsers } from "@/modules/github/core/services/in-memory";

const fakeGithubContext: GithubContextType = {
  state: {
    loading: false,
    users: [],
    selectedIndexes: [],
    error: null,
    isEditModeActivate: false,
  },
  dispatch: () => {},
};

describe("useGithubUserListViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should return USERS_LOADING when state loading is true", () => {
    const fakeGithubContextWithLoadingTrue = {
      state: { ...fakeGithubContext.state, loading: true },
      dispatch: fakeGithubContext.dispatch,
    };

    vi.spyOn(GithubContext, "useGithubContext").mockImplementation(
      () => fakeGithubContextWithLoadingTrue
    );

    const { result } = renderHook(() => useGithubUserListViewModel());
    expect(result.current.type).toEqual(
      GithubUserListViewModelType.USERS_LOADING
    );
  });

  it("Should return NO_USERS when no users in array and a message", () => {
    const fakeGithubContextWithLoadingFalseAndUserEmpty = {
      state: { ...fakeGithubContext.state, loading: false, users: [] },
      dispatch: fakeGithubContext.dispatch,
    };

    vi.spyOn(GithubContext, "useGithubContext").mockImplementation(
      () => fakeGithubContextWithLoadingFalseAndUserEmpty
    );

    const { result } = renderHook(() => useGithubUserListViewModel());
    expect(result.current.type).toEqual(GithubUserListViewModelType.NO_USERS);

    if (result.current.type === GithubUserListViewModelType.NO_USERS) {
      expect(result.current.message).toEqual("No users");
    }
  });

  it("Should return ERROR_FETCHING_USERS when error in state and a message error", () => {
    const fakeGithubContextWithError = {
      state: { ...fakeGithubContext.state, error: "Rate limit" },
      dispatch: fakeGithubContext.dispatch,
    };

    vi.spyOn(GithubContext, "useGithubContext").mockImplementation(
      () => fakeGithubContextWithError
    );

    const { result } = renderHook(() => useGithubUserListViewModel());
    expect(result.current.type).toEqual(
      GithubUserListViewModelType.ERROR_FETCHING_USERS
    );

    if (
      result.current.type === GithubUserListViewModelType.ERROR_FETCHING_USERS
    ) {
      expect(result.current.message).toEqual("Rate limit");
    }
  });

  it("Should return USERS_LOADED when users are fetched", () => {
    const fakeGithubContextWithUsers = {
      state: { ...fakeGithubContext.state, users: fakeUsers },
      dispatch: fakeGithubContext.dispatch,
    };

    vi.spyOn(GithubContext, "useGithubContext").mockImplementation(
      () => fakeGithubContextWithUsers
    );

    const { result } = renderHook(() => useGithubUserListViewModel());
    expect(result.current.type).toEqual(
      GithubUserListViewModelType.USERS_LOADED
    );

    if (result.current.type === GithubUserListViewModelType.USERS_LOADED) {
      expect(result.current.users[0].id).toEqual(fakeUsers[0].id);
    }
  });
});
