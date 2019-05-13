
//------------主业务逻辑------------
const callBackList = [];
const page = document.body.children;

function pageTo(pageTo) {
	stopDoing(window.pageNow);
	window.pageNow = pageTo;
	page[1].style.display = "none";
	page[3].style.display = "none";

	page[0].style.display = "none";
	page[2].style.display = "none";
	page[4].style.display = "none";
	page[5].style.display = "none";
	page[6].style.display = "none";

	page[pageTo].style.display = "block";
	startDoing(pageTo);
}
//翻页器

function wrapTo(pageTo) {
	stopDoing(window.pageNow);
	window.pageNow = pageTo;
	page[0].style.display = "none";
	page[2].style.display = "none";
	page[4].style.display = "none";
	page[5].style.display = "none";
	page[6].style.display = "none";

	page[pageTo].style.display = "flex";
	startDoing(pageTo);
}
//遮罩控制

function stopDoing(pageFrom) {
	if (callBackList[pageFrom].stop) {
		callBackList[pageFrom].stop();
	}
}
//停止上一页的逻辑

function startDoing(pageTo) {
	if (callBackList[pageTo].start) {
		callBackList[pageTo].start();
	}
}
//启动下一页的逻辑

module.exports = {
	pageTo: pageTo,
	wrapTo: wrapTo
}

//----------回调函数导入----------
callBackList[0] = require('./name');
callBackList[1] = require('./menu');