const EventEmmiter = require('events');
const emmiter = new EventEmmiter();

emmiter.on('LogMessage', (arg) => {
    console.log('Message logged: ', arg.msg || 'Novo evento');
});

const log = (msg) => {
    emmiter.emit('LogMessage', {msg: msg});
}

module.exports = log;