
let menu = document.getElementsByClassName('menu');
menu[0].addEventListener('click', play);
menu[1].addEventListener('click', friend);
menu[2].addEventListener('click', phlist);
menu[3].addEventListener('click', exit);

function play() {
	require('./play.js').out();
	console.log("1")
};

function friend() {
	console.log("2")
};


function phlist() {
	require('./phList.js').out();
};

function exit() {
	localStorage.removeItem('name');
	require('./name.js').out();
};
//退出游戏账号

