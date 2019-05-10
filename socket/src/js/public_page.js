module.exports={
	pageTo:pageTo,
	wrapTo:wrapTo
}

var page = document.body.children;

function pageTo(n){
	page[1].style.display="none";
	page[3].style.display="none";
	
	page[0].style.display="none";
	page[2].style.display="none";
	page[4].style.display="none";
	page[5].style.display="none";
	page[6].style.display="none";
	
	page[n].style.display="block";
}
//翻页器

function wrapTo(n){
	page[0].style.display="none";
	page[2].style.display="none";
	page[4].style.display="none";
	page[5].style.display="none";
	page[6].style.display="none";
	
	page[n].style.display="flex";
}
//遮罩控制