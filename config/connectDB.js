const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

function connectDB(url) {
    mongoose.connect(url)
    .then((conn) => console.log(`Connected to mongodb database host: ${conn.connection.host}`.cyan.underline))
    .catch(err => {
        console.log(`MongoDB connection error: ${err.message}`.red)
        process.exit(1);
    })
}

module.exports = connectDB