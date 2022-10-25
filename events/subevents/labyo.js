module.exports.run = (client, message, args) => {
    if (message.author.bot) return;
    return message.channel.send(`Lab u too ${message.author}`)
}

module.exports.config = {
    name: "labyo",
    description: "olok ra"
}