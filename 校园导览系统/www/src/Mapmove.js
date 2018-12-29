Map.prototype = {
	a :function (e,showWidth, showHeight, step, max) {
		if (e.wheelDelta > 0) {
			var pointX = (e.clientX - parseFloat(map.map.style.left) - (showWidth / 2)) / map.n + (showWidth / 2);
			var pointY = (e.clientY - parseFloat(map.map.style.top) - (showHeight / 2)) / map.n + (showHeight / 2);
			map.n += map.n * step;
			map.n = (map.n > max) ? max : map.n;
			map.map.style.transform = "scale(" + map.n + "," + map.n + ")";
			map.map.style.left = ((showWidth / 2) - pointX) * (map.n - 1) + (e.clientX - pointX) + "px";
			map.map.style.top = ((showHeight / 2) - pointY) * (map.n - 1) + (e.clientY - pointY) + "px";
		} else if (e.wheelDelta < 0 && map.n > 1.001) {
			var pointX = (e.clientX - parseFloat(map.map.style.left) - (showWidth / 2)) / map.n + (showWidth / 2);
			var pointY = (e.clientY - parseFloat(map.map.style.top) - (showHeight / 2)) / map.n + (showHeight / 2);
			map.n -= map.n * step;
			map.n = (map.n < 1) ? 1 : map.n;
			map.map.style.transform = "scale(" + map.n + "," + map.n + ")";
			map.map.style.left = ((showWidth / 2) - pointX) * (map.n - 1) + (e.clientX - pointX) + "px";
			map.map.style.top = ((showHeight / 2) - pointY) * (map.n - 1) + (e.clientY - pointY) + "px";
			if (showWidth * map.n / 2 - parseFloat(map.map.style.left) < showWidth / 2) {
				map.map.style.left = parseFloat(map.map.style.left) - (showWidth / 2) + (showWidth * map.n / 2 - parseFloat(map.map.style
						.left)) +
					"px";
			}
			if (showHeight * map.n / 2 - parseFloat(map.map.style.top) < showHeight / 2) {
				map.map.style.top = parseFloat(map.map.style.top) - (showHeight / 2) + (showHeight * map.n / 2 - parseFloat(map.map.style
						.top)) +
					"px";
			}
			if (showWidth * map.n / 2 + parseFloat(map.map.style.left) < showWidth / 2) {
				map.map.style.left = parseFloat(map.map.style.left) + (showWidth / 2) - (showWidth * map.n / 2 + parseFloat(map.map.style
						.left)) +
					"px";
			}
			if (showHeight * map.n / 2 + parseFloat(map.map.style.top) < showHeight / 2) {
				map.map.style.top = parseFloat(map.map.style.top) + (showHeight / 2) - (showHeight * map.n / 2 + parseFloat(map.map.style
						.top)) +
					"px";
			}
		}
	
		for (var i = 0; i < map.content.length; i++) {
			map.content[i].style.transform = "scale(" + 1 / map.n + "," + (1 / map.n) + ")";
		}
	},
	
	scale: function(showWidth, showHeight, step, max) {
		var p = function p(e){
			map.a(e,showWidth, showHeight, step, max);
		}
		this.wrap.addEventListener("mousewheel", p);
		this.event = p;
	},
	close: function() {
		this.wrap.removeEventListener("mousewheel", this.event);
	},
	
}

function Map(wrapName, mapName, contentName) {
	this.n=1;
	this.event = null;
	this.content = document.getElementsByClassName(contentName);
	this.map = document.getElementsByClassName(mapName)[0];
	this.wrap = document.getElementsByClassName(wrapName)[0];
}

// 
// 文档:
// 新建一个map对象: var map = new Map(wrapName, mapName, contentName);
// 使用map方法:map.scale(showWidth, showHeight, step, max);启动缩放
// 使用map方法:map.close();关闭缩放