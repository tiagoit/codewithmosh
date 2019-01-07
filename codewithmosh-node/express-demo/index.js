const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
// export DEBUG=app:startup
// export DEBUG=app:startup,app:db
// export DEBUG=app:*
// export DEBUG=
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const auth = require('./auth');
const express = require('express');
const app = express();

const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(helmet());
app.use(express.json());
app.use(logger);
app.use(auth);
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
startupDebugger('Application name: ' + config.get('name'));
startupDebugger('Mail server: ' + config.get('mail.host'));
// startupDebugger('Mail server: ' + config.get('mail.password'));

// export NODE_ENV=production
startupDebugger(`NODE_ENV: ${process.env.NODE_ENV}`);
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
