var yulanFlag = 0;
var yulan = document.getElementsByClassName('yulan')[0];
yulan.addEventListener('click', function(e) {
	if (yulanFlag == 0) {
		yulanFlag = 1;
		var yulanshow = document.getElementsByClassName('yulanshow')[0];
		var message = document.getElementsByClassName('message')[0];
		message.style.height = "0px";
		yulanshow.style.maxHeight = "810px";
	} else {
		yulanFlag = 0;
		var yulanshow = document.getElementsByClassName('yulanshow')[0];
		var message = document.getElementsByClassName('message')[0];
		message.style.height = "600px";
		yulanshow.style.maxHeight = "0px";
	}

})


function tu() {
	Ajax({
		url: "http://localhost:8082/map",
		type: "get",
		data: {},
		async: true,
		success: function(text) {
			var messageBack = JSON.parse(text);
			points = messageBack.points;
			sides = messageBack.sides;
			showall(1);
			createPath();
		},
		fail: function(err) {
			alert("通信错误");
		}
	})
}

function biao() {
	Ajax({
		url: "http://localhost:8082/map",
		type: "get",
		data: {},
		async: true,
		success: function(text) {
			var messageBack = JSON.parse(text);
			points = messageBack.points;
			sides = messageBack.sides;

			var gpoint = document.getElementsByClassName('point')[0];
			var gside = document.getElementsByClassName('side')[0];

			for (var i = 0; i < points.length; i++) {
				var node = document.createElement('div');
				node.setAttribute('class', 'gnode');
				node.innerHTML = points[i].name + " ----- " + points[i].id;
				node.f = points[i].id;
 				gpoint.children[1].appendChild(node);
			}

			for (var i = 0; i < sides.length; i++) {
				var node = document.createElement('div');
				node.setAttribute('class', 'gnode');
				node.innerHTML = findName(sides[i].point1) + " ----> " +findName(sides[i].point2) + "&nbsp;&nbsp;&nbsp;&nbsp;Length: " + sides[i].length;
				node.f = points[i].id;
				gside.children[1].appendChild(node);
			}

		},
		fail: function(err) {
			alert("通信错误");

		}
	})
}
biao();
//获取道路预览
