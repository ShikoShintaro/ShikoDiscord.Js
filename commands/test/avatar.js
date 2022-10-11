const { EmbedBuilder } = require("discord.js");
const client = require('../../shiko-main');

module.exports = {
    name: 'avatar',
    aliases: ['ava', 'a'],
    description: 'Display someone\'s avatar',

    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author || client.users.cache.get(u => u.id === args[0])

        const avatar = user.displayAvatarURL({ size: 4096, dynamic: true })


        let embed = new EmbedBuilder()
            .setTitle(`${user.username}\'s Avatar`)
            .setImage(avatar)
            .setColor("Random")
            .setTimestamp()
            .setFooter({ text : client.user.username, iconURL : client.user.displayAvatarURL() })
        await message.channel.send({ embeds : [embed] })

        setTimeout(() => {
            message.delete(5000)
          }, 5000)
    }
}