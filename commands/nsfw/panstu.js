const { EmbedBuilder } = require('discord.js');
const hmtai = require('hmtai')
const neko = new hmtai()
module.exports = {
    name: "pantsu",
    description: "NSFW FOR ADULTS ONLY (You know what this is so dont be dumb)",
    usage : ["s!pantsu"],


    run: async (client, message, args) => {

        const err = new EmbedBuilder()
            .setTitle("Oh No~")
            .setDescription("This is not a nsfw channel sorry i cannot execute this command")
            .setColor("Red")
        if (!message.channel.nsfw)

            return message.reply({ embeds: [err] })

        const image = await neko.nsfw.pantsu()

        const embed = new EmbedBuilder()
            .setImage(image)
            .setColor("Random")
        await message.reply({ embeds: [embed] })

    }
}