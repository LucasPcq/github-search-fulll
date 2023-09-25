import { vi, Mock } from "vitest";

import {
  deleteSelectedUsers,
  duplicateSelectedUsers,
  getGithubUserListByUserLogin,
  toggleEditMode,
  toggleSelectAllUsers,
  toggleUserSelection,
} from "..";

import { GithubContextEventType } from "@/modules/github/context";

import { IGithubService } from "../../services/github.service";

import { ServiceError } from "@/shared/adapters/errors";
import { fakeUsers } from "../../services/in-memory";

describe("Github Use Cases", () => {
  let mockedDispatch: Mock;
  let mockedFetchUsersByLogin: Mock;
  let mockedGithubService: IGithubService;

  beforeEach(() => {
    mockedDispatch = vi.fn();
    mockedFetchUsersByLogin = vi.fn();
    mockedGithubService = {
      fetchUsersByLogin: mockedFetchUsersByLogin,
    };

    vi.clearAllMocks();
  });

  describe("getGithubUserListByUserLogin", () => {
    it("Should dispatch an event with the type EMPTY_USER_LIST when userLogin length is equal to 0", async () => {
      const userLogin = "";

      await getGithubUserListByUserLogin(mockedGithubService)(userLogin)(
        mockedDispatch
      );

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.EMPTY_USER_LIST,
      });
    });
    it("Should dispatch an event with the type USER_LIST_RETRIEVAL and users array when success", async () => {
      const userLogin = "Lucas";

      mockedFetchUsersByLogin.mockResolvedValue({ items: fakeUsers });

      await getGithubUserListByUserLogin(mockedGithubService)(userLogin)(
        mockedDispatch
      );

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.USER_LIST_RETRIEVAL,
        users: fakeUsers,
      });
    });
    it("Should dispatch an event with the type ERROR_FETCHING_USERS with message  when rate limit error", async () => {
      const userLogin = "Lucas";

      const error: ServiceError = {
        status: 403,
        message: "",
      };

      mockedFetchUsersByLogin.mockRejectedValue(error);

      await getGithubUserListByUserLogin(mockedGithubService)(userLogin)(
        mockedDispatch
      );

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.ERROR_FETCHING_USERS,
        message: "Rate limit exceeded. Please try again.",
      });
    });
    it("Should dispatch an event with the type ERROR_FETCHING_USERS with message when other error occurs", async () => {
      const userLogin = "Lucas";

      const error: ServiceError = {
        status: 500,
        message: "",
      };

      mockedFetchUsersByLogin.mockRejectedValue(error);

      await getGithubUserListByUserLogin(mockedGithubService)(userLogin)(
        mockedDispatch
      );

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.ERROR_FETCHING_USERS,
        message: "Failed fetching users.",
      });
    });
  });

  describe("deleteSelectedUsers", () => {
    it("Should dispatch an event with the type USERS_DELETED and userIndex", async () => {
      const selectedUserIndexes = [0, 1];

      await deleteSelectedUsers(selectedUserIndexes)(mockedDispatch);

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.USERS_DELETED,
        userIndexes: selectedUserIndexes,
      });
    });
  });

  describe("duplicateSelectedUsers", () => {
    it("Should dispatch an event with the type USERS_DUPLICATED and userIndex", async () => {
      const selectedUserIndexes = [0, 1];

      await duplicateSelectedUsers(selectedUserIndexes)(mockedDispatch);

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.USERS_DUPLICATED,
        userIndexes: selectedUserIndexes,
      });
    });
  });

  describe("toggleEditMode", () => {
    it("Should dispatch an event with the type EDIT_MODE_DESACTIVATED when currentEditMode is true", async () => {
      const currentEditMode = true;

      await toggleEditMode(currentEditMode)(mockedDispatch);

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.EDIT_MODE_DESACTIVATED,
      });
    });
    it("Should dispatch an event with the type EDIT_MODE_ACTIVATED when currentEditMode is false", async () => {
      const currentEditMode = false;

      await toggleEditMode(currentEditMode)(mockedDispatch);

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.EDIT_MODE_ACTIVATED,
      });
    });
  });

  describe("toggleSelectAllUsers", () => {
    it("Should dispatch an event with the type ALL_USERS_SELECTED when selectedIndexes is empty", async () => {
      const selectedIndexes: number[] = [];

      await toggleSelectAllUsers(selectedIndexes)(mockedDispatch);

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.ALL_USERS_SELECTED,
      });
    });
    it("Should dispatch an event with the type ALL_USERS_DESELECTED when selectedIndexes is not empty", async () => {
      const selectedIndexes: number[] = [0];

      await toggleSelectAllUsers(selectedIndexes)(mockedDispatch);

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.ALL_USERS_DESELECTED,
      });
    });
  });

  describe("toggleSUserSelection", () => {
    it("Should dispatch an event with the type USER_SELECTED when the index is not includes in selectedIndexes", async () => {
      const index = 0;
      const selectedIndexes: number[] = [];

      await toggleUserSelection(index, selectedIndexes)(mockedDispatch);

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.USER_SELECTED,
        userIndex: index,
      });
    });
    it("Should dispatch an event with the type USER_DESELECT when the index is include in selectedIndexes", async () => {
      const index = 0;
      const selectedIndexes: number[] = [0, 1];

      await toggleUserSelection(index, selectedIndexes)(mockedDispatch);

      expect(mockedDispatch).toHaveBeenCalledWith({
        type: GithubContextEventType.USER_DESELECTED,
        userIndex: index,
      });
    });
  });
});
