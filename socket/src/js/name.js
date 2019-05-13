//------------主业务逻辑------------
var nameSubmit = document.getElementsByClassName('btn')[0];
var input1 = document.getElementById('name');
var input2 = document.getElementById('pass');

function start() {
	input1.value = '';
	input2.value = '';

	nameSubmit.addEventListener('click', sendCheck);
	input1.addEventListener('focus', errBack1);
	input2.addEventListener('focus', errBack2);
}

function end() {
	nameSubmit.removeEventListener('click', sendCheck);
	input1.removeEventListener('focus', errBack1);
	input2.removeEventListener('focus', errBack2);
}

function sendCheck() {
	if (input1.value.length == 0) {
		err1();
		return;
	}
	if (input2.value.length == 0) {
		err2();
		return;
	}
	send();
}
//消息发送前检查

function send() {
	socket.send({
		type: "login",
		data: {
			name: input1.value,
			pass: hex_md5(input2.value)
		}
	})
}
//注册登录请求发送


//------------辅助业务逻辑------------
function err1() {
	input1.placeholder = '昵称不能为空';
	input1.style.borderBottom = "1px solid #f40";
	input1.style.borderTop = "1px solid #f40";
}
//昵称填写错误

function err2() {
	input2.placeholder = '密码不能为空';
	input2.style.borderBottom = "1px solid #f40";
	input2.style.borderTop = "1px solid #f40";
}
//密码填写错误

function errBack1() {
	input1.placeholder = '昵  称';
	input1.style.borderBottom = "1px solid #aaa";
	input1.style.borderTop = "1px solid #aaa";
}
//昵称错误提示恢复

function errBack2() {
	input2.placeholder = '密  码';
	input2.style.borderBottom = "1px solid #aaa";
	input2.style.borderTop = "1px solid #aaa";
}
//密码错误提示恢复



//------------socket回调函数------------
function socket1(obj) {
	if (obj.style == 1) {
		sessionStorage.name = obj.name;//本地存储登录用户名
		page.pageTo(1);
	} else {
		alert(obj.msg);
		input2.value = "";
	}
}

module.exports={
	start:start,
	end:end,
	socket1:socket1
}


//----------回调函数导入----------
const page = require('./page.js');
const hex_md5 = require('./public_md5.js').hex_md5;
const socket = require('./socket.js');

