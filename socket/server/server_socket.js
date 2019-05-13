const {
	login
} = require("./server_login.js");
const {
	signout
} = require("./server_signout.js");

global.onlineList = new Map();
global.waitList = new Map();
global.playList = new Map();
global.roomList = new Map();
//管理连接的socket变量

const WebSocket = require('ws');
const wss = new WebSocket.Server({
	port: 567
});

wss.on('connection', function connection(ws, req) {
	// ws.ip = req.connection.remoteAddress;
	//？？？？获取ipv6？？？
	console.log(req);
	ws.on('message', function incoming(message) {
		var obj = JSON.parse(message);
		if (obj.type == "login") {
			login(obj.data, ws);
		}
		if (obj.type == "signout") {
			signout(ws);
		}
	});

	ws.on('close', function close() {
		global.onlineList.delete(ws.onLineName);
	})
});











setInterval(() => {
	list();
}, 1000)

function list() {
	let n = 0;
	for (let key of global.onlineList.keys()) {
		n++;
	}
	console.log(n);
}
