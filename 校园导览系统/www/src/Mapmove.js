Map.prototype = {
	a: function(e, showWidth, showHeight, step, max, callback) {
		if (e.wheelDelta > 0) {
			var pointX = (e.clientX - parseFloat(map.map.style.left) - (showWidth / 2)) / map.n + (showWidth / 2);
			var pointY = (e.clientY - parseFloat(map.map.style.top) - (showHeight / 2)) / map.n + (showHeight / 2);
			map.n += map.n * step;
			map.n = (map.n > max) ? max : map.n;
			map.map.style.transform = "scale(" + map.n + "," + map.n + ")";
			map.map.style.left = ((showWidth / 2) - pointX) * (map.n - 1) + (e.clientX - pointX) + "px";
			map.map.style.top = ((showHeight / 2) - pointY) * (map.n - 1) + (e.clientY - pointY) + "px";
			callback(map.n);
		} else if (e.wheelDelta < 0 && map.n > 1.001) {
			var pointX = (e.clientX - parseFloat(map.map.style.left) - (showWidth / 2)) / map.n + (showWidth / 2);
			var pointY = (e.clientY - parseFloat(map.map.style.top) - (showHeight / 2)) / map.n + (showHeight / 2);
			map.n -= map.n * step;
			map.n = (map.n < 1) ? 1 : map.n;
			map.map.style.transform = "scale(" + map.n + "," + map.n + ")";
			map.map.style.left = ((showWidth / 2) - pointX) * (map.n - 1) + (e.clientX - pointX) + "px";
			map.map.style.top = ((showHeight / 2) - pointY) * (map.n - 1) + (e.clientY - pointY) + "px";
			if (showWidth * map.n / 2 - parseFloat(map.map.style.left) < showWidth / 2) {
				map.map.style.left = parseFloat(map.map.style.left) - (showWidth / 2) + (showWidth * map.n / 2 - parseFloat(map.map
						.style
						.left)) +
					"px";
			}
			if (showHeight * map.n / 2 - parseFloat(map.map.style.top) < showHeight / 2) {
				map.map.style.top = parseFloat(map.map.style.top) - (showHeight / 2) + (showHeight * map.n / 2 - parseFloat(map.map
						.style
						.top)) +
					"px";
			}
			if (showWidth * map.n / 2 + parseFloat(map.map.style.left) < showWidth / 2) {
				map.map.style.left = parseFloat(map.map.style.left) + (showWidth / 2) - (showWidth * map.n / 2 + parseFloat(map.map
						.style
						.left)) +
					"px";
			}
			if (showHeight * map.n / 2 + parseFloat(map.map.style.top) < showHeight / 2) {
				map.map.style.top = parseFloat(map.map.style.top) + (showHeight / 2) - (showHeight * map.n / 2 + parseFloat(map.map
						.style
						.top)) +
					"px";
			}
		}
		callback(map.n); //执行回调,先执行，后样式
		for (var i = 0; i < map.content.length; i++) {
			map.content[i].style.transform = "scale(" + 1 / map.n + "," + (1 / map.n) + ")";
		}

	},

	scale: function(showWidth, showHeight, step, max, callback) {
		var p = function p(e) {
			e.preventDefault();
			map.a(e, showWidth, showHeight, step, max, callback);
		}
		this.wrap.addEventListener("mousewheel", p,{passive:false});
		this.event = p;
	},
	close: function() {
		this.wrap.removeEventListener("mousewheel", this.event);
	},

	start: function(showWidth, showHeight) {
		var p = function(e) {
			if(e.path[0].id == "path"){
				map.mouse = 1;
				map.x = e.offsetX;
				map.y = e.offsetY;
			}
		}
		var q = function(e) {
			if (map.mouse == 1 && e.path[0].id == "path") {
				map.map.style.left = e.offsetX-map.x+parseFloat(map.map.style.left)+"px";
				map.map.style.top = e.offsetY-map.y+parseFloat(map.map.style.top)+"px";
				if (showWidth * map.n / 2 - parseFloat(map.map.style.left) < showWidth / 2) {
					map.map.style.left = parseFloat(map.map.style.left) - (showWidth / 2) + (showWidth * map.n / 2 - parseFloat(map.map
							.style
							.left)) +
						"px";
				}
				if (showHeight * map.n / 2 - parseFloat(map.map.style.top) < showHeight / 2) {
					map.map.style.top = parseFloat(map.map.style.top) - (showHeight / 2) + (showHeight * map.n / 2 - parseFloat(map.map
							.style
							.top)) +
						"px";
				}
				if (showWidth * map.n / 2 + parseFloat(map.map.style.left) < showWidth / 2) {
					map.map.style.left = parseFloat(map.map.style.left) + (showWidth / 2) - (showWidth * map.n / 2 + parseFloat(map.map
							.style
							.left)) +
						"px";
				}
				if (showHeight * map.n / 2 + parseFloat(map.map.style.top) < showHeight / 2) {
					map.map.style.top = parseFloat(map.map.style.top) + (showHeight / 2) - (showHeight * map.n / 2 + parseFloat(map.map
							.style
							.top)) +
						"px";
				}
			}
		}
		var r = function(e) {
			map.mouse = 0;
		}
		this.wrap.addEventListener("mousedown", p);
		this.wrap.addEventListener("mousemove", q);
		document.body.addEventListener("mouseup", r);
	},

}

function Map(wrapName, mapName, contentName) {
	this.n = 1;
	this.mouse = 0; //监控鼠标是否点击
	this.event = null; //用于结束事件监听器
	this.event1 = null; //用于结束事件监听器
	this.content = document.getElementsByClassName(contentName);
	this.map = document.getElementsByClassName(mapName)[0];
	this.wrap = document.getElementsByClassName(wrapName)[0];
}


// 文档:
// 新建一个map对象: var map = new Map(wrapName, mapName, contentName);
// 使用map方法:map.scale(showWidth, showHeight, step, max);启动缩放
// 使用map方法:map.close();关闭缩放
