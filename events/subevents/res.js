const { EmbedBuilder } = require('discord.js')
const ME = EmbedBuilder

module.exports.run = (client, message, args) => {
    const Answer = [
        "Yes",
        "No",
        "Certainly",
        "Depends",
        "HELL NO",
        "I respectfully decline",
        "Probably",
        "Probably not",
        "Cant think of anything",
        "I disrespectfully decline",
        "I Dont know sorry",
        "Uhmmm.....No",
        "I certainly don't know the answer...sorry.."
    ]

    const randoms = Math.max(1, Math.floor(Math.random() * Answer.length))

    const embed = new ME()
        .addFields(
            {
                name: "Question : ",
                value: `${message.content}`
            }
        )
        .addFields(
            {
                name : "Answer : ",
                value : `${Answer[randoms]}`
            }
        )
        .setTimestamp()
        .setColor("Random")
        .setFooter({
            text: `Request by ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
          })

    return message.reply({ embeds : [embed] })
}

module.exports.config = {
    name: "res",
    description: "Answers your question randomly"
}