$lightbox = (function () {
	var a = Array.prototype.slice.call(
			document.querySelectorAll(".blocks-gallery-item a")
		),
		b = Array.prototype.slice.call(
			document.querySelectorAll(".wp-block-image img")
		);
	var $els = a.concat(b);

	// Get out
	if (!$els) {
		return false;
	}

	// Create Lightbox
	var box = document.createElement("div");
	box.id = "lightbox";
	box.innerHTML = '<img src="" id="lightbox-img" alt="Lightbox Photo">';
	document.getElementById("outer-wrapper").appendChild(box);

	// Handle Lightbox
	var lightboxHandler = function (e) {
		e.preventDefault();
		var lb = document.getElementById("lightbox");
		var url;
		if (e.target.getAttribute("data-full-url")) {
			url = e.target.getAttribute("data-full-url");
		} else if (e.target.href) {
			url = e.target.href;
		} else if (e.target.src) {
			url = e.target.src;
		}
		document.getElementById("lightbox-img").src = url;
		if (!lb.classList.contains("is-active")) {
			lb.classList.add("is-active");
		} else {
			lb.classList.remove("is-active");
		}
	};

	// Initiate
	for (var i = 0; i < $els.length; i++) {
		var link = $els[i];
		var src = link.href;
		link.addEventListener("click", lightboxHandler);
		console.log(src);
	}

	document
		.getElementById("lightbox")
		.addEventListener("click", lightboxHandler);
})();
