//------------主业务逻辑------------
var signoutTimer;
function close(){
	socket.send({
		type:'signout'
	})
}



//------------socket回调函数------------
function socket1(){
	page.wrapTo(0);
}

module.exports={
	close:close,
	socket1:socket1
}




//----------回调函数导入----------
const socket = require('./socket.js');
