var ws; //socket实例
function close(){
	ws.close();
}

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
		ws = new WebSocket("ws://192.168.137.1:567");

		ws.onopen = function() {
			//只执行一次
		};

		ws.onmessage = function(evt) {
			var backObj = JSON.parse(evt.data);
			if (backObj.type == 'login') {
				nameCallback.socket1(backObj.data);
			}else if(backObj.type == 'signout'){
				signoutCallback.socket1();
			}
		};

		ws.onclose = function() {
			alert("您与服务器已断开链接，请重新登录！");
			setTimeout(function() {
				WebSocketTest();
			}, 2000)
			page.wrapTo(0);
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
	send: send,
	close:close
}



//----------回调函数导入----------
const nameCallback = require('./name.js');
const page = require('./page.js');
const signoutCallback = require('./signout.js');