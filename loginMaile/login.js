var mysql = require('mysql');
var cookiep = require('cookie-parser');
var cookies = require('cookie-session');
var crypto = require('crypto');
var express = require('express');

var server = express();

server.use(cookiep('sign'));//为cookie添加签名，防篡改
var arr = [];
for(var i=0;i<10000;i++){
	arr.push(Math.random()*9999999+"asdasd");
}
server.use(cookies({
	name:'sess',
	keys:arr,
	maxAge:1000*60*20,
}))

 var pool = mysql.createPool({host:'localhost',user:'root',port:3306,password:'3832414122',database:'login'});


server.all('*', function(req, res, next) {
	// console.log(req.headers);
    res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:8848'); //需要显示设置来源
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials",true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

server.use('/login',function(req,res){
	var obj = {};
	var message = '';
	req.on('data',function(data){
		message+=data;
	})
	req.on('end',function(){
		var ss = req.signedCookies.pbl; //这是user加密后的结果	赋值给变量ss
		var secret = 'niyidingjiebuchulai';
		var decipher = crypto.createDecipher('aes192', secret);
		try{
			var dec = decipher.update(ss, 'hex', 'utf8'); //编码方式从hex转为utf-8;
			dec += decipher.final('utf8'); //编码方式从utf-8;
		}catch(e){
			res.write(JSON.stringify({msg:"登录异常!" ,style:0,url:"http://localhost:8081/p.html"}));
			res.end();
			return ;
		}
		
		//封装后的结果应该是 http://jaunsoo.com/xxxxxxxxxxxxxxx
		var out = JSON.parse(dec).split('~');//这是解密后的结果
		var obj = {
			name:out[0],
			pass:out[1],
		}
		var timeNow = new Date();
		if(timeNow-out[2]<3000){
			passRepeate(obj,req,res)
		}else{
			res.write(JSON.stringify({msg:"登录跳转超时!" ,style:0,url:"http://localhost:8081/p.html"}));
			res.end();
		}
	})
})
//登录

server.listen(8082);

function passRepeate(obj,req,res){
	console.log(obj);
	pool.getConnection(function(err, connection){
		connection.query( "SELECT * FROM `user_message` WHERE name='"+obj.name+"'",  function(err, data){
			if(err){
				throw err;
			}else{
				if(data.length==0){
					connection.release();
					res.write(JSON.stringify({msg:"登录异常！",style:0,url:"http://localhost:8081/p.html"}));
					res.end();
					return;
				}
				if(data[0].pass == obj.pass){
					connection.release();
					req.session.style = "ok";
					res.write(JSON.stringify({msg:obj.name+"--登录成功！",style:1}));
					res.end();
					return;
				}
				else{
					connection.release();
					res.write(JSON.stringify({msg:"登录异常！！",style:0,url:"http://localhost:8081/p.html"}));
					res.end();
				}
			}
		});
	});
}