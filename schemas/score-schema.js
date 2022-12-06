const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const scoresSchema = mongoose.Schema({
    
    channelId: reqString,
    beatmapIDScore: reqString
})

module.exports = mongoose.model('Scores', scoresSchema)