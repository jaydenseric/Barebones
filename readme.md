# ![Barebones](http://jaydenseric.com/shared/barebones-logo.svg)

![Version](https://img.shields.io/badge/version-4.0.0-blue.svg?style=flat-square)
![Github issues](https://img.shields.io/github/issues/jaydenseric/Barebones.svg?style=flat-square)
![Github stars](https://img.shields.io/github/stars/jaydenseric/Barebones.svg?style=flat-square)

A barebones framework for getting started on a modern front end, suitable for any back end.

- [NPM](https://npmjs.com) dependancies and tools.
- [webpack](https://webpack.github.io) for builds.
- ES6 via [Babel](https://babeljs.io).
- [Standard Style](http://standardjs.com) JS linting with [ESLint](http://eslint.org).
- Simple ES6 class module component architecture with some (easily removed) examples.
- [PostCSS](https://github.com/postcss/postcss) and [CSSNext](http://cssnext.io) take care of vendor prefixes and allow cutting edge CSS syntax. A faster, standards aligned alternative to preprocessors such as Sass.
- Handle icons the modern way with polyfilled [SVG symbols and external references](https://css-tricks.com/svg-use-with-external-reference-take-2).
- [Evergreen](http://stackoverflow.com/a/19060334) and IE 9+ browser support.

## Setup

For development tools and running builds:

1. Ensure the latest [Node.js and NPM](https://nodejs.org) is installed.
2. Run `npm install` within the project root directory in Terminal.
3. Run `npm run build` and then `npm start`. Tada!

After studying the example components:

1. Delete them by removing the body content of `/index.html`, the `@import` in `/app/index.css` and every component directory except for `/components/app`.
2. Customize the `/index.html` metadata.
3. Customize the `/app` global assets.
4. Edit `/package.json` and `/readme.md` to be about your project.

## Structure

- `/components` contains a sub-directory for each component, holding source JS, styles and media. While you may nest component folders, I prefer to keep mine flat.
- `/components/app` is the top component for the entire site and is the JS and CSS entrypoint; from here components are recursively imported and initialized. Import polyfills here.
- `/bundle` is the compiled JS, CSS and sourcemaps.

## Scripts

| Command               | Purpose                                             |
|:----------------------|:----------------------------------------------------|
| `npm run lint`        | Lint JS to [Standard Style](http://standardjs.com). |
| `npm run clean`       | Delete `/bundle`.                                   |
| `npm run build`       | Compile JS and CSS to `/bundle`.                    |
| `npm run build:watch` | Build, rebuilding on source file changes.           |
| `npm start`           | Start a dev server and open in browser.             |

## Tips

- Ensure your editor utilizes [EditorConfig](http://editorconfig.org).
- Ensure your editor utilizes [ESLint](http://eslint.org). If you use [Atom](https://atom.io) install [linter-eslint](https://atom.io/packages/linter-eslint) and [standard-formatter](https://atom.io/packages/standard-formatter).
- Use NPM to manage 3rd party dependencies.
- Use [JSDoc](http://usejsdoc.org) when writing JS.
- Don't reset, normalize or otherwise declare styles globaly; all rules should be scoped to a component. `html` and `body` are an exception as they form the app top component. See [Fix.css](https://github.com/jaydenseric/Fix) for taming common elements.
- Don't vendor prefix CSS rules that are on a standards track; [Autoprefixer](https://github.com/postcss/autoprefixer) will take care of it.
- Avoid adding already minified assets for better sourcemap assisted debugging.

## Licence

[MIT license](https://en.wikipedia.org/wiki/MIT_License).
