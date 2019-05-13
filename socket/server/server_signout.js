module.exports = {
	signout: signout
}

function signout(ws){
	global.onlineList.delete(ws.onLineName);
	ws.send(JSON.stringify({
		type:"signout"
	}))
}