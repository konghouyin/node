const {
	wrapTo,
	pageTo
} = require('./public_page.js');
const url = "http://localhost:351";
const hex_md5 = require('./public_md5.js').hex_md5;

module.exports = {
	success: function(obj) {
		console.log(obj);
		if (obj.style == 1) {
			localStorage.name = obj.name;
			pageTo(1);

			nameSubmit.removeEventListener('click', a);
			input1.removeEventListener('click', b);
			input2.removeEventListener('click', c);
		} else {
			alert(obj.msg);
			document.getElementById('pass').value = "";
		}
	},
	out: function() {
		wrapTo(0);
		nameSubmit.addEventListener('click', a);
		input1.addEventListener('focus', b);
		input1.addEventListener('focus', c);

		input1.value = '';
		input2.value = '';

	}
}

var nameSubmit = document.getElementsByClassName('btn')[0];
var input1 = document.getElementById('name');
var input2 = document.getElementById('pass');

function a() {
	if (input1.value.length == 0) {
		input1.placeholder = '昵称不能为空';
		input1.style.borderBottom = "1px solid #f40";
		input1.style.borderTop = "1px solid #f40";
		return;
	}
	if (input2.value.length == 0) {
		input2.placeholder = '密码不能为空';
		input2.style.borderBottom = "1px solid #f40";
		input2.style.borderTop = "1px solid #f40";
		return;
	}

	if (socket.send({
			type: "login",
			data: {
				name: input1.value,
				pass: hex_md5(input2.value)
			}
		})) {
		return;
	}
}
//姓名localstorage存储并发送存储

function b() {
	input1.placeholder = '昵  称';
	input1.style.borderBottom = "1px solid #aaa";
	input1.style.borderTop = "1px solid #aaa";
}
//错误提示恢复

function c() {
	input2.placeholder = '密  码';
	input2.style.borderBottom = "1px solid #aaa";
	input2.style.borderTop = "1px solid #aaa";
}
//错误提示恢复

const socket = require('./public_socket.js');
