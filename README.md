IntelliMenu
===========

jQuery sticky menu plugin that hides and reveals itself intelligently

Usage
===========
```javascript
$(window).load(function() {
    // initialise our sticky menu
    $('#header').stickymenu(options);
});
```

Options
===========
```javascript
hideWhenScrolled: 100, 			// how far do we need to scroll before hiding the menu
showWhenFromBottom: 0, 			// how far from the bottom of the page should we before before showing the menu
unhideOnScrollUp: true,			// Should we show the menu when the user scrolls up?
scrollUpUnhideSensitivity: 200,	// How far does the user need to scroll up before showing the menu. unhideOnScrollUp need to be true
minimumAvailableHeight:400		// Only do the hiding and showing if there is more than X amount of pixels available to scroll. Stops short pages looking weird when menu hides and displays in quick succession
```
