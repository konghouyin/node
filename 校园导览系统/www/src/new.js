//新页面验证身份
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
flag=1
Ajax({
		url: "http://localhost:8082/login",
		type: "post",
		data: {},
		async: true,
		success: function(text){
			var messageBack = JSON.parse(text);
			alert(messageBack.msg);
			flag = 0;
			if(messageBack.style==0){
				window.location.href = messageBack.url;
			}
		},
		fail: wrong,
	})