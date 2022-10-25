const { EmbedBuilder } = require("discord.js");
const client = require('../../shiko-main');
const currentDate = new Date();
const config = require('../../config/shiko.json')
const ME = EmbedBuilder

module.exports = {
    name: "kick",
    description: "Kicks a member on the server",
    usage: "s!kick [member] [reason]",
    permissions: ['KickMembers'],

    run: async (client, message, args, msgArray) => {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!args[0]) {
            const embed1 = new ME()
                .setTitle('No Member Mentioned')
                .addFields({
                    name: 'Pls Specify a user',
                    value: 'Just mention a user'
                })
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

            return message.reply({ embeds: [embed1] })
        }

        if (!mentionedMember) {
            const embed2 = new ME()
                .setTitle('I cannot kick the mentioned user')
                .addFields(
                    {
                        name: 'Awee~ This mentioned user is higher role than mine or this user is my Fate~',
                        value: ```\`Role Is higher than mine``\``
                    }
                )
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

            return message.reply({ embeds: [embed2] })
        }

        if (mentionedMember.id === message.author.id) {
            const embed3 = new ME()
                .addFields({
                    name: 'You cannot kick yourself BAKA!!',
                    value: 'Just dont please'
                })
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

            return message.reply({ embeds: [embed3] })
        }

        if (!mentionedMember.kickable) {
            const kickerr = new ME()
                .setTitle('Aweee Error')
                .setDescription('Awee~ This mentioned user is higher role than mine~')
                .setColor(config.colors.no)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setTimestamp(currentDate.toLocaleString())

            return message.reply({ embeds: [kickerr] })
        }
        let reason = args.slice(1).join(" ")
        if (reason === undefined) reason = "No Reason Given Sorry..."

        const kicked = new ME()
            .setTitle("You Have Been Kicked")
            .addFields(
                {
                    name: "You were kicked from",
                    value: `${message.guild.name}`
                }
            )
            .addFields(
                {
                    name: "For reason",
                    value: `${reason}`
                }
            )
            .addFields(
                {
                    name: "Time kicked",
                    value: `${currentDate.toLocaleString()}`
                }
            )
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setColor("Random")

        await mentionedMember.send({ embeds: [kicked] })

        try {
            await mentionedMember.kick(reason)
        } catch (err) {
            return message.reply('there was an error sorry')
        }

        const alert = new ME()
            .setTitle("Awee A Member Was Kicked")
            .addFields(
                {
                    name: "Member",
                    value: `${mentionedMember}`
                }
            )
            .addFields(
                {
                    name: "For reason",
                    value: `${reason}`
                }
            )
            .addFields(
                {
                    name: "Time kicked",
                    value: `${currentDate.toLocaleString()}`
                }
            )
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setColor("Random")
        
        await message.reply({ embeds : [alert] })
    }

}