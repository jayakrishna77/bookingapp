const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res, next)=>{
const q = url.parse(req.url, true);
console.log(q.search)
console.log(q.query)
res.statusCode = 200;
res.setHeader('Content-Type', 'text/pain');
res.end('Hello World\n');
});

server.listen(port, hostname, ()=>{
    console.log(`Server is running at http://${hostname}:${port}`)
});