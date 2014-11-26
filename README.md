![Barebones logo](http://jaydenseric.com/shared/barebones-logo.svg)

# Barebones front end framework

The barebones needed to get started on a modern front end. Only the things needed in every responsive project are included; ready to extend as required. An efficient alternative to the [HTML5 Boilerplate](http://html5boilerplate.com).

*Barebones* is for you if you:

- Do everything responsively.
- Regularly use font icons and SVG.
- Like to do groovy things with Sass.
- Support IE8 and would like to easily target specific IE versions for fixes.

## IE8+ browser support

Thanks to some clever Sass and HTML conditional comments, modern browsers avoid downloading old IE specific CSS or JS.

## Requirements

- [Sass](https://github.com/sass/sass).
- [Font Custom](https://github.com/FontCustom/fontcustom).

## Getting started

### Compile font icon setup

```bash
cd fontcustom
fontcustom watch
```

### Compile SCSS to CSS

```bash
sass --watch scss:css --style compressed --sourcemap=none
```

## Sass structure

Most Sass variables should be set in `_config.scss` for convenience and to ensure their availability throughout the project.

The [Bourbon mixin library](http://bourbon.io) and other handy mixins are available from `_utilities.scss`. Add more of your own here as required.

Declare your fonts in `_fonts.scss`.

Set animation keyframes in `_animations.scss`.

A simple [CSS foundation](http://jaydenseric.com/blog/forget-normalize-or-resets-lay-your-own-css-foundation) is in `_foundation.scss` in place of a normalize or reset.

Place your main styles in `_styles.scss`, tapping into all the above.

## How-to

### Use SVG images

For IE8, SVG images are switched out via `ie8.js` for PNG files of the same name. Simply place your [optimized SVG](http://jaydenseric.com/blog/how-to-optimize-svg) files somewhere in `/images/` alongside identically named PNG fallback images.

### Create & use font icons

Font icons are handled using a special [Font Custom](https://github.com/FontCustom/fontcustom) implementation. Refer to the article [*Font icons like a boss with Sass & Font Custom*](http://jaydenseric.com/blog/font-icons-like-a-boss-with-sass-and-font-custom) for detailed usage instructions.

Manage all your project's font icons in `/fontcustom/vectors/` as nicely named SVG files. Add icons to this folder to have your fonts magically rebuilt in `/fonts/icons/` and `_icons.scss` automatically set up for you to start using the icons in `_styles.scss` via their nice names using the `icon` utility mixin; without touching your markup or dealing with non-semantic class names.

#### Example

The icon `/fontcustom/vectors/menu.svg` is included by default. First make sure Font Custom and Sass are compiling (see *Getting started*), then in `_styles.scss`:

```scss
.menu {
	@include icon(before, menu) {
		font-size: 200%;
	}
}
```

### Use media queries in Sass

Media queries are mobile-first. Develop a component's mobile styles and then at the precise moments needed to adapt it to increasingly larger screen sizes apply media queries (specific to the component; not targeting devices).

Define breakpoint variables in `_config.scss` for use in `_styles.scss` with the `breakpoint` mixin. This mixin can handle horizontal or vertical breakpoints, responding up or down.

The `breakpoint` mixin handles media query fallbacks for IE8 automatically, displaying the layout adapted to the size specified in `_config.scss` under `$no-media-queries-width` and `$no-media-queries-height`.

#### Example

In `_config.scss`:

```scss
//-------------------------------------------- Page header

$header-breakpoint-1:				500px;
$header-breakpoint-2:				800px;
$header-vertical-breakpoint-1:		900px;
```

In `_styles.scss`:

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

### Specify IE8, IE9 or modern browser only styles

IE8 and IE9 runs `ie8.css` or `ie9.css` while everything else runs `modern-browsers.css` via HTML conditional comments. The Sass framework compliles relevent CSS to each of these files.

Sass utility mixins `modern-browsers` and `old-ie` allow us to target specific browser generations for fixes. Styles set via `modern-browsers` are excluded from IE8 and IE9. Use `old-ie` to target IE <= 9 or specify the IE version as an argument.

#### Example

```scss
button {
	background-color: rgba(white, .5);
	@include old-ie(8) {
		background-color: gray;
	}
}
```

### Add IE only JS polyfills & fixes

IE <= 9 runs `ie9.js` and IE <= 8 also runs `ie8.js` before `scripts.js` via conditional comments.

#### Example

If you are using form input placeholder text in your project, add [a polyfill](http://mths.be/placeholder) for support in IE <= 9 to `ie9.js`. This will cover IE9 and IE8 and will not be downloaded in modern browsers.