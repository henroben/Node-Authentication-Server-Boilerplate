// Main starting point of the application

const express = require('express'); // parse response and routing
const http = require('http'); // handle http requests
const bodyParser = require('body-parser'); // parse incoming http requests into json
const morgan = require('morgan'); // logging framework for debugging
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup

// Setup middleware
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on:', port);