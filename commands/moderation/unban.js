const { EmbedBuilder } = require("discord.js");
const client = require('../../shiko-main');
const currentDate = new Date();
const config = require('../../config/shiko.json')
const ME = EmbedBuilder

module.exports = {
    name: "unban",
    description: "UnBans a member on the server",
    usage: "s!unban [id]",
    permissions: ['BanMembers'],

    run: async (client, message, args, msgArray) => {
        let reason = args.slice(1).join(" ");
        let userId = args[0]

        if (!reason) reason = 'No Reason';
        if (!userId) {
            const embed1 = new ME()
                .setTitle('Aweeee')
                .addFields({
                    name: 'Please provide a ID for me to Unban',
                    value: 'U gonna unban no one?'
                })
                .setTimestamp()
                .setColor(config.colors.no)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

            return message.reply({ embeds: [embed1] })
        }

        if (isNaN(userId)) {
            const embed2 = new ME()
                .setTitle('Aweeee')
                .addFields({
                    name: 'Please provide a ID That is Numbers',
                    value: 'U gonna unban no one?'
                })
                .setTimestamp()
                .setColor(config.colors.no)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

            return message.reply({ embeds: [embed2] })
        }

        const bans1 = message.guild.bans

        bans1.fetch().then(async bans => {
            if (bans.size === 0) {
                const banerr = new ME()
                    .setTitle('Aweeee')
                    .addFields({
                        name: 'No one is Banned in this server',
                        value: 'No one really'
                    })
                    .setTimestamp()
                    .setColor(config.colors.no)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                return message.reply({ embeds: [banerr] })
            }

            let BannedUser = bans.find(ban => ban.user.id = userId)

            if (!BannedUser) {
                const banerr1 = new ME()
                    .setTitle('Aweeee')
                    .addFields({
                        name: 'This user isn\'t banned',
                        value: 'What are you gonna ban him?'
                    })
                    .setTimestamp()
                    .setColor(config.colors.no)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                return message.reply({ embeds: [banerr1] })
            }

            await message.guild.members.unban(BannedUser.user, reason).catch(err => {
                const banerr2 = new ME()
                    .setTitle('Aweeee')
                    .addFields({
                        name: 'Something went wrong sorryy~~',
                        value: 'There was something bugging in me'
                    })
                    .setTimestamp()
                    .setColor(config.colors.no)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                return message.reply({ embeds: [banerr2] })
            }).then(() => {
                const success = new ME()
                    .setTitle('Yay~')
                    .addFields({
                        name: 'The Member Has Unbanned ID: ',
                        value: `${userId}`
                    })
                    .setTimestamp()
                    .setColor(config.colors.yes)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                return message.reply({ embeds: [success] })
            })
        })
    }
}