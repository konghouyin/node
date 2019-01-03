//新页面验证身份
var flag8082 = 0; //验证ajax是否限制

var wrong = function(err) {
	alert("通信错误");
	flag8082 = 0;
};
flag8082=1
Ajax({
		url: "http://localhost:8082/map",
		type: "get",
		data: {},
		async: true,
		success: function(text){
			var messageBack = JSON.parse(text);
			points=messageBack.points;
			sides=messageBack.sides;
			flag8082 = 0;
			showall(1);
			createPath();
		},
		fail: wrong,
	})