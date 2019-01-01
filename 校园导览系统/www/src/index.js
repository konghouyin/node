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
	point1: 2,
	point2: 6,
	length: 292,
	beautiful: 8,
	green: 0,
	path: "'circle',660, 340,520,370, 515, 470"
}];


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
			console.log(points[each].id);
			if (points[each].id == e.path[0].point) {
				Point.prototype.click(points[each]);
				break;
			}
		}
	}
})

//style:1风景 2教育 3餐饮 4住宿
showall(1); //默认初始化显示所有信息




//路径
var pathL = document.getElementsByClassName("shape")[0];
pathL.addEventListener("click", function(e) {
	var search = document.getElementsByClassName("search")[0];
	var search_path = document.getElementsByClassName("search_path")[0];
	var name = document.getElementsByClassName("name")[0];
	var oo = document.getElementsByClassName("oo")[0];
	var search_ans = document.getElementsByClassName("search_ans")[0];

	search.style.maxHeight = "0px";
	search_path.style.maxHeight = "100px";
	name.style.maxHeight = "0px";
	oo.style.maxHeight = "0px";
	search_ans.style.maxHeight = "0px";
})
var closeL = document.getElementsByClassName("back")[0];
closeL.addEventListener("click", function(e) {
	var search = document.getElementsByClassName("search")[0];
	var search_path = document.getElementsByClassName("search_path")[0];
	var name = document.getElementsByClassName("name")[0];
	var oo = document.getElementsByClassName("oo")[0];
	var search_ans = document.getElementsByClassName("search_ans")[0];
	var searchPoint = document.getElementsByClassName("searchPoint")[0];
	var type = document.getElementsByClassName("type")[0];
	var name1 = document.getElementById("name");


	search.style.maxHeight = "50px";
	search_path.style.maxHeight = "0px";
	name.style.maxHeight = "200px";
	oo.style.maxHeight = "0px";
	search_ans.style.maxHeight = "0px";
	name1.innerHTML = "可以在地图上选择点";
	type.innerHTML = "";
	searchPoint.value = "";
})
