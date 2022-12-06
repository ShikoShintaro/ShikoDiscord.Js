const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const userSchema = mongoose.Schema({

    _id: Number,
    channelId: Number,
    memId: reqString,
    text: reqString
})

module.exports = mongoose.model('Users', userSchema)