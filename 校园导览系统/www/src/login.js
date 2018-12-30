/*
ajax({
    url: "", //请求地址
    type: 'get',   //请求方式
    data: { name: 'zhangsan', age: '23', email: '2372734044@qq.com' }, //请求json参数
    async: false,   //是否异步
    success: function (responseText) {
        //   此处执行请求成功后的代码
    },
    fail: function (err) {
        // 此处为执行成功后的代码 
    }
}); */

var login = document.getElementById('login');
var reg = document.getElementById('reg');
var yz = document.getElementById('yz');
var tpyzm = document.getElementById('ok');
var yzm = document.getElementsByClassName('yzmshow')[0];

var flag = 0; //验证ajax是否限制

var cheng = function(text, xml) {
	var messageBack = JSON.parse(text);
	alert(messageBack.msg);
	flag = 0;
};

var wrong = function(err) {
	alert("通信错误");
	flag = 0;
};

login.onclick = function() {
	var name = document.getElementsByClassName("user")[0].children[1].value;
	var pass = document.getElementsByClassName("pass")[0].children[1].value;
	flag = 1;
	Ajax({
		url: "http://localhost:8081/login",
		type: "post",
		data: {
			"name": name,
			"pass": hex_md5(pass)
		},
		async: true,
		success: function(text){
			var messageBack = JSON.parse(text);
			alert(messageBack.msg);
			flag = 0;
			if(messageBack.style==1){
				window.location.href = messageBack.url;
			}
		},
		fail: wrong,
	})
}

tpyzm.onclick = function() {
	var ma = document.getElementById('tpyzm').value;
	if (ma.length == 4) {
		flag = 1;
		Ajax({
			url: "http://localhost:8081/maile",
			type: "post",
			data: {
				"tpyzm": ma,
			},
			async: true,
			success: function(text, xml) {
				var obj = JSON.parse(text);
				if(obj.style==1){
					document.getElementsByClassName('pic')[0].style.display = "none";
				}
				alert(obj.msg);
				document.getElementById('tpyzm').value="";
				flag = 0;
			},
			fail: wrong,
		})
	} else {
		alert("验证码有误！");
		document.getElementById('tpyzm').value="";
	}
}
//图片验证码是否正确

yzm.onclick = function() {
	var exp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	var add = document.getElementById('maile').value;
	if (!exp.test(add)) {
		alert('邮箱格式不对！');
		document.getElementsByClassName('pic')[0].style.display = "none";
		document.getElementById('tpyzm').value="";
		return;
	}
	flag = 1;
	Ajax({
		url: "http://localhost:8081/tpyzm",
		type: "post",
		data: {
			"address": add
		},
		async: true,
		success: function(text) {
			document.getElementsByTagName('svg')[0].remove();
			document.getElementsByClassName('yzmshow')[0].innerHTML = JSON.parse(text).img;
			flag = 0;
		},
		fail: wrong,
	})
}
//更新图片验证码



yz.onclick = function() {
	var exp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	var add = document.getElementById('maile').value;
	if (!exp.test(add)) {
		alert('邮箱格式不对！');
		return;
	}
	flag = 1;
	Ajax({
		url: "http://localhost:8081/tpyzm",
		type: "post",
		data: {
			"address": add
		},
		async: true,
		success: function(text) {
			var obj = JSON.parse(text);
			if(obj.style==1){
				document.getElementsByClassName('yzmshow')[0].innerHTML = obj.img;
				document.getElementsByClassName('pic')[0].style.display = "block";
			}else{
				alert(obj.msg);
			}
			flag = 0;
		},
		fail: wrong,
	})
}
//请求图片验证码



reg.onclick = function() {
	var name = document.getElementsByClassName("user")[0].children[1].value;
	var pass = document.getElementsByClassName("pass")[0].children[1].value;
	var ans = document.getElementById("ans").value;
	if (name == "") {
		alert("用户名过短");
		return;
	}
	if (pass.length < 6) {
		alert("密码过短");
		return;
	}
	flag = 1;
	Ajax({
		url: "http://localhost:8081/reg",
		type: "post",
		data: {
			"name": name,
			"pass": hex_md5(pass),
			"ans": ans
		},
		async: true,
		success: cheng,
		fail: wrong,
	})
}
