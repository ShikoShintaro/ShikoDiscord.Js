const { EmbedBuilder } = require("discord.js");
const client = require('../../shiko-main');
const currentDate = new Date();
const config = require('../../config/shiko.json')
const ME = EmbedBuilder

module.exports = {
    name: "ban",
    description: "Bans a member on the server",
    usage: "s!ban [member] [reason]",
    permissions: ['BanMembers'],

    run: async (client, message, args, msgArray) => {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!args[0]) {
            const embed1 = new ME()
                .setTitle('No Member Mentioned')
                .addFields({
                    name: 'Pls Specify a user',
                    value: 'Just mention bwuh'
                })
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

            return message.reply({ embeds: [embed1] })
        }

        if (!mentionedMember) {
            const embed2 = new ME()
                .setTitle('I cannot ban the mentioned user')
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
                    name: 'You cannot ban yourself BAKA!!',
                    value: 'Just dont please'
                })
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

            return message.reply({ embeds: [embed3] })
        }

        if (!mentionedMember.bannable) {
            const banerr = new ME()
                .setTitle('Aweee Error')
                .setDescription('Awee~ This mentioned user is higher role than mine~')
                .setColor(config.colors.no)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setTimestamp(currentDate.toLocaleString())

            return message.reply({ embeds: [banerr] })
        }
        let reason = args.slice(1).join(" ")
        if (!reason) {
            reason = "No reason sorry...";
        }

        const banembed = new ME()
            .setTitle("You Have Been Banned")
            .addFields(
                {
                    name: "You were banned from: ",
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
                    name: "Time banned",
                    value: `${currentDate.toLocaleString()}`
                }
            )
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setColor("Random")

        await mentionedMember.send({ embeds: [banembed] })

        const alert = new ME()
            .setTitle("Awee A Member Was Banned")
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
                    name: "Time banned",
                    value: `${currentDate.toLocaleString()}`
                }
            )
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setColor("Random")
        
        await mentionedMember.ban({
            reason: reason
        }).then(() => message.reply({ embeds : [alert] }))

        
    }

}