const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./configs/database');

const app = express();
app.use(cors());

const userContoller = require('./controllers/userController');
const subscriptionController = require('./controllers/subscriptionsWsContoroller')
const membersContoller=require('./controllers/membersWsController')
const moviesContoller=require('./controllers/movieWsController')
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

app.use('/api/users', userContoller);
app.use('/api/subscriptions',subscriptionController);
app.use('/api/members',membersContoller);
app.use('/api/movies',moviesContoller);
app.listen(8080);
console.log("Sever is up!");



