// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "stickymenu",
				defaults = {
					hideWhenScrolled: 100, 			// how far do we need to scroll before hiding the menu
					showWhenFromBottom: 0, 			// how far from the bottom of the page should we before before showing the menu
					unhideOnScrollUp: true,			// Should we show the menu when the user scrolls up?
					scrollUpUnhideSensitivity: 200,	// How far does the user need to scroll up before showing the menu. unhideOnScrollUp need to be true
					minimumAvailableHeight:400		// Only do the hiding and showing if there is more than X amount of pixels available to scroll. Stops sort pages looking weird when menu hides and displays in quick succession
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		Plugin.prototype = {
				init: function () {
					// Place initialization logic here
					// You already have access to the DOM element and
					// the options via the instance, e.g. this.element
					// and this.settings
					// you can add more functions like the one below and
					// call them like so: this.yourOtherFunction(this.element, this.settings).

					var _this = this;
					
					_this.menuVisible = true;
					_this.currentScrollPosition = $(window).scrollTop();
					_this.scrollUpCounter = 0;
					
					$(window).on('scroll', function() {
						_this.update(_this);
					});
					
					
					$(window).on('resize', function() {
						_this.update(_this);
					});						
				},
				update: function (_this) {
					var s = $(window).scrollTop();
					
					_this.documentHeight = $(document).height()-$(window).height(); // need to recalc this as document height could change with lazy load and stuff like that
					
					if(_this.documentHeight > _this.settings.minimumAvailableHeight) {

						if(_this.menuVisible) {
							if(s >= _this.settings.hideWhenScrolled) {
								$('html').addClass('sticky-menu-hidden');
								_this.menuVisible = false;
							}
						}
						
						if(!_this.menuVisible) {
							if(s<_this.lastScrollPosition && s <= (_this.documentHeight - _this.settings.showWhenFromBottom) && _this.settings.unhideOnScrollUp) {
								_this.scrollUpCounter += _this.lastScrollPosition - s;
	
								if(_this.scrollUpCounter >= _this.settings.scrollUpUnhideSensitivity) {
									$('html').removeClass('sticky-menu-hidden');
									_this.menuVisible = true;
								}
							} else {
								_this.scrollUpCounter = 0;
							}
							
							if(s <= _this.settings.hideWhenScrolled || s >= (_this.documentHeight - _this.settings.showWhenFromBottom)) {
								$('html').removeClass('sticky-menu-hidden');
								_this.menuVisible = true;
							}
						}
						
						_this.lastScrollPosition = s;
					}

				}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};
		

})( jQuery, window, document );
