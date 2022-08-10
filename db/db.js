const mongoose = require('mongoose');

const connectToDb = (url, cb) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log(`connection successful`);
        cb();
    })
}

module.exports = connectToDb;

