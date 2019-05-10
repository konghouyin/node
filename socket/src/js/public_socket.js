const nameCallback = require('./name.js');
var ws; //socket实例

function send(obj) {
	if (ws.readyState != WebSocket.OPEN) {
		alert("正在连接请稍候！");
		return false;
	}
	ws.send(JSON.stringify(obj));
}
//socket通信发送的对象

function WebSocketTest() {
	if ("WebSocket" in window) {
		// 打开一个 web socket
		ws = new WebSocket("ws://localhost:567");

		ws.onopen = function() {
			// Web Socket 已连接上，使用 send() 方法发送数据
			console.log("已连接");
		};

		ws.onmessage = function(evt) {
			var backObj = JSON.parse(evt.data);
			if(backObj.type=='login'){
				nameCallback.success(backObj.data);
			}
		};

		ws.onclose = function() {
			alert("您与服务器已断开链接，我们将帮你重连！");
			setTimeout(function(){
				WebSocketTest();
			},2000)
		};

		ws.onerror = function() {
			alert("链接异常请联系网络管理员！");
		};

	} else {
		// 浏览器不支持 WebSocket
		alert("您的浏览器不支持 WebSocket!请使用最新版Chrome浏览器访问！");
	}
}

WebSocketTest();


module.exports = {
	send: send
}