const http = require('http');

let server = http.createServer((req, res) => {
  // end方法能够将数据返回给浏览器，浏览器会显示该字符串
  res.writeHead( 200, {'Content-Type': 'application/json; charset=utf-8'});
  // var obj = {a: '123456'}
  res.end(JSON.stringify(obj));
})

server.listen(8040, () => {
  console.log('Server is running...');
});