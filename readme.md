# ![Barebones](http://jaydenseric.com/shared/barebones-logo.svg)

A barebones framework for getting started on a modern front end.

- Cross-platform dev tools via [NPM](https://npmjs.com) with a basic [Gulp](http://gulpjs.com) workflow handing compilation, concatination, minification and sourcemaps.
- A simple component architecture. Although UI components can be nested, assets are self-contained in sibling folders.
- Blaze ahead with vanilla JS; the essential polyfills come locked and loaded.
- A standards based alternative to preprocessors such as Sass or Less, [PostCSS](https://github.com/postcss/postcss) with [CSSNext](http://cssnext.io) and [Autoprefixer](https://github.com/postcss/autoprefixer) plugins allows you to use cutting edge CSS syntax.
- Handle icons using [SVG symbols and external reference](https://css-tricks.com/svg-use-with-external-reference-take-2). A polyfill is included for mouthbreather browsers.
- [Evergreen browsers](http://stackoverflow.com/a/19060334) and IE 9+ are supported.

## Setup

For development (not required on a production server):

1. Ensure the latest [Node.js and NPM](https://nodejs.org) is installed.
2. In Terminal, within the project root directory run `npm install` to setup the development environment.
3. Run `npm run task` (see ***Build*** below).
4. Barebones must be browsed via a webserver. Simply run `npm start` if you don't have a local one handy. Magic!

## Build

Gulp tasks (including any you add) can be run from Terminal using `npm run task -- taskname`.

| Command                 | Task                                                       |
|:------------------------|:-----------------------------------------------------------|
| `npm run lint`          | Lints the JS to [Standard Style](http://standardjs.com).   |
| `npm run task -- js`    | Bundles the JS.                                            |
| `npm run task -- css`   | Bundles the CSS.                                           |
| `npm run task -- build` | A full build, bundling the JS and CSS.                     |
| `npm run task -- watch` | File changes will trigger smart rebuilds.                  |
| `npm run task`          | Default. Runs `build` then `watch`.                        |
| `npm start`             | Starts a dev server and opens the project in your browser. |

## First steps

Once you are setup and have studied how the intro component with sub-components works:

1. Edit `/package.json` and `/readme.md` to be about your project and not Barebones.
2. Customize the metadata in the `<head>` of  `/index.html`.
3. Customize the `/app` global assets.
4. Customize `/components/page/page.css`.
5. Remove the intro component by deleting `/components/intro` and the `.demo-component` HTML from `/index.html`. Also delete `/components/inline-code`.

## Structure

Here is the bundle (and therefore load) order:

1. `/polyfills`: Polyfill JS and supporting assets.
2. `/library`: For scripts without dependancies (other than polyfills), CSS or images that multiple components depend on. They don't have to be third-party resources.
3. `/components`: Contains a sub-folder for each UI component. Each component folder, JS and CSS file is named after the component class for clear tracing and sourcemaping. E.g. `/components/slideshow/slideshow.js`.
4. `/app`: Assets relating to the site as a whole, such as `favicon.ico`. Initialize all your components and subcomponents with app-specific config in `/app/app.js`.

Note that bundling happens recursively, so feel free to create subfolders within these folders.

There are more advanced ways to load dependancies, such as [webpack](https://webpack.github.io), [Browserify](http://browserify.org), [ES6 modules](http://exploringjs.com/es6/ch_modules.html), etc. but this approach is easy to understand and elegant enough for small (particularly single-page) sites.

## Tips

- Ensure your editor utilizes [EditorConfig](http://editorconfig.org).
- Ensure your editor utilizes [ESLint](http://eslint.org). If you use [Atom](https://atom.io) install [linter-eslint](https://atom.io/packages/linter-eslint) and [standard-formatter](https://atom.io/packages/standard-formatter).
- Use [JSDoc](http://usejsdoc.org) when writing JavaScript.
- Don't vendor prefix CSS rules that are on a standards track; [Autoprefixer](https://github.com/postcss/autoprefixer) will take care of it.
- Avoid adding already minified assets for better sourcemap assisted debugging.

## Licence

[MIT license](https://en.wikipedia.org/wiki/MIT_License).
