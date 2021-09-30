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
		// scrollHandler();
		window.addEventListener("scroll", scrollHandler);
		$menu_button.addEventListener("click", handleNav, false);
		// document.addEventListener("touchstart", handleTouchStart, false);
		// document.addEventListener("touchmove", handleTouchMove, false);
	});
})();
