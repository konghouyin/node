var mysql = require('mysql');
var querystring = require('querystring');
var cookiep = require('cookie-parser');
var cookies = require('cookie-session');
var express = require('express');
var svgCaptcha = require('svg-captcha');
var crypto = require('crypto');


var server = express();
 var pool = mysql.createPool({host:'localhost',user:'root',port:3306,password:'3832414122',database:'login'});

server.use(cookiep('sign'));//为cookie添加签名，防篡改
var arr = [];
for(var i=0;i<10000;i++){
	arr.push(Math.random()*9999999+"asdasd");
}
server.use(cookies({
	name:'sess',
	keys:arr,
	maxAge:1000*60*5,
}))


server.all('*', function(req, res, next) {
	// console.log(req.headers);
    res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:8848'); //需要显示设置来源
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials",true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

server.use('/p.html',function(req,res){
	console.log('asd');
	res.writeHead(302, {'Location': 'http://127.0.0.1:8848/try/www/index.html'});
	res.end();
})

server.use('/login',function(req,res){
	var obj = {};
	var message = '';
	req.on('data',function(data){
		message+=data;
	})
	req.on('end',function(){
		obj = querystring.parse(message);
		passRepeate(obj,res)
	})
})
//登录


server.use('/maile',function(req,res){
	var obj = {};
	var message = '';
	req.on('data',function(data){
		message+=data;
	})
	req.on('end',function(){
		obj = querystring.parse(message);
		console.log(obj);
		console.log(req.session);
		if(req.session.tpyzm == undefined){
			res.write(JSON.stringify({msg:"图片验证码已过期，请重新验证！",style:1}));
			res.end();
		}else	if(obj.tpyzm.toLocaleLowerCase() != req.session.tpyzm){
			res.write(JSON.stringify({msg:"图片验证码错误，请再次验证！",style:0}));
			res.end();
		}else{
			req.session['yzm'] = ""+parseInt(Math.random()*9.9999)+parseInt(Math.random()*9.9999)+parseInt(Math.random()*9.9999)+parseInt(Math.random()*9.9999)+parseInt(Math.random()*9.9999)+parseInt(Math.random()*9.9999);
			res.write(JSON.stringify({msg:"邮件已发送！",style:1}));
			mailepass(req.session.add,req.session.yzm);//发送邮件
			res.end();
		}
	})
	
})
//邮箱验证

server.use('/tpyzm',function(req,res){
	var obj = {};
	var message = '';
	req.on('data',function(data){
		message+=data;
	})
	req.on('end',function(){
		obj = querystring.parse(message);
		console.log(obj);
		maileRepeate(obj.address,req,res);
	})
})
//图片验证码

server.use('/reg',function(req,res){
	if(req.session.yzm){
		var message = "";
		req.on('data',function(data){
			message+=data;
		})
		req.on('end',function(){
			obj = querystring.parse(message);
 			if(obj.ans != req.session.yzm){
 				res.write(JSON.stringify({msg:"邮箱验证码错误，请再次验证！"}));
 				res.end();
 			}else{
				obj.maile = req.session.add;
				findRepeate(obj,req,res);
			 }
		})
 	}else{
 		res.write(JSON.stringify({msg:"未验证邮箱或邮箱验证码过期！请验证邮箱"}));
 		res.end();
 	}
	
	
	console.log(req.session);
})
//注册

server.listen(8081);


const nodemailer = require('nodemailer');
function mailepass(add,num){
	console.log(add);
	let transporter = nodemailer.createTransport({
		host: 'smtp.qq.com',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: "1360234119@qq.com", // generated ethereal user
			pass: 'hgxjirbvirzpbadb' // generated ethereal password
		}
	});
	
	let mailOptions = {
		from: {
			name: 'XiYouMobile',
			address: '1360234119@qq.com'
		}, 
		to: add, // list of receivers
		subject: '移动应用开发实验室--验证码', // Subject line
		text: '[移动应用开发实验室]欢迎报名移动应用开发实验室2019年纳新，请在页面输入验证码，验证码有效期5分钟，验证码：'+num, // plain text body
		html: '', // html body
		}
	
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log("邮件发送成功----->\n"+info);
	});
}

function findRepeate(obj,req,res){
	console.log(obj);
	pool.getConnection(function(err, connection){
	  connection.query( "SELECT `name` FROM `user_message`",  function(err, data){
	      if(err)    {
	          throw err;
	      }else{
	          for(each in data){
				  if(data[each].name == obj.name){
					  connection.release();
					  res.write(JSON.stringify({msg:"用户名重复！"}));
					  res.end();
					  return;
				  }
			  }
	      }
		  console.log("INSERT INTO `user_message` (`ID`,`name`,`pass`,`maile`) VALUES(0,'"+obj.name+"','"+obj.pass+"','"+obj.maile+"')");
		  connection.query("INSERT INTO `user_message` (`ID`,`name`,`pass`,`maile`) VALUES(0,'"+obj.name+"','"+obj.pass+"','"+obj.maile+"')");
		  connection.release();
		  req.session = null;//清除session
		  res.write(JSON.stringify({msg:"注册成功！"}));
		  res.end();
	  });
	});
}



function maileRepeate(add,req,res){
	pool.getConnection(function(err, connection){
		connection.query( "SELECT * FROM `user_message` WHERE maile='"+add+"'",  function(err, data){
			if(err){
				throw err;
			}else{
				if(data.length==0){
					connection.release();
					req.session.add = add;
					canvas(req,res);
				}
				else{
					connection.release();
					res.write(JSON.stringify({msg:"邮箱已注册！"},style=0));
					res.end();
				}
			}
		});
	});
}

function canvas(req,res){
	var codeConfig = {
        size: 4,// 验证码长度
        ignoreChars: '0o1il', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
		width:100,
		viewwidth:150,
        height: 28,
		viewheight:40,
    }
    var captcha = svgCaptcha.create(codeConfig);
    req.session.tpyzm = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
    var codeData = {
        img:captcha.data,
		style:1,
    }
    res.send(codeData);
	res.end();
}

function passRepeate(obj,res){
	console.log(obj);
	pool.getConnection(function(err, connection){
		connection.query( "SELECT * FROM `user_message` WHERE name='"+obj.name+"'",  function(err, data){
			if(err){
				throw err;
			}else{
				if(data.length==0){
					connection.release();
					res.write(JSON.stringify({msg:"用户名或密码有误！",style:0}));
					res.end();
					return;
				}
				if(data[0].pass == obj.pass){
					connection.release();
					var cookieSend = ""+obj.name+"~"+obj.pass+"~"+new Date().getTime();//保存cookie验证，防止跨站session失效
					
					var str = JSON.stringify(cookieSend); //明文
					var secret = 'niyidingjiebuchulai'; //密钥--可以随便写
					var cipher = crypto.createCipher('aes192', secret);
					var enc = cipher.update(str, 'utf8', 'hex'); //编码方式从utf-8转为hex;
					enc += cipher.final('hex'); //编码方式从转为hex;
					console.log(cookieSend+"--->"+enc)//输出加密后结果
					
					res.cookie('pbl',enc,{path:'/',maxAge:8*1000,signed:true});
					res.write(JSON.stringify({msg:"登录成功！",style:1,url:"http://127.0.0.1:8848/try/www/login.html"}));
					res.end();
					return;
				}
				else{
					connection.release();
					res.write(JSON.stringify({msg:"用户名或密码有误！",style:0}));
					res.end();
				}
			}
		});
	});
}