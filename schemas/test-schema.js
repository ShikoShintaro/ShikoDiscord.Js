const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const userSchema = mongoose.Schema({

    _id: reqString,
    channelId: reqString,
    text: reqString
})

module.exports = mongoose.model('Test', userSchema)