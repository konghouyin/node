var request = require("request");

var obj = [];
//传入对象的数组
// {
// 	n:"",
// 	t:"1"
// }

var options = {
	method: 'POST',
	url: 'https://tomcat.xiyoumobile.com/mail/add.do',
	headers: {
		'Postman-Token': '59a4baf7-5dcd-4418-841e-fa0b7578a7af',
		'cache-control': 'no-cache',
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	form: {
		grade: '2018',//年级
		username: 'administrator',//用户名
		password: '',//邮箱密码
		names: encodeURI(JSON.stringify(obj)),
		undefined: undefined
	}
};

request(options, function(error, response, body) {
	if (error) throw new Error(error);
	console.log(body);

	var back = JSON.parse(body);
	var list = back.data.successMembers;

	for (each in list) {
		console.log(list[each].realName + "," + list[each].username + "@xiyou3g.com," + list[each].password);
	}
	//解析字符串，生成密码表

});
