function MapMove(showWidth, showHeight, step, max, mapName, contentName) {
	var n = 1;
	var content = document.getElementsByClassName(contentName);
	var map = document.getElementsByClassName(mapName)[0];

	var wrap = document.getElementsByClassName("wrap")[0];
	wrap.addEventListener("mousewheel", function(e) {
		if (e.wheelDelta > 0) {
			var pointX = (e.clientX - parseFloat(map.style.left) - (showWidth / 2)) / n + (showWidth / 2);
			var pointY = (e.clientY - parseFloat(map.style.top) - (showHeight / 2)) / n + (showHeight / 2);
			n += n * step;
			n = (n > max) ? max : n;
			map.style.transform = "scale(" + n + "," + n + ")";
			map.style.left = ((showWidth / 2) - pointX) * (n - 1) + (e.clientX - pointX) + "px";
			map.style.top = ((showHeight / 2) - pointY) * (n - 1) + (e.clientY - pointY) + "px";
		} else if (e.wheelDelta < 0 && n > 1.001) {
			var pointX = (e.clientX - parseFloat(map.style.left) - (showWidth / 2)) / n + (showWidth / 2);
			var pointY = (e.clientY - parseFloat(map.style.top) - (showHeight / 2)) / n + (showHeight / 2);
			n -= n * step;
			n = (n < 1) ? 1 : n;
			map.style.transform = "scale(" + n + "," + n + ")";
			map.style.left = ((showWidth / 2) - pointX) * (n - 1) + (e.clientX - pointX) + "px";
			map.style.top = ((showHeight / 2) - pointY) * (n - 1) + (e.clientY - pointY) + "px";
			if (showWidth * n / 2 - parseFloat(map.style.left) < showWidth / 2) {
				map.style.left = parseFloat(map.style.left) - (showWidth / 2) + (showWidth * n / 2 - parseFloat(map.style
						.left)) +
					"px";
			}
			if (showHeight * n / 2 - parseFloat(map.style.top) < showHeight / 2) {
				map.style.top = parseFloat(map.style.top) - (showHeight / 2) + (showHeight * n / 2 - parseFloat(map.style
						.top)) +
					"px";
			}
			if (showWidth * n / 2 + parseFloat(map.style.left) < showWidth / 2) {
				map.style.left = parseFloat(map.style.left) + (showWidth / 2) - (showWidth * n / 2 + parseFloat(map.style
						.left)) +
					"px";
			}
			if (showHeight * n / 2 + parseFloat(map.style.top) < showHeight / 2) {
				map.style.top = parseFloat(map.style.top) + (showHeight / 2) - (showHeight * n / 2 + parseFloat(map.style
						.top)) +
					"px";
			}
		}

		for (var i = 0; i < content.length; i++) {
			content[i].style.transform = "scale(" + 1 / n + "," + (1 / n) + ")";
		}
	});
}
