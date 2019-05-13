import '../style/public_reset.css';
import '../style/index.css';

const socket = require('./socket.js');
const page = require('./page.js');
require('./menu.js');


window.onload=()=>{
	document.getElementsByTagName('html')[0].style.height = window.innerHeight+"px";
	window.pageNow = 1;
	page.wrapTo(0);
}


