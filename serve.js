
// const requestListener = (req, res) => {
// 	res.writeHead(200, {"Content-Type":"text/plain"});
// 	res.write('hello world');
// 	res.end();
// }

const http = require('http');
const errorHandle = require('./errorHandle')
const { v4: uuidv4 } = require('uuid');
const { Console } = require('console');
const todos = []


function requestListener (req, res) {
	console.log(req.url);
	console.log(req.method);
	const headers = {
		'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
	  'Content-Type': 'application/json'
  }
	let body ="";
	req.on('data', chunk => {
		body += chunk
	})

	if(req.url == "/todos" && req.method === "GET") {
		res.writeHead(200, headers);
		res.write(JSON.stringify({
			"status": "success",
			"data": todos,
		}));
		res.end();
	} else if (req.url == "/todos" && req.method === "POST") {
		req.on('end', () =>{
			try {
				const title = JSON.parse(body).title; // 是否為JSON格式，如果有問題，則會進到catch
				if (title !== undefined) {
					const todo = {
						"id": uuidv4(),
						"title": title
					}
					todos.push(todo);
					res.writeHead(200, headers);
					res.write(JSON.stringify({
						"status": "success",
						"data": todos,
					}));
					res.end();
				} else {
					errorHandle(res)
				}
			} catch (err) {
				errorHandle(res)
			}
		})
	} else if (req.url == "/todos" && req.method === "DELETE") {
		todos.length = 0;
		res.writeHead(200, headers);
		res.write(JSON.stringify({
			"status": "success",
			"data": todos,
		}));
		res.end();
	} else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
		const id = req.url.split('/').pop(); // 取得網址上帶的id
		const deleteIdx = todos.findIndex(item => item.id === id); // 判斷ID是否存在todos內
		if(deleteIdx >= 0) {
			todos.splice(deleteIdx, 1);
			res.writeHead(200, headers);
			res.write(JSON.stringify({
				"status": "單筆刪除",
				"data": todos,
			}));
			res.end();
		} else {
			errorHandle(res, 'ID 不存在')
		}

	} else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
		req.on('end', () => {
			try{
				const todo = JSON.parse(body).title;
				const id = req.url.split('/').pop();
				const idx = todos.findIndex(item => item.id === id);
				if (todo !== undefined && idx !== -1) {
					todos[idx].title = todo;
					res.writeHead(200, headers);
					res.write(JSON.stringify({
						"status": "單筆修改",
						"data": todos,
					}));
					res.end();
				} else {
					errorHandle(res, 'ID 或 修改內容 不存在')
				}
			} catch (err) {
				errorHandle(res, 'ID 或 修改內容 不存在')
			}
		})
	} else if (req.method === "OPTIONS") {
		res.writeHead(200, headers);
		res.end();
	} else {
		res.writeHead(404, headers);
		res.write(JSON.stringify({
			"status": "false",
			"message": "not found",
		}));
		res.end();
	}
	
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005)