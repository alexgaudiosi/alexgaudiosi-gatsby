# Dependency Upgrade Handoff

## Branch

`dependency-upgrades`

## Completed

- Gatsby 4 to Gatsby 5, including the Gatsby plugin family.
- React 17 to React 19.
- styled-components 4 to 6.
- React Helmet to Gatsby's built-in `Head` API.
- Removed `react-pose` and replaced the route transition with CSS animation.
- ESLint 8 to 9 with flat config in `eslint.config.js`.
- Prettier 3, AVA 8, Lighthouse 13, Favicons 7, and mkdirp 3.
- Removed unused Gatsby SVG loader, legacy router, and unused modal showcase dependencies.
- Removed the unused IntersectionObserver demo and polyfill.
- Enabled `gatsby-plugin-netlify`.
- Added `.nvmrc` with Node 20 for Favicons 7.

## Validation

- `yarn run build` passes after rebuilding the local `sharp` binary when needed.
- Critical audit advisories were reduced to zero.
- The current audit reports 21 high, 12 moderate, and 4 low advisories. Remaining findings are transitive Gatsby/tooling dependencies; avoid untested Yarn resolutions.

## Remaining

- 21 high, 12 moderate, and 4 low audit advisories, primarily from Gatsby's dependency graph (`immutable`, `lodash`, `path-to-regexp`, `serialize-javascript`, `sharp`, and `tmp`).
- Babel 8 is deferred until Gatsby supports it.
- ESLint 10 was tested but is incompatible with the current Babel ESLint parser/plugins; keep ESLint 9.
- Lighthouse tests currently report Performance 75 and Accessibility 89, below the 90 thresholds.
- Local libvips warnings mention missing Homebrew `x265` and ICU4C libraries.
