//------------主业务逻辑------------
let menu = document.getElementsByClassName('menu');
menu[0].addEventListener('click', play);
menu[1].addEventListener('click', friend);
menu[2].addEventListener('click', phlist);
menu[3].addEventListener('click', exit);

function play() {
	console.log("1")
};

function friend() {
	console.log("2")
};


function phlist() {
	
};

function exit() {
	sessionStorage.removeItem('name');
	signout.close();
};
//退出游戏账号




//------------回调函数------------
module.exports={
	start:null,
	stop:null
}


//----------回调函数导入----------
const page = require('./page.js');
const signout = require('./signout.js');