var pic = document.getElementById('circle');
var r;
window.onload = function(){
	var wrap = document.getElementsByClassName('box')[0];
	r = wrap.clientWidth/2;
	pic.setAttribute('Width',r*2);
	pic.setAttribute('Height',r*2);
	
	
	var ctx = pic.getContext('2d');
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.arc(r, r, r-10, 0, 2 * Math.PI);
	
	var gnt1 = ctx.createLinearGradient(0,0,400,300);//线性渐变的起止坐标
    gnt1.addColorStop(0,'red');//创建渐变的开始颜色，0表示偏移量，个人理解为直线上的相对位置，最大为1，一个渐变中可以写任意个渐变颜色
    gnt1.addColorStop(1,'yellow');
	ctx.stroke();
}


