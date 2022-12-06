const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'ping',
    permissions: [],
    run: async (client, message, args) => {
        const embed1 = new EmbedBuilder()
        
            .setTitle("Fetching")
            .setDescription(`Please Wait`)
            .setColor("Random")
            .setTimestamp()
        
        const msg = await message.channel.send({ embeds : [embed1] })
        
        const embed = new EmbedBuilder()
        
            .setTitle("Pong~")
            .setDescription(`${client.ws.ping} ms`)
            .setColor("Random")
            .setTimestamp()
        await
            setTimeout(() => {
                msg.edit({ embeds: [embed] });
            }, 5000);
        
    }
}