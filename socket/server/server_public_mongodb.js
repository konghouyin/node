var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://server1:hashmap1973@localhost";
var dbName = 'socket' //数据库名称
var DB; //数据库连接实体


MongoClient.connect(url, {
	useNewUrlParser: true
}, function(err, db) {
	if (err) throw err;
	console.log("数据库已连接!" + new Date());
	DB = db.db(dbName);
});


module.exports={
	insert:insert,
	find:find
}

function insert(obj,out){
	DB.collection("user").insertOne(obj, function(err, res) {
        out(err);
    });
}

function find(obj,need,out){
	DB.collection("user").find(obj,need).toArray(function(err,result){
		out(err,result);
	})
}
