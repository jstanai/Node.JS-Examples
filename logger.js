var url = 'http//mylogger.io/log';
const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        // Send an HTTP request
        this.emit('messageLogged', {id: 1});
        
    }    
}

module.exports = Logger;
