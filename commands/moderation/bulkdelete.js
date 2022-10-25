const { EmbedBuilder, DMChannel } = require("discord.js")
const config = require("../../config/shiko.json")
const ME = EmbedBuilder


module.exports = {
    name: "bulkdelete",
    description: "Deletes a specified amount of messages.",
    usage: "bulkdelete <amount>",
    detail: "`amount`: Amount of messages to delete. Must be in range of 2-100. [Integer]",
    permissions: ["ManageMessages"],
    aliases: ["bulk"],

    run: async (client, message, args, msgArray) => {
        if (message.channel instanceof DMChannel) {
            const dmerr = new ME()
                .setTitle('Sorry')
                .setDescription("❎ **| I'm sorry, this command is not available in DMs.**")
                .setColor(config.colors.no)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            return message.reply({ embeds: [dmerr] })
        }

        const todelete = parseInt(args[0]);

        if (!todelete) {
            const err1 = new ME()
                .setTitle('OI!')
                .setDescription("❎ **| Hey, I don't know the amount of messages to delete!**")
                .setColor(config.colors.no)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            return message.reply({ embeds: [err1] })
        }

        if (isNaN(todelete) || todelete < 2 || todelete > 100) {
            const err2 = new ME()
                .setTitle('Aweee~~')
                .setDescription("❎ **| I'm sorry, looks like the number of messages to delete is invalid. Must be in range of 2-1000!**")
                .setColor(config.colors.no)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            return message.reply({ embeds: [err2] })
        }

        message.delete().then(() => {
            message.channel.bulkDelete(todelete, true).then(() => {
                const sucess = new ME()
                    .setAuthor(
                        {
                            name: `${message.author.tag}`,
                            iconURL: `${message.author.avatarURL({ dynamic: true })}`
                        }
                    )
                    .setDescription("**Bulk delete executed**")
                    .setColor(config.colors.yes)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .addFields(
                        {
                            name: "Amount of messages: ",
                            value: `${todelete}`
                        }
                    )
                message.channel.send({ embeds: [sucess] }).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 10 * 1000);
                }).catch(console.error);
            })
        })
    }
}