# Contributing

This is a modified version of the Flummox contributing guide.

**Please make sure your PR includes both tests and documentation.**

## File organization

All code is written in next-generation JavaScript and transpiled using Babel, including tests. Source files are located in `src` and transpiled to `lib`, which is gitignored. `dist` is for browser builds, and is not ignored. Add-ons (modules that are not part of core) are located in `src/addons`.

Tests for a module should be placed in a `__tests__` subdirectory and named with a `-test.js` suffix. For example, the test suite for the module at `foo/bar.js` should be located at `foo/__tests__/bar-test.js`.

## Documentation

New features or API changes should be documented in the README.

## Code style

Code is linted using ESLint and babel-eslint. Rules are located in `.eslintrc`. Even if linting passes, please do your best to maintain the existing code style.
