(function(document, undefined) {
	// Helper functions.
	function $() {
		return document.querySelector.apply(document, arguments);
	}

	function getURL(url) {
		if (window.chrome) {
			return chrome.extension.getURL(url);
		} else if (window.safari) {
			return safari.extension.baseURI + url;
		} else { // welp.
			console.warn("unknown browser: getURL(" + url + ")");
			return url;
		}
	}

	// Replace assets.
	$("link[rel='shortcut icon']").href = getURL("resources/favicon.ico");

	/*
	 It would really be preferable to be overriding the CSS rather than replacing
	 it. For now, this is what we have to do.
	*/

	$("link[rel=stylesheet][title=dark]").href = getURL("resources/app-dark.css");
	$("link[rel=stylesheet][title=light]").href = getURL("resources/app-light.css");

	var updateSound = $("#update-sound");
	updateSound.querySelector("source[type='audio/mp3']").src = getURL("resources/alert.mp3");
	updateSound.querySelector("source[type='audio/ogg']").src = getURL("resources/alert.ogg");

	// Add header event listeners.
	function headerNodeInsertedHook(e) {
		if (e && e.target && e.target.classList && e.target.classList.contains("js-app-header")) {
			var header = e.target;

			document.body.removeEventListener("DOMNodeInserted", headerNodeInsertedHook);

			header.addEventListener("mouseover", function() {
				this.classList.add("tde-show-column-icons", "tde-hovering");
			});

			header.addEventListener("mouseout", function() {
				this.classList.remove("tde-hovering");

				setTimeout(function() {
					if (!header.classList.contains("tde-hovering")) {
						header.classList.remove("tde-show-column-icons");
					}
				}, 500);
			});
		}
	}

	document.body.addEventListener("DOMNodeInserted", headerNodeInsertedHook);
})(document);
