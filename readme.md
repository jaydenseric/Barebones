# ![Barebones](http://jaydenseric.com/shared/barebones-logo.svg)

![Version](https://img.shields.io/badge/version-7.1.0-brightgreen.svg?style=flat-square)
![Github issues](https://img.shields.io/github/issues/jaydenseric/Barebones.svg?style=flat-square)
![Github stars](https://img.shields.io/github/stars/jaydenseric/Barebones.svg?style=flat-square)

A barebones boilerplate for getting started on a bespoke front end.

- Back end agnostic.
- Simple ES6 class module component architecture with some (easily removed) examples.
- [NPM](https://npmjs.com) dependancies and tools.
- [webpack](https://webpack.github.io) for builds.
- ES6 via [Babel](https://babeljs.io).
- [DOM4](https://github.com/WebReflection/dom4) polyfills modern DOM and [Animation Frames](https://html.spec.whatwg.org/multipage/webappapis.html#animation-frames) functionalities.
- JS linting with [ESLint](http://eslint.org) and [extended](https://github.com/jaydenseric/eslint-config-barebones) [Standard Style](http://standardjs.com) config. A handy fix script can correct most issues across the entire project.
- [stylelint](http://stylelint.io) CSS linting with tweaked [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) rules.
- [PostCSS](https://github.com/postcss/postcss), [CSSNext](http://cssnext.io) and [Autoprefixer](https://github.com/postcss/autoprefixer) take care of vendor prefixes and allow cutting edge CSS syntax. A faster, standards aligned alternative to preprocessors such as Sass.
- Handle icons the modern way with polyfilled [SVG symbols and external references](https://css-tricks.com/svg-use-with-external-reference-take-2).
- Includes [http-server](https://github.com/indexzero/http-server) as an optional zero-config dev server.
- IE 11 and modern browser support. IE 9+ may work without guarantee.
- [MIT license](https://en.wikipedia.org/wiki/MIT_License).

## Setup

For development tools and building:

1. Install the latest [Node.js and NPM](https://nodejs.org).
2. Run `npm install` within the project root directory in Terminal.
3. Run `npm run build:watch`.
4. Run `npm start` in another tab. Tada!

Ensure your editor supports:

- [EditorConfig](http://editorconfig.org).
- Live linting, respecting `package.json` config.
  - [ESLint](http://eslint.org) for JS. Atom users install [linter-eslint](https://atom.io/packages/linter-eslint).
  - [stylelint](http://stylelint.io) for CSS. Atom users install [linter-stylelint](https://atom.io/packages/linter-stylelint).

After studying the example components:

1. Delete them by removing the body content of `/index.html`, the `@import` in `/app/index.css` and every component directory except for `/components/app`.
2. Customize the `/index.html` metadata.
3. Customize the `/app` global assets.
4. Edit `/readme.md` to be about your project.
5. [Customize](https://github.com/ai/browserslist) browser support in `/browserslist` for [Autoprefixer](https://github.com/postcss/autoprefixer).
6. Re-run the build and start scripts.

## Structure

- `/components` contains a sub-directory for each component, holding source JS, styles and media. While you may nest component folders, I prefer to keep mine flat.
- `/components/app` is the top component for the entire site and is the JS and CSS entrypoint; from here components are recursively imported and initialized. Import polyfills here.
- `/bundle` is the compiled JS, CSS and sourcemaps.

## Scripts

| Command               | Purpose                                         |
|:----------------------|:------------------------------------------------|
| `npm run lint:js`     | Lint JS (see `eslintConfig` in `package.json`). |
| `npm run lint:js:fix` | Lint JS and automatically fix issues.           |
| `npm run lint:css`    | Lint CSS (see `stylelint` in `package.json`).   |
| `npm run clean`       | Delete `/bundle`.                               |
| `npm run build`       | Compile JS and CSS to `/bundle`.                |
| `npm run build:watch` | Build, rebuilding on source file changes.       |
| `npm start`           | Start a dev server and open in browser.         |

## Tips

- Use NPM to manage 3rd party dependencies.
- Use [JSDoc](http://usejsdoc.org) when writing JS.
- Don't reset, normalize or otherwise declare styles globally; all variables and rules should be scoped to a component. `html` and `body` are an exception as they form the top `app` component.
- See [Fix.css](https://github.com/jaydenseric/Fix) for taming common elements.
- Don't vendor prefix CSS rules that are on a standards track; [Autoprefixer](https://github.com/postcss/autoprefixer) will take care of it.
- Avoid adding already minified assets for better sourcemap assisted debugging.
