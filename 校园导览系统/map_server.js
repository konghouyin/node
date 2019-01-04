var mysql = require('mysql');
var express = require('express');
var querystring = require('querystring');

var server = express();

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	port: 3306,
	password: '3832414122',
	database: 'map'
});

server.all('*', function(req, res, next) {
	// console.log(req.headers);
	res.header("Access-Control-Allow-Origin", 'http://localhost:8080'); //需要显示设置来源
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

server.use('/map', function(req, res) {
	var back = {
		points: [],
		sides: []
	}
	pool.getConnection(function(err, connection) {
		connection.query("SELECT * FROM `map_point` ", function(err, data) {
			if (err) {
				throw err;
			} else {
				for (var i = 0; i < data.length; i++) {
					var n = JSON.parse(data[i].message);
					n.id = data[i].id;
					back.points.push(n);
				}
			}
			connection.release();
			pool.getConnection(function(err, connection) {
				connection.query("SELECT * FROM `map_side` ", function(err, data) {
					if (err) {
						throw err;
					} else {

						for (var i = 0; i < data.length; i++) {
							var n = JSON.parse(data[i].message);
							n.id = data[i].id;
							back.sides.push(n);
						}
					}
					connection.release();
					res.write(JSON.stringify(back));
					res.end();
				});
			});
		});
	});
});

function toInt(obj) {
	obj.id = parseInt(obj.id);
	obj.point1 = parseInt(obj.point1);
	obj.point2 = parseInt(obj.point2);
	obj.length = parseInt(obj.length);
	obj.beautiful = parseInt(obj.beautiful);
	obj.green = parseInt(obj.green);
	obj.path = JSON.parse(obj.path);
	return obj;
}

function toInt2(obj) {
	obj.id = parseInt(obj.id);
	obj.positionX = parseInt(obj.positionX);
	obj.positionY = parseInt(obj.positionY);
	obj.img=[];
	obj.message=[];
	obj.level = parseFloat(obj.level);
	return obj;
}

server.use('/sidein', function(req, res) {
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		obj = querystring.parse(message);
		obj=toInt(obj);
		pool.getConnection(function(err, connection) {

			connection.query("INSERT INTO `map_side` (id,message) VALUES (" + obj.id + ",'" + JSON.stringify(
					obj) +
				"')",
				function(err, data) {
					if (err) {
						throw err;
					} else {
						connection.release();
						res.write(JSON.stringify({
							msg: "道路添加成功"
						}));
						res.end();
					}
				});

		});
	});
});

server.use('/sideupdate', function(req, res) {
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		obj = querystring.parse(message);
		obj=toInt(obj);
		pool.getConnection(function(err, connection) {
			connection.query("UPDATE  `map_side` SET id=" + obj.id + ", message='" + JSON.stringify(
					obj) + "' WHERE id =" + obj.id,
				function(err, data) {
					if (err) {
						throw err;
					} else {
						connection.release();
						res.write(JSON.stringify({
							msg: "道路修改成功"
						}));
						res.end();
					}
				});

		});
	});
});

server.use('/sidedel', function(req, res) {
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		obj = querystring.parse(message);
		console.log(obj);
		pool.getConnection(function(err, connection) {
			connection.query("DELETE FROM `map_side` WHERE id =" + obj.id,
				function(err, data) {
					if (err) {
						throw err;
					} else {
						connection.release();
						res.write(JSON.stringify({
							msg: "道路删除成功"
						}));
						res.end();
					}
				});

		});
	});
});

server.use('/pointin', function(req, res) {
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		obj = querystring.parse(message);
		obj=toInt2(obj);
		pool.getConnection(function(err, connection) {

			connection.query("INSERT INTO `map_point` (id,message) VALUES (" + obj.id + ",'" + JSON.stringify(
					obj) +
				"')",
				function(err, data) {
					if (err) {
						throw err;
					} else {
						connection.release();
						res.write(JSON.stringify({
							msg: "景点添加成功"
						}));
						res.end();
					}
				});

		});
	});
});

server.use('/pointupdate', function(req, res) {
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		obj = querystring.parse(message);
		obj=toInt2(obj);
		pool.getConnection(function(err, connection) {
			connection.query("UPDATE  `map_point` SET id=" + obj.id + ", message='" + JSON.stringify(
					obj) + "' WHERE id =" + obj.id,
				function(err, data) {
					if (err) {
						throw err;
					} else {
						connection.release();
						res.write(JSON.stringify({
							msg: "景点修改成功"
						}));
						res.end();
					}
				});

		});
	});
});

server.use('/pointdel', function(req, res) {
	var obj = {};
	var message = '';
	req.on('data', function(data) {
		message += data;
	})
	req.on('end', function() {
		obj = querystring.parse(message);
		console.log(obj);
		pool.getConnection(function(err, connection) {
			connection.query("DELETE FROM `map_point` WHERE id =" + obj.id,
				function(err, data) {
					if (err) {
						throw err;
					} else {
						connection.release();
						res.write(JSON.stringify({
							msg: "景点删除成功"
						}));
						res.end();
					}
				});

		});
	});
});


server.listen(8082);
var points = [{
		id: 1,
		positionX: 650,
		positionY: 740,
		style: "基础设施",
		level: 1,
		small: "men",
		name: "北门",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;西邮正门，最大的门。虽说气势上比不过师大，但也说得过去！",
		message: [{
				name: "pp",
				thing: "哈哈，够大。",
				time: "2018-12-29"
			},
			{
				name: "9277",
				thing: "今年开学，布置的挺漂亮的",
				time: "2018-12-30"
			},
			{
				name: "9277",
				thing: "门口有邮政快递",
				time: "2018-12-30"
			}
		]
	},
	{
		id: 2,
		positionX: 645,
		positionY: 620,
		style: "景观",
		small: "jingguan",
		level: 1,
		name: "喷泉广场",
		img: ["http://english.xupt.edu.cn/images/13/07/10/ti1gatucb1/13fc7c83a14.jpg",
			"http://imgsrc.baidu.com/forum/w%3D580/sign=f32f28adb812c8fcb4f3f6c5cc0292b4/5c95d739b6003af3bb2386ed342ac65c1138b66c.jpg",
			"https://cdn.applysquare.net/storage/tmp/qa/Nat1TiFk3/NastU8eoT.png",
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
				time: "2019-1-2"
			},
			{
				name: "北方的落叶",
				thing: "地方挺大，圆形的，不错不错，适合毕业合影",
				time: "2019-1-3"
			},
		]
	},
	{
		id: 3,
		positionX: 780,
		positionY: 630,
		style: "教学楼",
		small: "xue",
		level: 1,
		name: "基础教学楼",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基础教学楼，西区的基础课在这里上，有时也是国家级考试的考场，分为AB两栋。",
		message: [{
				name: "风过无痕",
				thing: "物理实验室在顶楼，每次爬个楼，能把人累死",
				time: "2019-1-2"
			},
			{
				name: "懒人",
				thing: "离宿舍实在太远了",
				time: "2019-1-3"
			}
		]
	},
	{
		id: 4,
		positionX: 520,
		positionY: 680,
		style: "办公楼",
		small: "hui",
		level: 1,
		name: "行政楼",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;学生找学校办事，一般都在这个楼上。",
		message: []
	},
	{
		id: 5,
		positionX: 560,
		positionY: 480,
		style: "会场",
		small: "hui",
		level: 1,
		name: "大学生活动中心",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文艺晚会，各种讲座，所在地。",
		message: [{
				name: "风过无痕",
				thing: "预防火灾讲座，还能玩灭火器",
				time: "2019-1-2"
			}

		]
	},
	{
		id: 6,
		positionX: 560,
		positionY: 420,
		style: "景观",
		small: "jingguan",
		level: 1,
		name: "情人湖",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不大的一片水域，环境还是比较优美的。",
		message: [{
				name: "单身狗",
				thing: "请在男（女）朋友陪伴下前往此地",
				time: "2019-1-3"
			}

		]
	},
	{
		id: 7,
		positionX: 660,
		positionY: 400,
		style: "教育",
		level: 1,
		small: "xue",
		name: "图书馆",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;西安邮电大学图书馆，有很多藏书",
		message: [{
			name: "学无止境",
			thing: "MySQL必知必会借不到啊！",
			time: "2018-12-22"
		}]
	},
	{
		id: 8,
		positionX: 730,
		positionY: 520,
		style: "教育",
		level: 1,
		small: "shiyan",
		name: "实验楼#1",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单纯的实验楼",
		message: [{
			name: "学无止境",
			thing: "工图上机还有古董机器",
			time: "2018-12-30"
		}]
	},
	{
		id: 9,
		positionX: 760,
		positionY: 470,
		style: "教育",
		level: 1,
		small: "shiyan",
		name: "实验楼#2",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单纯的实验楼",
		message: []
	},
	{
		id: 10,
		positionX: 800,
		positionY: 410,
		style: "教育",
		level: 1,
		small: "shiyan",
		name: "实验楼#3",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单纯的实验楼",
		message: []
	},
	{
		id: 11,
		positionX: 750,
		positionY: 370,
		style: "景观",
		level: 1,
		small: "jingguan",
		name: "银杏林",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每年10月银杏变黄，风景甚是不错",
		message: [{
				name: "社团狂魔",
				thing: "社团举办活动地点",
				time: "2018-9-20"
			},
			{
				name: "理科生中的艺术家",
				thing: "用银杏叶画画也另有风情",
				time: "2018-10-20"
			}
		]
	},
	{
		id: 12,
		positionX: 620,
		positionY: 230,
		style: "体育",
		level: 1,
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
		id: 13,
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
		id: 14,
		positionX: 740,
		positionY: 130,
		style: "餐饮",
		small: "eat",
		level: 1,
		name: "旭日餐厅",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3层，满足同学们的日常用餐。提供各种美食，但是价格相对其他大学还是有点贵",
		message: [{
			name: "长安吃货",
			thing: "二楼的小炒，物美价廉。就是有时候人比较多，建议闲的时候去吃。",
			time: "2019-1-2"
		}]
	},
	{
		id: 15,
		positionX: 910,
		positionY: 330,
		style: "医疗",
		small: "yiliao",
		level: 1,
		name: "校医院",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;平时打个预防针，一些小外伤，简单包扎。如遇大病，就不要来这里了。",
		message: [{
			name: "贱哥",
			thing: "打预防针，针扎进去，打不进去，又拿出来，在扎了一次。",
			time: "2019-12-22"
		}]
	}, {
		id: 16,
		positionX: 890,
		positionY: 350,
		style: "基础设施",
		small: "hui",
		level: 1,
		name: "澡堂",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;洗澡的地方。",
		message: []
	},
	{
		id: 17,
		positionX: 890,
		positionY: 130,
		style: "宿舍",
		small: "zhu",
		level: 1,
		name: "长智公寓",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宿舍区#1。",
		message: []
	},
	{
		id: 19,
		positionX: 890,
		positionY: 270,
		style: "餐饮",
		small: "eat",
		level: 1,
		name: "美食广场",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;餐饮区，没有旭日餐厅高端，冬天太冷。",
		message: []
	},
	{
		id: 20,
		positionX: 840,
		positionY: 350,
		style: "实践基地",
		small: "shiyan",
		level: 1,
		name: "工训中心",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金工实习场地，磨（挫削）锤子，车床等工业实践操作。",
		message: []
	},
	{
		id: 21,
		positionX: 490,
		positionY: 130,
		style: "宿舍",
		small: "zhu",
		level: 1,
		name: "长思公寓",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宿舍区#2。",
		message: []
	},
	{
		id: 22,
		positionX: 450,
		positionY: 330,
		style: "基础设施",
		small: "men",
		level: 1,
		name: "天桥",
		img: [],
		text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;链接东西区之间的天桥。",
		message: []
	}
]


var sides = [{
		id: 1,
		point1: 1,
		point2: 2,
		length: 135,
		beautiful: 10,
		green: 10,
		path: ["1,695,710,695,640"]
	},
	{
		id: 2,
		point1: 1,
		point2: 3,
		length: 150,
		beautiful: 9,
		green: 9,
		path: ["1,720,715,790,660"]
	},
	{
		id: 3,
		point1: 2,
		point2: 3,
		length: 150,
		beautiful: 8,
		green: 9,
		path: ["1,720,630,790,630"]
	},
	{
		id: 4,
		point1: 2,
		point2: 7,
		length: 300,
		beautiful: 7,
		green: 9,
		path: ["1,695,590,705,430"]
	},
	{
		id: 5,
		point1: 2,
		point2: 8,
		length: 126,
		beautiful: 7,
		green: 9,
		path: ["1,710,590,750,520"]
	},
	{
		id: 6,
		point1: 8,
		point2: 9,
		length: 162,
		beautiful: 7,
		green: 9,
		path: ["1,790,470,755,520"]
	},
	{
		id: 7,
		point1: 9,
		point2: 10,
		length: 72,
		beautiful: 7,
		green: 9,
		path: ["1,790,470,830,410"]
	},
	{
		id: 8,
		point1: 2,
		point2: 5,
		length: 250,
		beautiful: 7,
		green: 9,
		path: ["1,695,590,700,490", "1,670,490,700,490"]
	}
]


// pool.getConnection(function(err, connection) {
// 	for (var i = 0;i<points.length;i++) {
// 		connection.query("INSERT INTO `map_point` (id,message) VALUES (" + points[i].id + ",'" + JSON.stringify(points[
// 			i]) + "')", function(err,
// 			data) {
// 			if (err) {
// 				throw err;
// 			} else {}
// 		});
// 	}
// 	connection.release();
// });
// 
// 
// pool.getConnection(function(err, connection) {
// 	for (var each in sides) {
// 		connection.query("INSERT INTO `map_side` (id,message) VALUES (" + sides[each].id + ",'" + JSON.stringify(sides[each]) +
// 			"')",
// 			function(err,
// 				data) {
// 				if (err) {
// 					throw err;
// 				} else {}
// 			});
// 	}
// });


