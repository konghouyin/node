const mongo = require('./public_mongodb');
const express = require('express');
var server = express();
server.listen(351)

server.all('*', function(req, res, next) { //cors跨域
	res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源/* req.headers.origin */
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Content-Type", "application/json;charset=utf-8");
	res.header("Access-Control-Allow-Credentials", true);
	next();
}); //主后台

// server.post('/login', function(req, res) {
// 	var obj;
// 	var message = "";
// 	req.on('data', function(data) {
// 		message += data;
// 	})
// 	req.on('end', function() {
// 		obj = JSON.parse(message);
// 		mongo.insert({
// 			_id: 4,
// 			name: obj.name,
// 			password: obj.pass,
// 			lv: 1,
// 			time: new Date()
// 		}, )
// 
// 		res.write(JSON.stringify({
// 			msg: "注册成功！",
// 			style: 1
// 		}));
// 		res.end();
// 	})
// })

const WebSocket = require('ws');
var onlineList = new Map();
var waitList = new Map();
var playList = new Map();
var roomList = new Map();

const wss = new WebSocket.Server({
	port: 567
});

function login(obj, ws) {
	mongo.find({
		name: obj.name
	}, undefined, findOnly);

	function findOnly(err, result) {
		if (err != null) {
			ws.send(JSON.stringify({
				"type": "login",
				"data": {
					"msg": "数据库查询失败！",
					"style": 0
				}
			}));
			return;
			//数据库查询出现错误
		}
		if (result.length == 0) {
			//没有查询到该用户
			mongo.insert({
				name: obj.name,
				password: obj.pass,
				lv: 1,
				time: new Date()
			}, out)
		} else {
			//查询到该用户
			if (result[0].password == obj.pass) {
				ws.send(JSON.stringify({
					"type": "login",
					"data": {
						"msg": "登录成功！",
						"style": 1
					}
				}));
			} else {
				ws.send(JSON.stringify({
					"type": "login",
					"data": {
						"msg": "用户名或密码错误！",
						"style": 0
					}
				}));
			}
		}
	}

	function out(err) {
		if (err) {
			ws.send(JSON.stringify({
				"type": "login",
				"data": {
					"msg": "数据库添加失败！",
					"style": 0
				}
			}));
		} else {
			ws.send(JSON.stringify({
				"type": "login",
				"data": {
					"msg": "注册成功！",
					"style": 1
				}
			}));
		}
	}
}


wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
		var obj = JSON.parse(message);
		if (obj.type == "login") {
			login(obj.data, ws);
		}
	});




});
