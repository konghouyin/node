var mysql = require('mysql');
var express = require('express');
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
							console.log(data[i].message);
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

server.listen(8082);
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
		path: ["2,660, 340,520,370, 515, 470"]
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
	{
		id: 3,
		point1: 5,
		point2: 2,
		length: 527,
		beautiful: 4,
		green: 0,
		path: ""
	},

];




// pool.getConnection(function(err, connection) {
// 	for (var each in points) {
// 		connection.query("INSERT INTO `map_point` (message) VALUES ('" + JSON.stringify(points[each]) + "')", function(err,
// 			data) {
// 			if (err) {
// 				throw err;
// 			} else {}
// 		});
// 	}
// });


// pool.getConnection(function(err, connection) {
// 	for (var each in sides) {
// 		connection.query("INSERT INTO `map_side` (message) VALUES ('" + JSON.stringify(sides[each]) + "')", function(err,
// 			data) {
// 			if (err) {
// 				throw err;
// 			} else {}
// 		});
// 	}
// });