
function showall(level) {
	for (each in points) {
		if (points[each].level <= level) {
			try {
				Point.prototype.clear(points[each]);
			} catch (e) {}
			Point.prototype.show(points[each]);
		} else {
			try {
				Point.prototype.clear(points[each]);
			} catch (e) {}
		}
	}
}
//缩放回调函数，按大小显示页面节点
var map = new Map("wrap", "map", "content"); //遮罩名，地图名,控件名
map.scale(1100, 800, 0.1, 4, showall); //地图宽度,地图高度,缩放速率,最大缩放倍率
map.start(1100, 800);


var search = document.getElementsByClassName('searchPoint')[0];
var pointName = document.getElementById('name');
var text = document.getElementById('message');
var pic = document.getElementById('pic');
var style = document.getElementsByClassName('type')[0];
var discuss = document.getElementsByClassName('discuss_thing')[0];


Point.prototype = {
	click: function(point) {
		if (pathFlag != 0) {
			var input = document.getElementsByClassName('searchPath');
			input[pathFlag - 1].value = point.name;
			if (pathFlag == 1) {
				pathFlag++;
				input[0].placeholder = "输入起点";
				input[1].placeholder = "输入终点或在地图上选点";
			}
			return;
		}

		var list = document.getElementsByClassName('search_ans')[0];
		list.style.maxHeight = "0px";
		//关闭查询列表
		var oo = document.getElementsByClassName('oo')[0];
		oo.style.maxHeight = "500px";
		//打开详情列表
		oo.scrollTo(0, 0); //页面归零
		search.value = point.name;
		pointName.innerHTML = point.name;
		style.innerHTML = point.style;
		text.innerHTML = point.text;

		while (pic.children.length != 0) {
			pic.children[0].remove();
		}

		while (discuss.children.length != 0) {
			discuss.children[0].remove();
		}

		if (point.img.length == 0) {
			var a = document.createElement('img');
			a.setAttribute('src', './src/pic/no_pic.png');
			a.setAttribute('alt', point.name);
			pic.appendChild(a);
		} else {
			for (each in point.img) {
				var a = document.createElement('img');
				a.setAttribute('src', point.img[each]);
				a.setAttribute('alt', point.name);
				pic.appendChild(a);
			}
		}

		if (point.message.length == 0) {
			var a = document.createElement('div');
			a.setAttribute('class', 'thing');
			a.innerHTML = "暂无评论";
			discuss.appendChild(a);
		} else {
			for (each in point.message) {

				var a = document.createElement('div');
				a.setAttribute('class', 'name');
				a.innerHTML = point.message[each].name;
				var b = document.createElement('div');
				b.setAttribute('class', 'time');
				b.innerHTML = point.message[each].time;
				var c = document.createElement('div');
				c.setAttribute('class', 'thing');
				c.innerHTML = point.message[each].thing;
				var d = document.createElement('div');
				d.setAttribute('class', 'message');
				d.appendChild(a);
				d.appendChild(b);
				d.appendChild(c);
				discuss.appendChild(d);
			}
		}

	},
	show: function(point) {
		var map = document.getElementsByClassName("map")[0];
		var div = document.createElement("div");
		div.innerHTML = point.name;
		div.setAttribute('class', 'content point ' + point.small);
		div.style.left = point.positionX + "px";
		div.style.top = point.positionY + "px";
		div.point = point.id;
		map.appendChild(div);

		point.div = div;
	},
	clear: function(point) {
		point.div.remove();
	}
}

function Point() {

}
//设置共享对象常见，为节点添加提供准备


var clickEvent = document.getElementsByClassName('map')[0];
clickEvent.addEventListener('click', function(e) {
	if (e.path.length == 7) {
		for (each in points) {
			if (points[each].id == e.path[0].point) {
				Point.prototype.click(points[each]);
				break;
			}
		}
	}
})
//点击事件，显示详情

clickEvent.addEventListener('mousedown', function() {
	document.getElementsByClassName('wrap')[0].style.cursor = "url('./src/pic/closedhand.cur'),auto";
})
clickEvent.addEventListener('mouseup', function() {
	document.getElementsByClassName('wrap')[0].style.cursor = "url('./src/pic/openhand.cur'),auto";
})
//更改鼠标样式

var point_input = document.getElementsByClassName('searchPoint')[0];
var fint_timer; //添加查找定时器
point_input.addEventListener('focus', function() {
	point_input.value = "";
	//清空原搜索框
	var blue = document.getElementsByClassName("thing")[0];
	blue.children[0].innerHTML = "请在备选列表中选择";
	blue.children[1].innerHTML = "";
	var oo = document.getElementsByClassName('oo')[0];
	oo.style.maxHeight = "0px";
	//关闭详情列表
	fint_timer = setInterval(function() {
		var list = document.getElementsByClassName('search_ans')[0];
		list.style.maxHeight = "500px";
		showans(find(point_input.value));
	}, 500)
})
//输入框取得焦点

point_input.addEventListener('blur', function() {
	point_input.value = "";
	//清空原搜索框
	var blue = document.getElementsByClassName("thing")[0];
	blue.children[0].innerHTML = "可以在地图上选择点";
	blue.children[1].innerHTML = "";
	clearInterval(fint_timer);
	var list = document.getElementsByClassName('search_ans')[0];
	list.style.maxHeight = "0px";
})
//输入框失去焦点


function showans(arr) {
	var list = document.getElementsByClassName('search_ans')[0];
	while (list.children.length > 0) {
		list.children[0].remove();
	}
	if (arr.length == 0) {
		var node = document.createElement('div');
		node.innerHTML = "没有匹配地点，请更换查询关键字";
		node.setAttribute('class', 'node');
		list.appendChild(node);
		return;
	}
	//打开列表，清空原有内容
	for (var i = 0; i < arr.length; i++) {
		var node = document.createElement('div');
		node.innerHTML = arr[i].name + "---" + arr[i].style;
		node.setAttribute('class', 'node');
		node.point = arr[i].id;
		list.appendChild(node);
	}
	//添加元素	
}
//将所有符合要求的内容添加到对象中

function find(keyWord) {
	var len = points.length;
	var arr = [];
	if (keyWord == "") {
		return arr;
	}
	for (var i = 0; i < len; i++) {
		//如果字符串中不包含目标字符会返回-1
		if (points[i].name.indexOf(keyWord) >= 0) {
			arr.push(points[i]);
		}
	}
	return arr;
}
//字符串方法indexOf，模糊搜索

document.getElementsByClassName("search_ans")[0].addEventListener("click", function(e) {
	if (e.path.length == 7) {
		for (each in points) {
			if (points[each].id == e.path[0].point) {
				Point.prototype.click(points[each]);
				break;
			}
		}
	}
})



//路径
function findId(id) {
	for (var i = 0; i < points.length; i++) {
		if (id == p[i]) {
			return i;
		}
	}
	return null;
}
//由地点id号，转换为数组下标

function createPath(obj) {
	sLength = new Array();
	sBeautiful = new Array();
	sGreen = new Array();
	num = points.length;

	for (var i = 0; i < num; i++) {
		sLength.push(new Array(num));
		sBeautiful.push(new Array(num));
		sGreen.push(new Array(num));
	}
	//建立二维数组

	for (var i = 0; i < num; i++) {
		for (var j = 0; j < num; j++) {
			sLength[i][j] = 10000000;
			sBeautiful[i][j] = 10000000;
			sGreen[i][j] = 10000000;
		}
	}


	p = new Array(num);
	for (var i = 0; i < points.length; i++) {
		p[i] = points[i].id;
	}
	//存储点信息

	for (var i = 0; i < sides.length; i++) {
		var j, k;
		j = findId(sides[i].point1);
		k = findId(sides[i].point2);
		console.log(sides[i].length,j,k);
		sLength[j][k] = sides[i].length;
		sBeautiful[j][k] = sides[i].length;
		sGreen[j][k] = sides[i].length;
		sLength[k][j] = sides[i].length;
		sBeautiful[k][j] = sides[i].length;
		sGreen[k][j] = sides[i].length;
	}
	//存储路径,无向网
}
//创建路的存储
var pathFlag = 0; //标记路径搜索是否打开

var pathL = document.getElementsByClassName("shape")[0];
pathL.addEventListener("click", function(e) {
	pathFlag = 1;
	var searchPath = document.getElementsByClassName("searchPath");
	var search = document.getElementsByClassName("search")[0];
	var search_path = document.getElementsByClassName("search_path")[0];
	var name = document.getElementsByClassName("name")[0];
	var oo = document.getElementsByClassName("oo")[0];
	var search_ans = document.getElementsByClassName("search_ans")[0];

	searchPath[0].value = "";
	searchPath[0].placeholder = "输入起点或在地图上选点";
	searchPath[1].value = "";
	searchPath[1].placeholder = "输入终点";
	search.style.maxHeight = "0px";
	search_path.style.maxHeight = "100px";
	name.style.maxHeight = "0px";
	oo.style.maxHeight = "0px";
	search_ans.style.maxHeight = "0px";
})
var closeL = document.getElementsByClassName("back")[0];
closeL.addEventListener("click", function(e) {
	pathFlag = 0;
	var search = document.getElementsByClassName("search")[0];
	var search_path = document.getElementsByClassName("search_path")[0];
	var name = document.getElementsByClassName("name")[0];
	var oo = document.getElementsByClassName("oo")[0];
	var search_ans = document.getElementsByClassName("search_ans")[0];
	var searchPoint = document.getElementsByClassName("searchPoint")[0];
	var type = document.getElementsByClassName("type")[0];
	var name1 = document.getElementById("name");
	var pathAns = document.getElementsByClassName('path_ans')[0];
	pathAns.style.maxHeight = "0px";
	var wrong = document.getElementsByClassName('wrong')[0];
	wrong.style.maxHeight = "0px";
	
	var canvas = document.getElementById("path");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, 1100, 800);
	//清除画布

	search.style.maxHeight = "50px";
	search_path.style.maxHeight = "0px";
	name.style.maxHeight = "200px";
	oo.style.maxHeight = "0px";
	search_ans.style.maxHeight = "0px";
	name1.innerHTML = "可以在地图上选择点";
	type.innerHTML = "";
	searchPoint.value = "";
})
//查询路径的打开关闭

function pathab(arr, point1, point2) {
	return arr[point1][point2];
}
//查询两点间直接通路

Path.prototype = {
	findPath: function(arr, id2, id1) {
		var djs = new Array(150);
		for (var i = 0; i < p.length; i++) {
			djs[i] = {
				length: 100000000,
				style: 0,
				parent: findId(id1)
			};
		}

		djs[findId(id1)] = {
			style: 2,
			length: 0,
			parent: null,
		};

		var j = findId(id1);
		for (var k = 0; k < p.length - 1; k++) {
			var mmin = 1000000000;
			var mmp = -1;
			for (var i = 0; i < p.length; i++) {
				if (djs[i].style == 0) {
					var min = djs[i].length;
					min = pathab(arr, j, i) + djs[j].length < min ? (djs[i].parent = j, pathab(arr, j, i) + djs[j].length) : min;
					djs[i].length = min;
				
					if (min <= mmin) {//一定为最小值，否则，会陷入0错误
						mmin = min;
						mmp = i;
					}
				}
			}
			j = mmp;
			if (mmp == findId(id2)) {
				var back = [];
				for (; mmp != findId(id1); mmp = djs[mmp].parent) {
					back.push(p[mmp]);
				}
				back.push(id1);
				return back;
			}
			djs[mmp].style = 1;
		}
	}
}

function Path(id1, id2) {
	this.point1 = id1;
	this.point2 = id2;
}

//路径搜索的js部分
var start = document.getElementsByClassName("start")[0].children[0];
var end = document.getElementsByClassName("end")[0].children[0];

start.addEventListener("focus", function() {
	pathFlag = 1;
	start.placeholder = "输入起点或在地图上选点";
	end.placeholder = "输入终点";
	var pathAns = document.getElementsByClassName('path_ans')[0];
	pathAns.style.maxHeight = "0px";
	var wrong = document.getElementsByClassName('wrong')[0];
	wrong.style.maxHeight = "0px";
	fint_timer = setInterval(function() {
		var list = document.getElementsByClassName('search_ans')[0];
		list.style.maxHeight = "500px";
		showans(find(start.value));
	}, 500)
})
start.addEventListener("blur", function() {
	clearInterval(fint_timer);
	var list = document.getElementsByClassName('search_ans')[0];
	list.style.maxHeight = "0px";
})
end.addEventListener("focus", function() {
	pathFlag = 2;
	start.placeholder = "输入起点";
	end.placeholder = "输入终点或在地图上选点";
	var pathAns = document.getElementsByClassName('path_ans')[0];
	pathAns.style.maxHeight = "0px";
	var wrong = document.getElementsByClassName('wrong')[0];
	wrong.style.maxHeight = "0px";
	fint_timer = setInterval(function() {
		var list = document.getElementsByClassName('search_ans')[0];
		list.style.maxHeight = "500px";
		showans(find(end.value));
	}, 500)
})
end.addEventListener("blur", function() {
	clearInterval(fint_timer);
	var list = document.getElementsByClassName('search_ans')[0];
	list.style.maxHeight = "0px";
})
//搜索搜索文本框


var turn = document.getElementsByClassName('turn')[0];
turn.addEventListener("click", function() {
	var change = start.value;
	start.value = end.value;
	end.value = change;
})
//上下位置交换

var buttonPath = document.getElementsByClassName('name')[0];
buttonPath.addEventListener('click', function(e) {
	var flag = 1;
	var nameid = document.getElementById('name');
	if (nameid.innerHTML == "可以在地图上选择点" || nameid.innerHTML == "请在备选列表中选择") {
		flag = 0;
	}

	if (e.path[0].className == "button_from") {
		pathFlag = 2;
		var searchPath = document.getElementsByClassName("searchPath");
		var search = document.getElementsByClassName("search")[0];
		var search_path = document.getElementsByClassName("search_path")[0];
		var name = document.getElementsByClassName("name")[0];
		var oo = document.getElementsByClassName("oo")[0];
		var search_ans = document.getElementsByClassName("search_ans")[0];
		if (flag == 1) {
			searchPath[0].value = nameid.innerHTML;
		} else {
			searchPath[0].value = "";
		}
		searchPath[0].placeholder = "输入起点";
		searchPath[1].value = "";
		searchPath[1].placeholder = "输入终点或在地图上选点";
		search.style.maxHeight = "0px";
		search_path.style.maxHeight = "100px";
		name.style.maxHeight = "0px";
		oo.style.maxHeight = "0px";
		search_ans.style.maxHeight = "0px";

	} else if (e.path[0].className == "button_to") {

		pathFlag = 1;
		var searchPath = document.getElementsByClassName("searchPath");
		var search = document.getElementsByClassName("search")[0];
		var search_path = document.getElementsByClassName("search_path")[0];
		var name = document.getElementsByClassName("name")[0];
		var oo = document.getElementsByClassName("oo")[0];
		var search_ans = document.getElementsByClassName("search_ans")[0];

		searchPath[0].value = "";
		searchPath[0].placeholder = "输入起点或在地图上选点";
		if (flag == 1) {
			searchPath[1].value = nameid.innerHTML;
		} else {
			searchPath[1].value = "";
		}
		searchPath[1].placeholder = "输入终点";
		search.style.maxHeight = "0px";
		search_path.style.maxHeight = "100px";
		name.style.maxHeight = "0px";
		oo.style.maxHeight = "0px";
		search_ans.style.maxHeight = "0px";
	}
})
//由景点直接跳转至路径搜索

function findTrue(name1, name2) {
	var back = new Array(2);
	for (each in points) {
		if (points[each].name == name1) {
			back[0] = points[each].id;
		}
		if (points[each].name == name2) {
			back[1] = points[each].id;
		}
	}
	return back;
}
//根据名称查询，对应id
function showWrong(id1, id2) {
	var wrong = document.getElementsByClassName('wrong')[0];
	wrong.style.maxHeight = "200px";
	wrong.children[1].children[0].children[0].innerHTML = start.value;
	wrong.children[1].children[1].children[0].innerHTML = end.value;
	if (id1 == undefined) {
		wrong.children[1].children[0].classList.remove("cheng");
		wrong.children[1].children[0].classList.add("bai");
	} else {
		wrong.children[1].children[0].classList.remove("bai");
		wrong.children[1].children[0].classList.add("cheng");
	}

	if (id2 == undefined) {
		wrong.children[1].children[1].classList.remove("cheng");
		wrong.children[1].children[1].classList.add("bai");
	} else {
		wrong.children[1].children[1].classList.remove("bai");
		wrong.children[1].children[1].classList.add("cheng");
	}
}
//显示查询错误
function findName(id){
	for (var each in points) {
		if (points[each].id == id) {
			return points[each].name;
		}
	}
}
//根据id查询，对应名称

function showNoPath(i) {
	var pthing = document.getElementsByClassName('pthing');
	var node = document.createElement('div');
	node.setAttribute("class", "nnode");
	node.innerHTML = "没有通路";
	pthing[i].appendChild(node);
}
function showPathLength(id1,id2,i){
	var pthing = document.getElementsByClassName("pthing")[i];
	for(var each in sides){
		if((sides[each].point1==id1&&sides[each].point2==id2)||(sides[each].point2==id1&&sides[each].point1==id2)){
			var snode = document.createElement('div');
			snode.setAttribute("class", "snode");
			snode.innerHTML = findName(id1);
			pthing.children[1].appendChild(snode);
			for(var a in sides[each].path){
				eval("canvas_path("+ sides[each].path[a] +")");
			}
			//绘图---------------------------------------------------------------
			return sides[each].length;
		}
	}
}
//显示路径，并画图
function showPath(arr,s) {
	var pthing = document.getElementsByClassName('pthing')[s];
	var node = document.createElement('div');
	node.setAttribute("class", "nnode");
	var length = 0
	for(var i=0;i<arr.length-1;i++){
		length+=showPathLength(arr[i],arr[i+1],s);
	}
	
	var snode = document.createElement('div');
	snode.setAttribute("class", "snode");
	snode.innerHTML = findName(arr[arr.length-1]);
	pthing.children[1].appendChild(snode);
	//添加最后一个元素
	
	node.innerHTML = "路径总长度："+length;
	pthing.appendChild(node);
}

var searchButton = document.getElementsByClassName('search_button')[0];
searchButton.addEventListener('click', function() {
	var list = findTrue(start.value, end.value);
	var wrong = document.getElementsByClassName('wrong')[0];
	if (start.value == "" || end.value == "") {
		wrong.children[0].innerHTML = "请选择准确的起点或终点";
		showWrong(list[0], list[1]);
		return;
	}
	if (start.value == end.value) {
		wrong.children[0].innerHTML = "请选择不同的起点或终点";
		showWrong(undefined, undefined);
		return;
	}
	if (list[0] == undefined || list[1] == undefined) {
		wrong.children[0].innerHTML = "请选择准确的起点或终点";
		showWrong(list[0], list[1]);
		return;
	}
	
	var pathAns = document.getElementsByClassName('path_ans')[0];
	pathAns.style.maxHeight = "500px";
	
	var canvas = document.getElementById("path");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, 1100, 800);
	//清除画布
	
	var line = Path.prototype.findPath(sLength, list[0], list[1]);
	console.log(line);
	if (line.length == 2 && sLength[findId(line[0])][findId(line[1])]>500000) {
		try {
			var n = document.getElementsByClassName('nnode');
			var length = n.length;
			while (length--) {
				n[0].remove();
			}
		} catch (e) {}
		try {
			var n = document.getElementsByClassName('snode');
			var length = n.length;
			while (length--) {
				n[0].remove();
			}
		} catch (e) {}
		showNoPath(0);
		showNoPath(1);
		showNoPath(2);
	} else {
		try {
			var n = document.getElementsByClassName('nnode');
			var length = n.length;
			while (length--) {
				n[0].remove();
			}
		} catch (e) {}
		try {
			var n = document.getElementsByClassName('snode');
			var length = n.length;
			while (length--) {
				n[0].remove();
			}
		} catch (e) {}
		showPath(line, 0);
		showPath(Path.prototype.findPath(sBeautiful, list[0], list[1]), 1);
		showPath(Path.prototype.findPath(sGreen, list[0], list[1]), 2);
	}
})
//路径搜索按钮
