![Barebones logo](http://jaydenseric.com/shared/barebones-logo.svg)

# Barebones front end framework

The barebones needed to get started on a modern front end. Only the things needed in every responsive project are included; ready to extend as required. A Sassy and streamlined alternative to the [HTML5 Boilerplate](http://html5boilerplate.com).

- Minimalist [Sass](http://sass-lang.com) framework.
- Super efficient font icons workflow.
- Write standard CSS without prefixes thanks to [Autoprefixer](https://github.com/postcss/autoprefixer).
- No opinionated bloat or pre-developed components.
- Easy compilation via [Gulp](http://gulpjs.com), setup purely via [NPM](https://npmjs.com).

## Browser support

All modern browsers and IE9+ are supported in the [*master* branch](https://github.com/jaydenseric/Barebones/tree/master). Checkout the [*ie8-support* branch](https://github.com/jaydenseric/Barebones/tree/ie8-support) for added IE8 support and documentation.

## Compilation

1. Ensure [Node.js](https://nodejs.org) is installed.
2. Ensure [Gulp](http://gulpjs.com) is installed: `npm install --global gulp`.
3. In the repo, run `npm install`.
4. Run `gulp` for a full compilation or `gulp watch` to automatically compile relevant assets when specific files change.

Node.js is only used for compilation during development and is not a server requirement.

## Sass structure

Most Sass variables should be set in *_config.scss* for convenience and to ensure their availability throughout the project.

Handy mixins are available from *_utilities.scss*. Add more of your own here as required.

Declare your fonts in *_fonts.scss*.

Set animation keyframes in *_animations.scss*.

A simple [CSS foundation](http://jaydenseric.com/blog/forget-normalize-or-resets-lay-your-own-css-foundation) is in *_foundation.scss* in place of a normalize or reset.

Place your main styles in *_styles.scss*, tapping into all the above.

## Automatic CSS vendor prefixes

Remember not to use vendor prefixes in your Sass, [Autoprefixer](https://github.com/postcss/autoprefixer) parses the compiled Sass and adds vendor-prefixed CSS properties using the [Can I Use](http://caniuse.com) database. You can [adjust the browsers supported](https://github.com/postcss/autoprefixer#browsers) in *gulpfile.js*.

## How-to

### Create & use font icons

Adding and using custom font icons is a breeze thanks to Gulp.

1. Add an optimized SVG file named after the icon to */icons/vectors/*.
2. If `gulp watch` was running (run `gulp` if you forgot) the icon font is automatically updated in the Sass as a Base64 WOFF data URI, along with a new unicode character map.
3. Use the `icon($position: before, $icon: false, $styles: true)` mixin in *_styles.scss* to add the new icon wherever you like. Use the SVG filename without the extension for the `$icon` parameter. Easy!

See [*"Fun with Sass & font icons"*](http://jaydenseric.com/blog/fun-with-sass-and-font-icons) to learn more about the mixin.

#### Example

The icon *menu.svg* is included by default. First make sure to run `gulp` (see ***Compilation***), then in *_styles.scss*:

```scss
.menu {
	@include icon(before, menu) {
		font-size: 200%;
	}
}
```

### Set z-index layers

`z-index` layers can be named and managed as lists within the config, using the `layer($stack, $name, $base-index: 0)` function. Layer lists stack from bottom to top. The optional `$base-index` parameter can be used to layer stacks of layers.

#### Example

In *_config.scss*:

```scss
//-------------------------------------------- Parallax scene

$scene-layers:	(
					sky,
					mountains,
					person
				);
```

In *_styles.scss*:

```scss
//-------------------------------------------- Parallax scene

.sky {
	z-index: layer($scene-layers, sky);
}
.mountains {
	z-index: layer($scene-layers, mountains);
}
.person {
	z-index: layer($scene-layers, person);
}
```

### Specify IE9 or modern browser only styles

IE9 gets *main-ie9.css* via HTML conditional comments while everything else runs *main.css*. The Sass framework compiles relevant CSS to each of these files.

The `$ie9` variable is available anywhere in your SCSS to apply hacks and fixes.

#### Example

In *_styles.scss*:

```scss
@if $ie9 {
	// IE9 only styles
}
@if not $ie9 {
	// Styles excluded from IE9
}
```

### Add IE9 only JS polyfills & fixes

IE9 runs *ie9.js* before *main.js* via HTML conditional comments. Modern browsers do not download this file.

#### Example

If you are using HTML5 form field `placeholder` attributes in your project and would like them to work in IE9, add a polyfill such as [*mathiasbynens/jquery-placeholder*](http://mths.be/placeholder) to *ie9.js*.