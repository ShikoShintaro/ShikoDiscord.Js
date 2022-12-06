const { EmbedBuilder } = require('discord.js');
const neko = require('akaneko')

module.exports = {
    name: "neko",
    description: "NSFW FOR KIDS ONLY",


    run: async (client, message, args) => {
        const image = await neko.nsfw.yuri()

        const embed = new EmbedBuilder()
            .setImage(image)
            .setColor("Random")
        await message.reply({ embeds : [embed] })
    }
}