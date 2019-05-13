const mongo = require('./server_public_mongodb');

module.exports = {
	login: login
}

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
				if(global.onlineList.has(obj.name)){
					global.onlineList.get(obj.name).send(
					JSON.stringify({
						"type": "signtogether",
						"data": {
							"ip":global.onlineList.get(obj.name).ip
						}
					}))
				}
				ws.onLineName = obj.name; //在属性中添加姓名
				global.onlineList.set(obj.name, ws);
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
			ws.onLineName = obj.name; //在属性中添加姓名
			global.onlineList.set(obj.name, ws);
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
