# Contributing to BizBuch

Thank you for your interest in contributing to BizBuch — your help is appreciated.

## Reporting issues
- Search existing issues before opening a new one.
- Provide a clear title, steps to reproduce, expected vs actual behavior, and relevant logs/screenshots.

## Feature requests
- Use the feature request issue template (if available). Describe use case and proposed API/UX.

## Development setup
Prerequisites: Node >= 20, Yarn or npm, Java/Android SDK for Android, Xcode for iOS (macOS).

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Start Metro:

```bash
npm start
```

3. Android (local build):

```bash
cd android
./gradlew assembleDebug
```

4. iOS (macOS):

```bash
cd ios
pod install
```

5. Run tests:

```bash
npm test
```

## Code style
- Project uses `eslint` and `prettier`. Run `npm run lint` before opening a PR.
- Keep changes focused and include tests for new behavior when feasible.

## Branching & commits
- Use feature branches: `feat/<short-desc>` or `fix/<short-desc>`.
- Commit messages: short, imperative, and reference issues (Conventional Commits encouraged).

## Pull request checklist
- All CI checks pass.
- Linting and tests added/updated where relevant.
- Documentation updated if behavior or APIs changed.

## Contributor support
If you need help, open an issue and tag `help wanted` or email `Ujjwal.Kar@zohomail.in`.

Thanks for contributing!
