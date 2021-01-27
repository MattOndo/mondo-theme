$menu = (function () {
	// Global Vars
	var $menu_offcanvas = document.querySelector("#offcanvas");
	var $menu_button = document.querySelector("#menu button");
	var $page_wrapper = document.querySelector("#wrapper");
	var $logo = document.querySelector("#logo");
	var $headerContainer = document.querySelector("#header");

	// Status
	var menu_is_open = function () {
		if (!$menu_offcanvas.classList.contains("is-open")) {
			return false;
		} else {
			return true;
		}
	};

	// Nav Menu Handler
	var handleNav = function () {
		if (!menu_is_open()) {
			$menu_offcanvas.classList.add("is-open");
			$menu_button.classList.add("is-active");
			$page_wrapper.classList.add("nav-is-open");
			$logo.classList.add("is-active");
		} else {
			$menu_offcanvas.classList.remove("is-open");
			$menu_button.classList.remove("is-active");
			$page_wrapper.classList.remove("nav-is-open");
			$logo.classList.remove("is-active");
		}
	};

	// Touch Handling
	var getTouches = function (evt) {
		return (
			evt.touches || // browser API
			evt.originalEvent.touches
		); // jQuery
	};

	var handleTouchStart = function (evt) {
		var firstTouch = getTouches(evt)[0];
		xDown = firstTouch.clientX;
		yDown = firstTouch.clientY;
	};

	var handleTouchMove = function (evt) {
		if (!xDown || !yDown) {
			return;
		}

		var xUp = evt.touches[0].clientX;
		var yUp = evt.touches[0].clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;

		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			/*most significant*/
			if (xDiff > 0) {
				/* left swipe */
				if (!menu_is_open()) handleNav();
			} else {
				/* right swipe */
				if (menu_is_open()) handleNav();
			}
		} else {
			if (yDiff > 0) {
				/* up swipe */
			} else {
				/* down swipe */
			}
		}
		/* reset values */
		xDown = null;
		yDown = null;
	};

	// Scroll
	var scrollHandler = function () {
		if (window.pageYOffset >= 1) {
			$headerContainer.classList.add("is-scrolled");
		} else {
			$headerContainer.classList.remove("is-scrolled");
		}
	};

	// Event Listeners
	window.addEventListener("load", function (event) {
		scrollHandler();
		$menu_button.addEventListener("click", handleNav, false);
		document.addEventListener("touchstart", handleTouchStart, false);
		document.addEventListener("touchmove", handleTouchMove, false);
		window.addEventListener("scroll", scrollHandler);
	});
})();
