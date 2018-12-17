const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

//Listen for event
logger.on('messageLogged', (arg) => { //e eventArg
    console.log('Listener Called', arg);
});

logger.log('Fish');


const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello World');
        res.end();
    }
});


server.listen(3000);

console.log('Listening on Port 3000...');