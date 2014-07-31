# ![Barebones logo](http://jaydenseric.com/shared/barebones-logo.svg)

The barebones needed to get started on a modern front end. An efficient and powerfull alternative to the [HTML5 Boilerplate](http://html5boilerplate.com).

Only the things needed in every responsive project are included. Extend these essentials to meet your specific requirements.

Barebones is for you if you:

- Do everything responsively.
- Regularly use font icons and SVG.
- Like to do groovy things with Sass.
- Support IE8 and would like to easily target specific IE versions for fixes.

## Sass

Only edit:

- `_config.scss`
- `_fonts.scss`
- `_animations.scss`
- `_styles.scss`

### Config

All Sass variables are set in `_config.scss` for convenient interdependence and to ensure availability at any location in `_styles.scss`.

### CSS foundation

A [CSS foundation](http://jaydenseric.com/blog/forget-normalize-or-resets-lay-your-own-css-foundation) is in `_styles.scss` to get your started, in place of a normalize or reset.

### Utilities

The [Bourbon mixin library](http://bourbon.io) and other custom utilities are available from `_utilities.scss`. You can add more of your own here.

### Media queries

Media queries are mobile-first. Develop a component's mobile styles and then at the precise moments needed to adapt it to increasingly larger screen sizes apply media queries (specific to the component; not targeting devices).

Define breakpoint variables in `_config.scss` for use in `_styles.scss` with the `breakpoint` mixin. This mixin can handle horizontal or vertical breakpoints, responding up or down.

The `breakpoint` mixin handles media query fallbacks for IE8 automatically, displaying the layout adapted to the size specified in `_config.scss` under `$no-media-queries-width` and `$no-media-queries-height`.

#### Example

In `_config.scss`:

    //-------------------------------------------- Page header

    $header-breakpoint-1:				500px;
    $header-breakpoint-2:				800px;
    $header-vertical-breakpoint-1:		900px;

In `_styles.scss`:

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

### Old IE only styles

The `modern-browsers` and `old-ie` mixins allow us to target specific browser generations for fixes.

#### Example

    button {
    	background-color: rgba(white, .5);
    	@include old-ie(8) {
    		background-color: gray;
    	}
    }

### Compile SCSS to CSS

    $ sass --watch styles:styles --style compressed

## Font icons

Font icons are handled using a [special Font Custom implementation](http://jaydenseric.com/blog/font-icons-like-a-boss-with-sass-and-font-custom).

Manage all your project's font icons in `/fonts/icons/fontcustom` as nicely named SVG files. Add icons to this folder to have your fonts magically rebuilt and `_icons.scss` automatically set up for you to start using the icons in `_styles.scss` via their nice names using the `icon` mixin; without touching your markup or dealing with non-semantic class names.

### Compile font icons

    $ cd fonts/icons/fontcustom
    $ fontcustom watch

## Browser support

IE8+ is supported.

Modern browsers do not download old IE hacks or run disruptive Modernizr tests.

They utilize `modern-browsers.css` while old IE runs `ie8.css` or `ie9.css` via conditional comments. The Sass framework automatically compiles these files with relevant contents.

IE <= 9 runs `ie9.js` and IE <= 8 also runs `ie8.js` after `scripts.js` via conditional comments.

In IE8 SVG images are switched out for PNG files of the same name.

### Adding JS polyfills & fixes

Rather than including a bunch of stuff you may not need, Barebones is a starting point for you to add to.

#### Example

If you are using form input placeholder text in your project, add [a polyfill](http://mths.be/placeholder) for support in IE < 10 to `ie9.js`. This will cover IE9 and IE8 and will not be downloaded in modern browsers.
