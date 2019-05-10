const {
	wrapTo,
	pageTo
} = require('./public_page.js');


module.exports = {
	out: out
}

function out() {
	let back = document.getElementsByClassName('back4')[0];
	back.addEventListener('click',function(){
		pageTo(1);
	},{once:true})

	//ajax 获取最新排行

	addList([{
			name: 'a',
			level: 3
		},
		{
			name: 'a',
			level: 3
		},
		{
			name: 'a',
			level: 3
		},
		{
			name: 'a',
			level: 3
		},
		{
			name: 'a',
			level: 3
		},
		{
			name: 'a',
			level: 3
		},
		{
			name: 'a',
			level: 3
		},
	])
	showMe({
		ph: 56,
		name: 'a',
		level: 3
	});
	wrapTo(4);

}
//获取排名数据

function addList(obj) {
	var list = document.getElementsByClassName('phList')[0];
	list.innerHTML = "";
	for (each in obj) {
		list.innerHTML +=
			`<div class="person">
					<span class="id">${1+Number(each)}</span>
					<span class="name">${obj[each].name}</span>
					<span class="level">lv.${obj[each].level}</span>
				</div>`
	}
}
//添加总排行榜

function showMe(obj) {
	var me = document.getElementsByClassName('me')[0];
	me.innerHTML =
		`<div class="person">
					<span class="id">${obj.ph}</span>
					<span class="name">${obj.name}</span>
					<span class="level">lv.${obj.level}</span>
				</div>`
}
//添加个人排名

