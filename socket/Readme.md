# Socket小游戏

## 一、简介

​	本程序，利用WebSocket通信，来进行数据的双向传输。实现联网对战，O#棋子的游戏。考虑到本项目主要为了练习socket通信，在登录及安全方面没有做太多限制，数据库使用两套系统联系数据库业务，最后项目使用MongoDB作为资源信息的存储。

## 二、后端数据存储

### 1.mysql

数据库名称：socketgame

表名：socket

| 字段     | 说明             | 备注             |
| :------- | :--------------- | :--------------- |
| id       | 数据表主键       | 自增             |
| name     | 用户名           | 最大长度15       |
| password | 用户密码         |MD5加密       |
| level    | 用户等级         | 动态调整         |
| lasttime | 最后一次游戏时间 | 首次登陆需要赋值 |

### 2.mongoDB

数据库名称：socket

集合名：user

```json
{ 
    "_id" : ObjectId("5cd43faeaea1eab818cdc1a0"), 
    "name" : "123", 
    "password" : "4297f44b13955235245b2497399d7a93", 
    "lv" : NumberInt(1), 
    "time" : ISODate("2019-05-09T14:56:46.799+0000")
}
```

## 三、线上部署

http应用端口号：351

socket端口号：567

## 四、接口

### 1.链接游戏服务器

- 方法：socket
- 参数：{type:“login”,data:{"name":"123","pass":"123213"}}
- 返回

```json
{
    "type":"login",
    data:{
		"msg": "成功！",
        "style": 0/1
    }
}
```



### 2.提交一条用户评论信息

