const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'ping',

    run: async (client, message, args) => {
        const embed = new EmbedBuilder()

            .setTitle("Pong~")
            .setDescription(`${client.ws.ping} ms`)
            .setColor("Random")
            .setTimestamp()
        await
            message.reply({ embeds: [embed] });
        setTimeout(() => {
            message.delete(5000)
        }, 5000);
    }
}