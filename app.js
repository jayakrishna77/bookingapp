const http = require('http');
const url = require('url');
const EventEmitter = require('events');

const eventEmitter = new EventEmitter()

const hostname = '127.0.0.1';
const port = 8000;

//event emitters
eventEmitter.on('ping', function (data) {
    console.log('First event: ' + data);
});

eventEmitter.emit('ping', 'My first Node.js event has been triggered.');
eventEmitter.emit('ping', 'My first ');

let triggered = 0;
eventEmitter.once('event', () => {
  console.log(++triggered);
});
eventEmitter.emit('event');
// Prints: 1
eventEmitter.emit('event');
// Ignored


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