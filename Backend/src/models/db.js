const mongoose = require('mongoose')

mongoose.connect(
    'mongodb://localhost:27017/CryptoDB',
    {
    useNewUrlParser: true
    },
    (err) => {
        if (!err) {
            console.log('Connection to database succeeded')
        } else {
            console.log('Error in connection ' + err)
        }
    }
);

require('./models');