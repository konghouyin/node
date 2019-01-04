var yulanFlag = 0;
var yulan = document.getElementsByClassName('yulan')[0];
yulan.addEventListener('click', function(e) {
	if (yulanFlag == 0) {
		tu();
		yulanFlag = 1;
		var yulanshow = document.getElementsByClassName('yulanshow')[0];
		var message = document.getElementsByClassName('gmessage')[0];
		message.style.height = "0px";
		yulanshow.style.maxHeight = "810px";
	} else {
		yulanFlag = 0;
		var yulanshow = document.getElementsByClassName('yulanshow')[0];
		var message = document.getElementsByClassName('gmessage')[0];
		message.style.height = "600px";
		yulanshow.style.maxHeight = "0px";
	}

})


function tu() {
	Ajax({
		url: "http://localhost:8082/map",
		type: "get",
		data: {},
		async: true,
		success: function(text) {
			var messageBack = JSON.parse(text);
			points = messageBack.points;
			sides = messageBack.sides;
			var p = document.getElementsByClassName('content');
			while(p.length!=0){
				p[0].remove();
			}
			showall(1);
			createPath();
		},
		fail: function(err) {
			alert("通信错误");
		}
	})
}

function biao() {
	Ajax({
		url: "http://localhost:8082/map",
		type: "get",
		data: {},
		async: true,
		success: function(text) {
			var messageBack = JSON.parse(text);
			points = messageBack.points;
			sides = messageBack.sides;
			
			var gnode = document.getElementsByClassName('gnode');
			while(gnode.length!=0){
				gnode[0].remove();
			}

			var gpoint = document.getElementsByClassName('point')[0];
			var gside = document.getElementsByClassName('side')[0];

			for (var i = 0; i < points.length; i++) {
				var node = document.createElement('div');
				node.setAttribute('class', 'gnode');
				node.innerHTML = points[i].name + " ----- " + points[i].id;
				node.f = points[i].id;
 				gpoint.children[1].appendChild(node);
			}

			for (var i = 0; i < sides.length; i++) {
				var node = document.createElement('div');
				node.setAttribute('class', 'gnode');
				node.innerHTML = findName(sides[i].point1) + " ----> " +findName(sides[i].point2) + "&nbsp;&nbsp;&nbsp;&nbsp;Length: " + sides[i].length;
				node.f = i;
				gside.children[1].appendChild(node);
			}

		},
		fail: function(err) {
			alert("通信错误");

		}
	})
}
tu();
biao();
//获取道路预览

document.getElementsByClassName('tthing')[0].addEventListener('click',function(e){
	var id = document.getElementById('point_id');
	var name = document.getElementById('point_name');
	var x = document.getElementById('point_x');
	var y = document.getElementById('point_y');
	var level = document.getElementById('point_level');
	var small = document.getElementById('point_small');
	var style = document.getElementById('point_style');
	var text = document.getElementById('point_text');
	if(e.path[0].classList[0]=="gnode"){
		var num = findId(e.path[0].f);
		id.value = points[num].id;
		name.value = points[num].name;
		x.value = points[num].positionX;
		y.value = points[num].positionY;
		level.value = points[num].level;
		style.value = points[num].style;
		
		for(var i=0;i<small.options.length;i++){
			if(small.options[i].value == points[num].small){
				small.selectedIndex = i;
				break;
			}
		}
		text.value = points[num].text;
	}
})
//添加景点到右侧

document.getElementsByClassName('tthing')[1].addEventListener('click',function(e){
	var id = document.getElementById('side_id');
	var point1 = document.getElementById('side_point1');
	var point2 = document.getElementById('side_point2');
	var length = document.getElementById('side_length');
	var beautiful = document.getElementById('side_beautiful');
	var green = document.getElementById('side_green');
	var path = document.getElementById('side_path');
	if(e.path[0].classList[0]=="gnode"){
		var num = e.path[0].f;
		id.value = sides[num].id;
		point1.value = sides[num].point1;
		point2.value = sides[num].point2
		length.value = sides[num].length;
		beautiful.value = sides[num].beautiful;
		green.value = sides[num].green;
		path.value = "";
		for(var i=0;i<sides[num].path.length;i++){
			path.value += sides[num].path[i];
			if(i!=sides[num].path.length-1){
				path.value+="&";
			}
		}
	}
})
//添加道路到右侧

document.getElementsByClassName('side_in')[0].addEventListener('click',function(e){
	var id = document.getElementById('side_id');
	var point1 = document.getElementById('side_point1');
	var point2 = document.getElementById('side_point2');
	var length = document.getElementById('side_length');
	var beautiful = document.getElementById('side_beautiful');
	var green = document.getElementById('side_green');
	var path = document.getElementById('side_path');
	if(id.value == "" ||point1.value == "" ||point2.value == "" ||length.value == "" ||beautiful.value == "" ||green.value == "" ){
		alert("请先完善表单再提交");
		return ;
	}
	if(point1.value==point2.value){
		alert("起点终点要求不相同，请重新填写");
		return ;
	}
	for(var i=0;i<sides.length;i++){
		if(id.value == sides[i].id){
			alert("id已占用，请填写其他id");
			return;
		}
	}
	var send = {
		id:parseInt(id.value),
		point1:parseInt(point1.value),
		point2:parseInt(point2.value),
		length:parseInt(length.value),
		beautiful:parseInt(beautiful.value),
		green:parseInt(green.value),
		path:JSON.stringify(path.value.split("&"))
	};
	
	Ajax({
		url: "http://localhost:8082/sidein",
		type: "post",
		data: send,
		async: true,
		success: function(text) {
			var messageBack = JSON.parse(text);
			alert(messageBack.msg);
			biao();
		},
		fail: function(err) {
			alert("通信错误");
		}
	})
})
//路径添加

document.getElementsByClassName('side_gai')[0].addEventListener('click',function(e){
	var id = document.getElementById('side_id');
	var point1 = document.getElementById('side_point1');
	var point2 = document.getElementById('side_point2');
	var length = document.getElementById('side_length');
	var beautiful = document.getElementById('side_beautiful');
	var green = document.getElementById('side_green');
	var path = document.getElementById('side_path');
	if(id.value == "" ||point1.value == "" ||point2.value == "" ||length.value == "" ||beautiful.value == "" ||green.value == "" ){
		alert("请先完善表单再提交");
		return ;
	}
	if(point1.value==point2.value){
		alert("起点终点要求不相同，请重新填写");
		return ;
	}
	var flag = 0;
	for(var i=0;i<sides.length;i++){
		if(id.value == sides[i].id){
			alert("修改id为"+id.value+"的道路");
			flag=1;
		}
	}
	if(flag==0){
		alert("没有对应id的道路，请重新操作");
		return;
	}
	var send = {
		id:parseInt(id.value),
		point1:parseInt(point1.value),
		point2:parseInt(point2.value),
		length:parseInt(length.value),
		beautiful:parseInt(beautiful.value),
		green:parseInt(green.value),
		path:JSON.stringify(path.value.split("&"))
		};
	
	Ajax({
		url: "http://localhost:8082/sideupdate",
		type: "post",
		data: send,
		async: true,
		success: function(text) {
			var messageBack = JSON.parse(text);
			alert(messageBack.msg);
			biao();
		},
		fail: function(err) {
			alert("通信错误");
		}
	})
})
//路径修改
//缺陷：保证同一条路，只有一个数据

document.getElementsByClassName('side_shanchu')[0].addEventListener('click',function(e){
	var id = document.getElementById('side_id');
	if(id.value == "" ){
		alert("请输入需要删除的id号");
		return ;
	}
	var flag = 0;
	for(var i=0;i<sides.length;i++){
		if(id.value == sides[i].id){
			alert("删除id为"+id.value+"的道路");
			flag=1;
		}
	}
	if(flag==0){
		alert("没有找到对应id的道路，请重新操作");
		return;
	}
	var send = {
		id:parseInt(id.value),
	};
	
	Ajax({
		url: "http://localhost:8082/sidedel",
		type: "post",
		data: send,
		async: true,
		success: function(text) {
			var messageBack = JSON.parse(text);
			alert(messageBack.msg);
			biao();
		},
		fail: function(err) {
			alert("通信错误");
		}
	})
})
//路径删除

document.getElementsByClassName('point_in')[0].addEventListener('click',function(e){
	var id = document.getElementById('point_id');
	var name = document.getElementById('point_name');
	var x = document.getElementById('point_x');
	var y = document.getElementById('point_y');
	var level = document.getElementById('point_level');
	var small = document.getElementById('point_small');
	var style = document.getElementById('point_style');
	var text = document.getElementById('point_text');
	if(id.value == "" ||name.value == "" ||x.value == "" ||y.value == "" ||level.value == "" ||style.value == "" ||text.value == ""){
		alert("请先完善表单再提交");
		return ;
	}
	for(var i=0;i<points.length;i++){
		if(id.value == points[i].id){
			alert("id已占用，请填写其他id");
			return;
		}
	}
	var send = {
		id:parseInt(id.value),
		name:name.value,
		positionX:parseInt(x.value),
		positionY:parseInt(y.value),
		level:parseFloat(level.value),
		small:small.options[small.selectedIndex].value,
		style:style.value,
		text:text.value,
	};
	
	Ajax({
		url: "http://localhost:8082/pointin",
		type: "post",
		data: send,
		async: true,
		success: function(text) {
			var messageBack = JSON.parse(text);
			alert(messageBack.msg);
			biao();
		},
		fail: function(err) {
			alert("通信错误");
		}
	})
})
//景点添加

document.getElementsByClassName('point_gai')[0].addEventListener('click',function(e){
	var id = document.getElementById('point_id');
	var name = document.getElementById('point_name');
	var x = document.getElementById('point_x');
	var y = document.getElementById('point_y');
	var level = document.getElementById('point_level');
	var small = document.getElementById('point_small');
	var style = document.getElementById('point_style');
	var text = document.getElementById('point_text');
	if(id.value == "" ||name.value == "" ||x.value == "" ||y.value == "" ||level.value == "" ||style.value == "" ||text.value == ""){
		alert("请先完善表单再提交");
		return ;
	}
	var flag = 0;
	for(var i=0;i<points.length;i++){
		if(id.value == points[i].id){
			alert("修改id为"+id.value+"的景点");
			flag=1;
		}
	}
	if(flag==0){
		alert("没有对应id的景点，请重新操作");
		return;
	}
	var send = {
		id:parseInt(id.value),
		name:name.value,
		positionX:parseInt(x.value),
		positionY:parseInt(y.value),
		level:parseFloat(level.value),
		small:small.options[small.selectedIndex].value,
		style:style.value,
		text:text.value,
	};
	
	Ajax({
		url: "http://localhost:8082/pointupdate",
		type: "post",
		data: send,
		async: true,
		success: function(text) {
			var messageBack = JSON.parse(text);
			alert(messageBack.msg);
			biao();
		},
		fail: function(err) {
			alert("通信错误");
		}
	})
})
//景点修改
//缺陷：保证同一条路，只有一个数据

document.getElementsByClassName('point_shanchu')[0].addEventListener('click',function(e){
	var id = document.getElementById('point_id');
	if(id.value == "" ){
		alert("请输入需要删除的id号");
		return ;
	}
	var flag = 0;
	for(var i=0;i<points.length;i++){
		if(id.value == points[i].id){
			alert("删除id为"+id.value+"的道路");
			flag=1;
		}
	}
	if(flag==0){
		alert("没有找到对应id的道路，请重新操作");
		return;
	}
	var send = {
		id:parseInt(id.value),
	};
	
	Ajax({
		url: "http://localhost:8082/pointdel",
		type: "post",
		data: send,
		async: true,
		success: function(text) {
			var messageBack = JSON.parse(text);
			alert(messageBack.msg);
			biao();
		},
		fail: function(err) {
			alert("通信错误");
		}
	})
})
//景点删除