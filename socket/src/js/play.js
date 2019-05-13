const {wrapTo,pageTo} = require('./page.js');

module.exports={
	out:out
}


function out(){
	wrapTo(2);
	const find = require("./canvers_circle.js");
	find.timego();
	
	var back = document.getElementById("exitGame");
	back.addEventListener('click',function(){
		find.stopTimer();
		pageTo(1);
	})
	
}


