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

var cheng = function (text, xml) {
    var messageBack = JSON.parse(text);
    alert(messageBack.msg);
};

var wrong = function (err) {
    alert("通信错误");
};

login.onclick = function () {
    var name = document.getElementsByClassName("user")[0].children[1].value;
    var pass = document.getElementsByClassName("pass")[0].children[1].value;
    Ajax({
        url: "http://localhost:8080/message",
        type: "post",
        data: { "name": name, "pass": pass, "type": "login" },
        async: true,
        success: cheng,
        fail:wrong,
    })
}


reg.onclick = function () {
    var name = document.getElementsByClassName("user")[0].children[1].value;
    var pass = document.getElementsByClassName("pass")[0].children[1].value;
    if (name == "") {
        alert("用户名过短");
        return;
    }
    Ajax({
        url: "http://localhost:8080/message",
        type: "post",
        data: { "name": name, "pass": pass, "type": "reg" },
        async: true,
        success: cheng,
        fail: wrong,
    })
}

