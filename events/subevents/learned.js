module.exports.run = (client, message) => {
    const lmao = [
        "https://cdn.discordapp.com/attachments/1023213578620244010/1032681163430563870/unknown.png",
        "https://cdn.discordapp.com/attachments/1023213578620244010/1032681163430563870/unknown.png",
    ]

    const rndmindx = Math.max(1, Math.floor(Math.random() * lmao.length))

    return message.reply(`${lmao[rndmindx]}`)
}

module.exports.config = {
    name: "learned",
    description: "Olok"
}