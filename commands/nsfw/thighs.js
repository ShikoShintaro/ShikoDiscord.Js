const { EmbedBuilder } = require('discord.js');
const neko = require('akaneko')

module.exports = {
    name: "thighs",
    description: "NSFW FOR KIDS ONLY",
    usage : ["s!thighs"],


    run: async (client, message, args) => {

        const err = new EmbedBuilder()
            .setTitle("Oh No~")
            .setDescription("This is not a nsfw channel sorry i cannot execute this command")
            .setColor("Red")
        if (!message.channel.nsfw)

            return message.reply({ embeds: [err] })

        const image = await neko.nsfw.thighs()

        const embed = new EmbedBuilder()
            .setImage(image)
            .setColor("Random")
        await message.reply({ embeds: [embed] })

    }
}