# Getting Started

To contribute to the project, install the following dependencies:

- [Git](https://git-scm.com/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Node 16](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

## Fork Repository

- Fork the repo.
- Clone your repository:

```bash
git clone https://github.com/<username>/betterwrite
```

- Go to **better-write-app**.

- Copy and Paste `.env.local.example` to `.env.local` and set keys.

> Development API keys are not available. If you want to use the API's, create a key for each item.

- Run:

```bash
yarn

yarn bootstrap

yarn dev
```

> Check **package.json** to other commands.

> For production build run, instead `yarn dev` uses `yarn preview`.