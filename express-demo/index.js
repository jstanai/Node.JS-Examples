const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');


const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // put views here

app.use(express.json());
app.use(express.urlencoded({extended: true})); //key=value&key=value
app.use(express.static('public')); //css etc, 
app.use(helmet());
app.use('/api/courses/', courses);
app.use('/', home);

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled');
}   

dbDebugger('conneted to db');

//configuration
console.log('Application Name: ' + config.get('name'))
console.log('Maile SErver Name: ' + config.get('mail.host'))

app.use(logger);

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on ${port}...`)});