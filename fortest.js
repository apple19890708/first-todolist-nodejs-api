// var content = require('./data')
// // node.js 不支援ES6

// console.log(content);
// console.log(content.bark());
//------------------------------------------------------------------

// const { c, fn, fn2 } = data;

// console.log('i am in filter!!')
// fn2()

//在windows global上

// var a = 1;

//在node.js global上

// global.a = 1; // 這樣才會有繼承到 global 上，如果只寫 var 會導致只在單一js檔內有效執行

//------------------------------------------------------------------

//建立一個web server

// var http = require('http');
// http.createServer(function(req, res) {
// 	res.writeHead(200, {"Content-Type": "text/plan"});
// 	res.write('hello~~~');
// 	res.end();
// }).listen(8080);
// console.log('running server!');

//------------------------------------------------------------------

// npm install 建立package.json 並 npm install express --save
// var express = require('express');
// console.log(express)

// 建立UUID
const { v4: uuidv4 } = require('uuid');
console.log(uuidv4());

const obj = {
	'title': 'brush teeth',
	'id': uuidv4()
}
console.log(obj);