const { EmbedBuilder } = require ('discord.js')

module.exports = {
    name: 'say',


    run : async (client, message, args) => {
        const msg = args.join(" ")
        

        message.channel.send(msg);

        message.delete();
     
    }
}