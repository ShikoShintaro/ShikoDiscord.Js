module.exports.run = (client, message, args) => {
    return message.channel.send(`Lab u too ${message.author}`)
}

module.exports.config = {
    name: "labyo",
    description: "olok ra"
}