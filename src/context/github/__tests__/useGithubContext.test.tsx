import { vi } from "vitest";
import { render } from "@testing-library/react";

import {
  GithubContext,
  GithubContextType,
  useGithubContext,
} from "../useGithubContext";

describe("useGithubContext", () => {
  it("Throws an error if not used with GithubContext.Provider", () => {
    const FakeComponent = () => {
      useGithubContext();
      return null;
    };

    expect(() => render(<FakeComponent />)).toThrow(
      "useGithubContext has to be used within <GithubContext.Provider>"
    );
  });
  it("Returns the context value when used with the <GithubContext.Provider> ", () => {
    const mockContextValue: GithubContextType = {
      state: {
        users: [],
        selectedUserIds: [],
        loading: false,
        error: null,
        isEditModeActivate: false,
      },
      dispatch: vi.fn(),
    };

    const FakeComponent = () => {
      useGithubContext();
      return null;
    };

    expect(
      render(
        <GithubContext.Provider value={mockContextValue}>
          <FakeComponent />
        </GithubContext.Provider>
      )
    );
  });
});
