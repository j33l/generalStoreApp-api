/**
 * This script is used to connect to mongodb database server via mongoose interface
 */

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // To make sure that when mongoose works with mongodb, index are created; allowing us to easily access data
    useFindAndModify: false // (node:6912) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
})
