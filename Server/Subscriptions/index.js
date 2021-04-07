async function doall(){
    await update.updatemembers()
    await update.updatemovies();
    await update.updatesubscriptions();
}
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
require('./configs/database');


const memberController = require('./controllers/memberController');
const movieController = require('./controllers/movieController')
const subscriptionContoller =require('./controllers/subscriptionController')

let app = express();
let update=require('./updateData');


app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

doall();
app.use(cors());

app.use('/api/movies',movieController)
app.use('/api/members', memberController);
app.use('/api/subscriptions' ,subscriptionContoller);

app.listen(8000,()=>{
    console.log("We are ruuning on 8000");
});


