var points = [{
		id: 1,
		positionX: 650,
		positionY: 620,
		style: "景观",
		small: "jingguan",
		level: 1.3,
		name: "喷泉广场",
		img: ["http://english.xupt.edu.cn/images/13/07/10/ti1gatucb1/13fc7c83a14.jpg",
			"http://imgsrc.baidu.com/forum/w%3D580/sign=f32f28adb812c8fcb4f3f6c5cc0292b4/5c95d739b6003af3bb2386ed342ac65c1138b66c.jpg",
			"https://cdn.applysquare.net/storage/tmp/qa/Nat1TiFk3/NastU8eoT.png",
			"http://english.xupt.edu.cn/images/13/07/10/ti1gatucb1/13fc7c83a14.jpg",
			"http://imgsrc.baidu.com/forum/w%3D580/sign=f32f28adb812c8fcb4f3f6c5cc0292b4/5c95d739b6003af3bb2386ed342ac65c1138b66c.jpg",
			"https://cdn.applysquare.net/storage/tmp/qa/Nat1TiFk3/NastU8eoT.png",
			"http://english.xupt.edu.cn/images/13/07/10/ti1gatucb1/13fc7c83a14.jpg",
			"http://imgsrc.baidu.com/forum/w%3D580/sign=f32f28adb812c8fcb4f3f6c5cc0292b4/5c95d739b6003af3bb2386ed342ac65c1138b66c.jpg",
		],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;景观位于西安邮电大学长安校区西区北门，是西邮著名地标，由象征邮政的鸽子雕像，和象征电子技术的抽象雕像组成，除此之外还配有喷泉，同学们戏称为水煮鸽子。",
		message: [{
				name: "风过无痕",
				thing: "各大社团集合地点",
				time: "2018-12-29"
			},
			{
				name: "搞事情",
				thing: "喷泉感觉没咋开过，好像只有开学开过一次",
				time: "2018-12-30"
			},
			{
				name: "北方的落叶",
				thing: "地方挺大，圆形的，不错不错，适合毕业合影",
				time: "2018-12-30"
			},
			{
				name: "划水王",
				thing: "无意义水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴，水贴！！！",
				time: "2018-12-30"
			},
		]
	},
	{
		id: 2,
		positionX: 550,
		positionY: 200,
		style: "体育",
		small: "tiyu",
		level: 1,
		name: "大操场",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大型室外活动的场所，运动会，军训等。有一个足球场和400m跑道。",
		message: [{
			name: "长安通",
			thing: "我要踢球",
			time: "2018-12-29"
		}]
	},
	{
		id: 3,
		positionX: 250,
		positionY: 600,
		style: "教育",
		level: 1,
		small: "xue",
		name: "逸夫楼",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;西安邮电大学东区，教学楼，是计算机学院，数字艺术传媒学院，研究生的上课和实验场所。也是3G实验室的所在地！！！",
		message: [{
			name: "offer",
			thing: "3G--nb",
			time: "2018-12-29"
		}]
	},
	{
		id: 4,
		positionX: 620,
		positionY: 230,
		style: "体育",
		level: 1.3,
		small: "tiyu",
		name: "体育馆",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;西安邮电大学体育场，内设有排球场地，篮球场地，乒乓球，羽毛球。每年迎新杯比赛在这里举行",
		message: [{
				name: "羽协",
				thing: "场地要是能随时使用就好",
				time: "2018-12-30"
			},
			{
				name: "健身达人",
				thing: "能不能增加一些健身器械",
				time: "2018-12-29"
			}
		]
	},
	{
		id: 5,
		positionX: 650,
		positionY: 740,
		style: "基础设施",
		level: 1,
		small: "men",
		name: "北门",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;西邮正门，最大的门",
		message: [{
				name: "pp",
				thing: "哈哈，够大。",
				time: "2018-12-30"
			},
			{
				name: "9277",
				thing: "是个门",
				time: "2018-12-29"
			}
		]
	},
	{
		id: 6,
		positionX: 660,
		positionY: 400,
		style: "教育",
		level: 1,
		small: "xue",
		name: "图书馆",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;西安邮电大学图书馆，有很多藏书",
		message: [{
				name: "ppop",
				thing: "MySQL必知必会借不到。",
				time: "2018-12-30"
			},
			{
				name: "学",
				thing: "书普遍偏旧",
				time: "2018-12-29"
			}
		]
	}
];
var sides = [{
		id: 1,
		point1: 1,
		point2: 6,
		length: 292,
		beautiful: 8,
		green: 0,
		path: "'circle',660, 340,520,370, 515, 470"
	},
	{
		id: 2,
		point1: 5,
		point2: 1,
		length: 127,
		beautiful: 4,
		green: 0,
		path: ""
	},

];


var paths = [];


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

//style:1风景 2教育 3餐饮 4住宿
showall(1); //默认初始化显示所有信息-----------------------------------------------------------------

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

	for (var i = 0; i < 150; i++) {
		sLength.push(new Array(150));
		sBeautiful.push(new Array(150));
		sGreen.push(new Array(150));
	}
	//建立二维数组

	for (var i = 0; i < 150; i++) {
		for (var j = 0; j < 150; j++) {
			sLength[i][j] = 10000000;
			sBeautiful[i][j] = 10000000;
			sGreen[i][j] = 10000000;
		}
	}


	p = new Array(150);
	for (var i = 0; i < points.length; i++) {
		p[i] = points[i].id;
	}
	//存储点信息

	for (var i = 0; i < sides.length; i++) {
		var j, k;
		j = findId(sides[i].point1);
		k = findId(sides[i].point2);
		sLength[j][k] = sides[i].length;
		sBeautiful[j][k] = sides[i].length;
		sGreen[j][k] = sides[i].length;
		sLength[k][j] = sides[i].length;
		sBeautiful[k][j] = sides[i].length;
		sGreen[k][j] = sides[i].length;
	}
	//存储路径,无向网
}

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
	var wrong = document.getElementsByClassName('wrong')[0];
	wrong.style.maxHeight="0px";

	search.style.maxHeight = "50px";
	search_path.style.maxHeight = "0px";
	name.style.maxHeight = "200px";
	oo.style.maxHeight = "0px";
	search_ans.style.maxHeight = "0px";
	name1.innerHTML = "可以在地图上选择点";
	type.innerHTML = "";
	searchPoint.value = "";
})


function pathab(arr, point1, point2) {
	return arr[point1][point2];
}

Path.prototype = {
	findPath: function(arr, id2, id1) {
		var djs = new Array(150);
		for (var i = 0; i < p.length; i++) {
			djs[i] = {
				style: 0,
			};
		}

		djs[findId(id1)] = {
			style: 2,
			length: 0,
			parent: null,
		};

		for (var k = 0; k < p.length - 1; k++) {
			var mmin = 1000000000;
			var mmp = -1;
			for (var i = 0; i < p.length; i++) {
				if (djs[i].style == 0) {
					var min = pathab(arr, findId(id1), i);
					djs[i].parent = findId(id1);
					for (var j = 0; j < p.length; j++) {
						if (djs[j].style == 1) {
							min = pathab(arr, j, i) < min ? (pathab(arr, j, i), djs[i].parent = j) : min;
						}
					}
					djs[i].length = min;
					if (min < mmin) {
						mmin = min;
						mmp = i;
					}
				}
			}
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
createPath(); //启动后生成ajax文件--------------------------------------
//console.log(Path.prototype.findPath(sLength,6,5))//查路-------------------------------------



//路径搜索的js部分
var start = document.getElementsByClassName("start")[0].children[0];
var end = document.getElementsByClassName("end")[0].children[0];

start.addEventListener("focus", function() {
	pathFlag = 1;
	start.placeholder = "输入起点或在地图上选点";
	end.placeholder = "输入终点";
	var wrong = document.getElementsByClassName('wrong')[0];
	wrong.style.maxHeight="0px";
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
	var wrong = document.getElementsByClassName('wrong')[0];
	wrong.style.maxHeight="0px";
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
buttonPath.addEventListener('click',function(e){
	var flag = 1;
	var nameid = document.getElementById('name');
	if(nameid.innerHTML=="可以在地图上选择点"||nameid.innerHTML=="请在备选列表中选择"){
		flag = 0;
	}
		 
	if(e.path[0].className=="button_from"){
		pathFlag = 2;
		var searchPath = document.getElementsByClassName("searchPath");
		var search = document.getElementsByClassName("search")[0];
		var search_path = document.getElementsByClassName("search_path")[0];
		var name = document.getElementsByClassName("name")[0];
		var oo = document.getElementsByClassName("oo")[0];
		var search_ans = document.getElementsByClassName("search_ans")[0];
		if(flag==1){
			searchPath[0].value = nameid.innerHTML;
		}else{
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
		
	}else if(e.path[0].className=="button_to"){
		
		pathFlag = 1;
		var searchPath = document.getElementsByClassName("searchPath");
		var search = document.getElementsByClassName("search")[0];
		var search_path = document.getElementsByClassName("search_path")[0];
		var name = document.getElementsByClassName("name")[0];
		var oo = document.getElementsByClassName("oo")[0];
		var search_ans = document.getElementsByClassName("search_ans")[0];
		
		searchPath[0].value = "";
		searchPath[0].placeholder = "输入起点或在地图上选点";
		if(flag==1){
			searchPath[1].value = nameid.innerHTML;
		}else{
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

function findTrue(name1,name2){
	var back = new Array(2);
	for(each in points){
		if(points[each].name == name1){
			back[0]=points[each].id;
		}
		if(points[each].name == name2){
			back[1]=points[each].id;
		}
	}
	return back;
}
//根据名称查询，对应id

function showWrong(id1,id2){
	var wrong = document.getElementsByClassName('wrong')[0];
	wrong.style.maxHeight="200px";
	wrong.children[1].children[0].children[0].innerHTML = start.value;
	wrong.children[1].children[1].children[0].innerHTML = end.value;
	if(id1==undefined){
		wrong.children[1].children[0].classList.remove("cheng");
		wrong.children[1].children[0].classList.add("bai");
	}else{
		wrong.children[1].children[0].classList.remove("bai");
		wrong.children[1].children[0].classList.add("cheng");
	}
	
	if(id2==undefined){
		wrong.children[1].children[1].classList.remove("cheng");
		wrong.children[1].children[1].classList.add("bai");
	}else{
		wrong.children[1].children[1].classList.remove("bai");
		wrong.children[1].children[1].classList.add("cheng");
	}
}
//显示错误

var searchButton = document.getElementsByClassName('search_button')[0];
searchButton.addEventListener('click',function(){
	var list = findTrue(start.value,end.value);
	var wrong = document.getElementsByClassName('wrong')[0];
	if(start.value == "" || end.value== ""){
		wrong.children[0].innerHTML = "请选择准确的起点或终点";		
		showWrong(list[0],list[1]);
		return ;
	}
	if(start.value == end.value){
		wrong.children[0].innerHTML = "请选择不同的起点或终点";
		showWrong(undefined,undefined);
		return;
	}
	if(list[0] == undefined || list[1] == undefined){
		wrong.children[0].innerHTML = "请选择准确的起点或终点";
		showWrong(list[0],list[1]);
		return;
	}
	console.log(Path.prototype.findPath(sLength,list[0],list[1]));
	console.log(Path.prototype.findPath(sBeautiful,list[0],list[1]));
	console.log(Path.prototype.findPath(sGreen,list[0],list[1]));
	
	
	//进入计算
	
})

//长度




