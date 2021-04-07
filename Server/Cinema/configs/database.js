const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/CinemaWS', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


