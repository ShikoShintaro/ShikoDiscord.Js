const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'ping',

    run: async (client, message) => {
        const embed = new EmbedBuilder()
        
            .setTitle("Pong~")
            .setDescription(`${client.ws.ping} ms`)
            .setColor("#007fff")
            .setTimestamp()
        await
            message.reply({ embeds: [embed] });
        
    }
}