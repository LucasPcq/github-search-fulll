# Github User Search | Fulll

## Subject

[Github User Search Intermediate Senior - Fulll Hiring ](https://github.com/fulll/hiring/blob/master/Frontend/github-user-search-intermediaire-senior.md)

## Installation

```bash
# NPM
npm install
npm run dev

# PNPM
pnpm install
pnpm run dev
```

## Documentation

### Architecture Explanation

---

![Excalidraw Archictecture Explanation](./src/docs/withdraw-architecture.png)

I have decided to follow some principles of the Clean Architecture. The goal of the Clean Architecture is to isolate the domain and avoid dependencies between the differents parts. This allow a better testability and modularity.

I have followed a MVVM Pattern to render the component dumb as possible, with no logic business.

As we weren't allowed to use any dependencies other than testing libraries, i have decided to use React Context like a State Management.

I also used an approach of programming oriented events.

Even if it's a Clean Architecture, i have decided to coupling my use cases to React Context. Not coupling the domain to Redux or any other State Management whould have added a lot of wrapper to avoid dependencies.

### Folder Structure

---

#### Modules

In the modules folder, you'll find all the files linked to a context. These are the types and the state of our application in our case. We can also find in the `use-cases` folder, all the features of this context.

```bash
modules
│   └── github
│       ├── context
│       │   ├── EventContext.ts
│       │   ├── StateContext.ts
│       │   ├── __tests__
│       │   │   ├── EventContext.test.ts
│       │   │   ├── useGithubContext.test.tsx
│       │   │   └── useGithubServiceContext.test.tsx
│       │   ├── index.ts
│       │   ├── providers
│       │   │   ├── GithubProvider.tsx
│       │   │   └── GithubServiceProvider.tsx
│       │   ├── useGithubContext.ts
│       │   └── useGithubServiceContext.ts
│       └── core
│           ├── dto
│           │   └── fetch-users.dto.ts
│           ├── services
│           │   ├── github.service.ts
│           │   └── in-memory.ts
│           ├── types
│           │   └── GithubUser.ts
│           └── use-cases
│               ├── delete-selected-users.ts
│               ├── duplicate-selected-users.ts
│               ├── get-github-user-list-by-user-login.ts
│               ├── index.ts
│               ├── toggle-edit-mode.ts
│               ├── toggle-select-all-users.ts
│               └── toggle-user-selection.ts
```

#### UI

---

For the user interface folder, you clearly seen certain parts of the MVVM Pattern. Each part, which contains logic and state data, has a View file (.tsx) and a ViewModel file (.ts). The ViewModel export a hook which is used by the View file.

```bash
.
├── ui
│   ├── app
│   │   ├── App.css
│   │   └── App.tsx
│   └── github
│       ├── github-actions-toolbar
│       │   ├── GithubActionsToolbarView.css
│       │   ├── GithubActionsToolbarView.tsx
│       │   └── GithubActionsToolbarViewModel.ts
│       ├── github-search
│       │   ├── GithubSearchView.css
│       │   ├── GithubSearchView.tsx
│       │   └── GithubSearchViewModel.ts
│       └── github-user-list
│           ├── GithubUserListView.css
│           ├── GithubUserListView.tsx
│           ├── GithubUserListViewModel.ts
│           └── github-user-list-item
│               ├── GithubUserListItem.css
│               └── GithubUserListItem.tsx

```

#### Shared

---

In the shared folder, you can find adapters that can be used by several modules / files. They are also guards, utils or components.

```bash
.
├── shared
│   ├── adapters
│   │   ├── errors
│   │   │   └── index.ts
│   │   └── http
│   │       ├── fetch-http-client.ts
│   │       └── index.ts
│   ├── assets
│   │   └── icons
│   │       ├── duplicate.svg
│   │       └── trash.svg
│   ├── guards
│   │   └── error.ts
│   └── utils
│       └── index.ts
```

## Testing

```bash
# NPM
npm run test

# PNPM
pnpm run test
```

## Things to improve

- Export the hard coded strings like "No users" to external file
- Add more tests to the components and the modules
- Improve the error handling between the fetch client / service / use-case
- Add a unique identifier to each user rather than used the key index

## Libraries

- vitest
- jsdom
- @testing-library/react
- @testing-library/js-dom
