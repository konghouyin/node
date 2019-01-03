//新页面验证身份
var flag8083 = 0; //验证ajax是否限制

var wrong = function(err) {
	alert("通信错误");
	flag8083 = 0;
};
flag8083=1

	
Ajax({
		url: "http://localhost:8083/login",
		type: "post",
		data: {},
		async: true,
		success: function(text){
			console.log("new");
			var messageBack = JSON.parse(text);
			flag8083 = 0;
			if(messageBack.style==0){
				alert(messageBack.msg);
				window.location.href = messageBack.url;
			}
		},
		fail: wrong,
})