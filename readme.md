# ![Barebones](http://jaydenseric.com/shared/barebones-logo.svg)

![Github release](https://img.shields.io/github/release/jaydenseric/Barebones.svg?style=flat-square)
![Github issues](https://img.shields.io/github/issues/jaydenseric/Barebones.svg?style=flat-square)
![Github stars](https://img.shields.io/github/stars/jaydenseric/Barebones.svg?style=flat-square)

A barebones boilerplate for getting started on a bespoke front end.

- Environment agnostic; setup your own backend and component templating.
- A minimalist component architecture with some (easily removed) examples.
- [NPM](https://npmjs.com) and [Yarn](https://yarnpkg.com) for dependancies and tools.
- [webpack](https://webpack.github.io) for builds.
- ES6 via [Babel](https://babeljs.io). [babel-preset-env](https://github.com/babel/babel-preset-env) applies only the nessesary transforms for your level of browser support.
- [DOM4](https://github.com/WebReflection/dom4) polyfills modern DOM and [Animation Frames](https://html.spec.whatwg.org/multipage/webappapis.html#animation-frames) functionalities.
- JS linting with [ESLint](http://eslint.org) and [extended](https://github.com/jaydenseric/eslint-config-barebones) [JavaScript Standard Style](http://standardjs.com) config. A handy fix script can correct most issues across the entire project.
- CSS linting with [stylelint](http://stylelint.io) and [extended](https://github.com/jaydenseric/stylelint-config-barebones) [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) config.
- [PostCSS](https://github.com/postcss/postcss), [CSSNext](http://cssnext.io) and [Autoprefixer](https://github.com/postcss/autoprefixer) take care of vendor prefixes and allow cutting edge CSS syntax. A faster, standards aligned alternative to preprocessors such as Sass.
- Handle icons the modern way with [polyfilled](https://github.com/Keyamoon/svgxuse) [SVG symbols and external references](https://icomoon.io/#docs/inline-svg).
- Includes [http-server](https://github.com/indexzero/http-server) as an optional zero-config dev server.
- Browser support: [> 2% in AU](http://browserl.ist/?q=%3E+2%25+in+AU).
- [MIT license](https://en.wikipedia.org/wiki/MIT_License).

## Setup

For development tools and building:

1. Install the latest [Node.js and NPM](https://nodejs.org).
2. Install the latest [Yarn](https://yarnpkg.com/en/docs/install).
3. Run `yarn` within the project root directory in Terminal.
4. Run `yarn run build:watch`.
5. Run `yarn run start` in another tab. Tada!

Ensure your editor supports:

- [EditorConfig](http://editorconfig.org). Atom users install [editorconfig](https://atom.io/packages/editorconfig).
- [ESLint](http://eslint.org) live JS linting, respecting `package.json` config. Atom users install [linter-eslint](https://atom.io/packages/linter-eslint).
- [stylelint](http://stylelint.io) live CSS linting, respecting `package.json` config. Atom users install [linter-stylelint](https://atom.io/packages/linter-stylelint).

After inspecting the example components:

1. Remove Barebones examples and references. Within the project directory in Terminal run `yarn run init`. This script also deletes itself.
2. Customize the meta in `/index.html`.
3. Customize the icons in `/content`.
4. Customize the [Browserslist](https://github.com/ai/browserslist) browser support queries in `/package.json` for build tools.
5. Edit `/readme.md` to be about your project.
6. Re-run the build and start scripts. A clean slate!

## Structure

- `/components` contains a sub-directory for each component, holding source JS, styles and image assets. Avoid nesting component directories as a flat structure guarantees unique component names, makes paths less complex and encourages reuse.
- `/components/app` is the top component for the entire site and is the JS and CSS entrypoint; from here components are recursively imported and initialized. Import polyfills here.
- `/bundle` is the compiled JS, CSS and sourcemaps.
- `/content` is where actual content such as images live. This is analogous to a CMS `uploads` folder and can be organized however you like. Never place content assets or hardcode content text anywhere in `/components`!

## Scripts

Command                | Purpose
:--------------------- | :----------------------------------------------
`yarn run init`        | Remove Barebones examples and references.
`yarn run lint:js`     | Lint JS (see `eslintConfig` in `package.json`).
`yarn run lint:js:fix` | Lint JS and automatically fix issues.
`yarn run lint:css`    | Lint CSS (see `stylelint` in `package.json`).
`yarn run clean`       | Delete `/bundle`.
`yarn run build`       | Compile JS and CSS to `/bundle`.
`yarn run build:watch` | Build, rebuilding on source file changes.
`yarn run start`       | Start a dev server and open in browser.

## Tips

- Use [NPM](https://www.npmjs.com) with [Yarn](https://yarnpkg.com) to manage 3rd party dependencies.
- Avoid adding already minified assets for better sourcemap assisted debugging.
- Use [JSDoc](http://usejsdoc.org) when writing JS.
- Don't vendor prefix CSS rules that are on a standards track; [Autoprefixer](https://github.com/postcss/autoprefixer) will take care of it.
- Don't reset, normalize or otherwise declare styles globally; all variables and rules should be scoped to a component. `html` and `body` are an exception as they form the top `app` component.
- Only refer to the UI and not content when naming things in `/components`. For example, `icon-link` is more versatile than `contact-us-link`.

## Helpful projects

- See [Fix.css](https://github.com/jaydenseric/Fix) for taming common elements.
- Use [svgsymbolviewer.io](http://svgsymbolviewer.io) to view symbols in SVG files.
- Install [Hurdler](https://github.com/jaydenseric/Hurdler) to setup component URL hash interactions.
- Install [scroll-animator](https://github.com/jaydenseric/scroll-animator) to reliably scroll to elements, even when the page is still loading.
