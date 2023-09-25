import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import * as GithubContext from "@/modules/github/context";
import { GithubContextType } from "@/modules/github/context";
import { useGithubActionsToolbarViewModel } from "../GithubActionsToolbarViewModel";

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

describe("useGithubActionsToolbarViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should display 'Activate Edit Mode' when edit mode is false", () => {
    const fakeGithubContextWithEditModeFalse = {
      state: { ...fakeGithubContext.state },
      dispatch: fakeGithubContext.dispatch,
    };

    vi.spyOn(GithubContext, "useGithubContext").mockImplementation(
      () => fakeGithubContextWithEditModeFalse
    );

    const { result } = renderHook(() => useGithubActionsToolbarViewModel());
    expect(result.current.textEditMode).toEqual("Activate Edit Mode");
  });
  it("Should display 'Disable Edit Mode' when edit mode is true", () => {
    const fakeGithubContextWithEditModeTrue = {
      state: { ...fakeGithubContext.state, isEditModeActivate: true },
      dispatch: fakeGithubContext.dispatch,
    };

    vi.spyOn(GithubContext, "useGithubContext").mockImplementation(
      () => fakeGithubContextWithEditModeTrue
    );

    const { result } = renderHook(() => useGithubActionsToolbarViewModel());
    expect(result.current.textEditMode).toEqual("Disable Edit Mode");
  });
  it("Should display 'Select all elements' when selectedIndexes is empty", () => {
    const fakeGithubContextWithSelectedIndexesEmpty = {
      state: { ...fakeGithubContext.state },
      dispatch: fakeGithubContext.dispatch,
    };

    vi.spyOn(GithubContext, "useGithubContext").mockImplementation(
      () => fakeGithubContextWithSelectedIndexesEmpty
    );

    const { result } = renderHook(() => useGithubActionsToolbarViewModel());
    expect(result.current.messageElementsSelected).toEqual(
      "Select all elements"
    );
  });
  it("Should display numbers of elements selected when selectedIndexes is not empty", () => {
    const fakeGithubContextWithSelectedIndexexNotEmpty = {
      state: { ...fakeGithubContext.state, selectedIndexes: [0, 1] },
      dispatch: fakeGithubContext.dispatch,
    };

    vi.spyOn(GithubContext, "useGithubContext").mockImplementation(
      () => fakeGithubContextWithSelectedIndexexNotEmpty
    );

    const { result } = renderHook(() => useGithubActionsToolbarViewModel());
    expect(result.current.messageElementsSelected).toEqual(
      `${fakeGithubContextWithSelectedIndexexNotEmpty.state.selectedIndexes.length} elements selected`
    );
  });
});
