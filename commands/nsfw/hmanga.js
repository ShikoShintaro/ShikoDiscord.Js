const { EmbedBuilder } = require('discord.js');
const hmtai = require('hmtai')
const neko = new hmtai()
module.exports = {
    name: "hmanga",
    description: "NSFW FOR ADULTS ONLY (MANGA DOUJIN VERSION)",
    usage : ["s!hmanga"],


    run: async (client, message, args) => {

        const err = new EmbedBuilder()
            .setTitle("Oh No~")
            .setDescription("This is not a nsfw channel sorry i cannot execute this command")
            .setColor("Red")
        if (!message.channel.nsfw)

            return message.reply({ embeds: [err] })

        const image = await neko.nsfw.manga()

        const embed = new EmbedBuilder()
            .setImage(image)
            .setColor("Random")
        await message.reply({ embeds: [embed] })

    }
}