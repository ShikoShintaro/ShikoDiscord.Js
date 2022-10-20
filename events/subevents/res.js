module.exports.run = (client, message) => {
    const Answer = [
        "Hi",
        "Hello",
    ]

    const randoms =  Math.max(1, Math.floor(Math.random() * Answer.length))

    message.reply(`${Answer[randoms]}, ${message.author}`)
}

module.exports.config = {
    name: "res",
    description: "Olok"
}