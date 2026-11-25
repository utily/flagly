# Releasing

This package uses automated versioning and publishing via [semantic-release](https://semantic-release.gitbook.io/) and GitHub Actions.

## Conventional Commits

Releases are determined automatically from commit messages following the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- **`fix:`** commits trigger a **patch** release (e.g., 1.0.0 → 1.0.1)
- **`feat:`** commits trigger a **minor** release (e.g., 1.0.0 → 1.1.0)
- **Breaking changes** (using `BREAKING CHANGE:` or `!` after the type) trigger a **major** release (e.g., 1.0.0 → 2.0.0)
- Commits without `feat:`, `fix:`, or breaking changes default to a **minor** release

Examples:

```text
fix: resolve flag parsing edge case
feat: add new streaming API
feat!: redesign public API
feat: add support for new syntax

BREAKING CHANGE: removed deprecated functions
```

## Automatic publishing

When a commit is merged to `master`, a GitHub Actions workflow:

1. Checks out the repository with full Git history
2. Installs dependencies
3. Builds and tests the package
4. Uses `semantic-release` to:
   - Analyze commit messages
   - Determine the next version
   - Create a Git tag (e.g., `v1.2.3`)
   - Publish to npm
   - Create a GitHub Release

## Version source

Package versions are sourced from **Git tags** (`vX.Y.Z` format). The `package.json` version field is not modified during releases.

## No version-bump commits

Automated releases do not create version-bump commits or modify `package.json` or `package-lock.json`.

## npm Trusted Publishing

The package is published to npm using **GitHub Actions OIDC (Trusted Publishing)**, which does not require an `NPM_TOKEN`. This requires a one-time configuration in npm:

1. Go to https://www.npmjs.com/package/flagly (or your package URL)
2. Navigate to the **Publishing** section
3. Add a GitHub Actions Trusted Publisher with:
   - **Owner:** `utily`
   - **Repository:** `flagly`
   - **Workflow filename:** `publish.yml`

After this one-time setup, releases are automatic and secure.
