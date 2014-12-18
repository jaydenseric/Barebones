![Barebones logo](http://jaydenseric.com/shared/barebones-logo.svg)

# Barebones front end framework

The barebones needed to get started on a modern front end. Only the things needed in every responsive project are included; ready to extend as required. A Sassy and streamlined alternative to the [HTML5 Boilerplate](http://html5boilerplate.com).

- No opinionated bloat or pre-developed components.
- Logical Sass framework.
- Super efficient font icons workflow.
- Minimal HTTP requests.

## Browser support

All modern browsers and IE9+ are supported in the [*master* branch](https://github.com/jaydenseric/Barebones/tree/master). Checkout the [*ie8-support* branch](https://github.com/jaydenseric/Barebones/tree/ie8-support) for added IE8 support and documentation.

## Requirements

- [Sass](https://github.com/sass/sass).
- [Font Custom](https://github.com/FontCustom/fontcustom).

## Getting started

### Compile font icon setup

```bash
cd fontcustom; fontcustom watch
```

### Compile SCSS to CSS

```bash
sass --watch scss:css --style compressed --sourcemap=none
```

## Sass structure

Most Sass variables should be set in *_config.scss* for convenience and to ensure their availability throughout the project.

The [Bourbon mixin library](http://bourbon.io) and other handy mixins are available from *_utilities.scss*. Add more of your own here as required.

Declare your fonts in *_fonts.scss*.

Set animation keyframes in *_animations.scss*.

A simple [CSS foundation](http://jaydenseric.com/blog/forget-normalize-or-resets-lay-your-own-css-foundation) is in *_foundation.scss* in place of a normalize or reset.

Place your main styles in *_styles.scss*, tapping into all the above.

## How-to

### Create & use font icons

Font icons are handled using a special [Font Custom](https://github.com/FontCustom/fontcustom) implementation. Refer to the article [*"Font icons like a boss with Sass & Font Custom"*](http://jaydenseric.com/blog/font-icons-like-a-boss-with-sass-and-font-custom) for detailed usage instructions.

Manage all your project's font icons in */fontcustom/vectors/* as nicely named SVG files. Add icons to this folder to have your fonts magically rebuilt in */fonts/icons/* and *_icons.scss* automatically set up for you to start using the icons in *_styles.scss* via their nice names using the `icon($position: before, $icon: false, $styles: true)` utility mixin; without touching your markup or dealing with non-semantic class names.

#### Example

The icon */fontcustom/vectors/menu.svg* is included by default. First make sure Font Custom and Sass are compiling (see ***Getting started***), then in *_styles.scss*:

```scss
.menu {
	@include icon(before, menu) {
		font-size: 200%;
	}
}
```

### Set responsive breakpoints

Define breakpoint variables in *_config.scss* for use in *_styles.scss* with the `breakpoint($size, $direction: min, $property: width)` mixin. It can handle horizontal or vertical breakpoints, responding up or down. The `$direction` parameter defaults to `min` as it is best practice to develop mobile-first; applying larger styles over the top as the screen size increases.

Take a look at the `breakpoint-range($size-min, $size-max, $property: width)` mixin to set styles that only apply between two breakpoints.

#### Example

In *_config.scss*:

```scss
//-------------------------------------------- Page header

$header-breakpoint-1:				500px;
$header-breakpoint-2:				800px;
$header-vertical-breakpoint-1:		900px;
```

In *_styles.scss*:

```scss
//-------------------------------------------- Page header

body > header {
	padding: 1em;
	@include breakpoint($header-breakpoint-1) {
		padding: 3em;
	}
	@include breakpoint($header-breakpoint-2) {
		font-size: 200%;
		@include breakpoint($header-vertical-breakpoint-1, min, height) {
			padding: 6em 3em;
		}
	}
}
```

### Specify IE9 or modern browser only styles

IE9 gets *styles-ie9.css* via HTML conditional comments while everything else runs *styles.css*. The Sass framework compliles relevent CSS to each of these files.

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

IE9 runs *ie9.js* before *scripts.js* via HTML conditional comments. Modern browsers do not download this file.

#### Example

If you are using HTML5 form field `placeholder` attributes in your project and would like them to work in IE9, add a polyfill such as [*mathiasbynens/jquery-placeholder*](http://mths.be/placeholder) to *ie9.js*.