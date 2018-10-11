

var fs = require('fs');
var http = require('http');
var urlib = require('url');
var querystring = require('querystring');

obj = {};

var server = http.createServer(function (req, res) {
    var request = urlib.parse(req.url, true);
    var url = request.pathname;
    var message;//记录数据

    var str = "";
    req.on('data', function (data) {
        str += data;
    })

    req.on('end', function () {
        if (req.method == "GET") {
            message = request.query;
        } else if (req.method == "POST") {
            message = querystring.parse(str);
        }
   
        if (url == '/message') {
            if (message.type == "reg") {
                if (obj[message.name]) {
                    res.write('{"ok":false,"msg":"用户已存在"}');
                    res.end();
                } else {
                    obj[message.name] = message.pass;
                    res.write('{"ok": true,"msg":"注册成功"}');
                    res.end();
                }
            } else if (message.type == "login") {
                if (obj[message.name]) {
                    if (obj[message.name] == message.pass) {
                        res.write('{"ok":true,"msg":"登录成功"}');
                        res.end();
                    } else {
                        res.write('{"ok":false,"msg":"用户名或密码有误"}');
                        res.end();
                    }
                
                } else {
                    res.write('{"ok": false,"msg":"此用户不存在"}');
                    res.end();
                }
            }

        } else {
            var filename = "./www" + req.url;
            fs.readFile(filename, function (err,data) {
                if (err) {
                    console.log(err);
                    res.write("404");
                } else {
                    res.setHeader("Content-type", "text/html");
                    res.write(data);
                }
                res.end();
            });
        }
    })
});

server.listen(8080);