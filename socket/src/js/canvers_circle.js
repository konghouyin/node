const {wrapTo,pageTo} = require('./page.js');

var pic = document.getElementById('circle');
var ctx = pic.getContext("2d");

module.exports= {
	timego:timego,
	stopTimer:stopTimer
}

var circle = {
	startime: undefined,
	color: "rgb(66,193,255)",
	r: 0,
	start: 0,
	end: undefined,
};


var wrap = document.getElementsByClassName('box')[0];
circle.r = wrap.clientWidth / 2;
pic.setAttribute('Width', circle.r * 2);
pic.setAttribute('Height', circle.r * 2);


var timer; //秒表定时器

function timego() {
	circle.startime = new Date().getTime();
	var messageinnerHtml = document.getElementsByTagName('strong')[0];
	timer = setInterval(function() {
		if(new Date().getTime() - circle.startime>59900){
			stopTimer();
			setTimeout(()=>{
				alert("目前在线人数过少，快叫上你的小伙伴一起玩吧！");
				pageTo(1);
			},1);
		}
		messageinnerHtml.innerHTML = Number.parseInt((new Date().getTime() - circle.startime)/1000)+"<i>秒</i>";
		circle.end = 2 * Math.PI * (60000 - new Date().getTime() + circle.startime) / (60000);
		draw();
	}, 30)
}
//启动定时器

function draw() {
	let r = circle.r;
	ctx.clearRect(0, 0, r * 2, r * 2);
	ctx.lineWidth = 15;
	//设置绘图线宽
	ctx.strokeStyle = circle.color;
	ctx.beginPath();
	ctx.arc(r, r, r-8 ,2.5*Math.PI-circle.end ,2.5*Math.PI);
	ctx.stroke();
}
//绘图

function stopTimer(){
	let r = circle.r;
	ctx.clearRect(0, 0, r * 2, r * 2);
	document.getElementsByTagName('strong')[0].innerHTML = 0 +"<i>秒</i>";
	clearInterval(timer);
}
//停止定时器