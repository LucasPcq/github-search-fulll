import { vi } from "vitest";
import { render } from "@testing-library/react";

import {
  useGithubServiceContext,
  GithubServiceContextType,
  GithubServiceContext,
} from "../useGithubServiceContext";

describe("useGithubServiceContext", () => {
  it("Throws an error if not used with GithubServiceContext.Provider", () => {
    const FakeComponent = () => {
      useGithubServiceContext();
      return null;
    };

    expect(() => render(<FakeComponent />)).toThrow(
      "useGithubServiceContext has to be used within <GithubServiceContext.Provider>"
    );
  });
  it("Returns the context value when used with the <GithubServiceContext.Provider> ", () => {
    const mockContextValue: GithubServiceContextType = {
      githubService: {
        fetchUsersByLogin: vi.fn(),
      },
    };

    const FakeComponent = () => {
      useGithubServiceContext();
      return null;
    };

    expect(
      render(
        <GithubServiceContext.Provider value={mockContextValue}>
          <FakeComponent />
        </GithubServiceContext.Provider>
      )
    );
  });
});
