const { EmbedBuilder } = require("discord.js");


const ME = EmbedBuilder


module.exports = {
    name: "anime",
    description: "Anime Commandooo",
    usage: ["s!anime"],

    run: async (client, message, args, ) => {
        const { search } = require('mal-scraper');
        await search.search('anime', {
            term: args[0]
        }).then(async (anim) => {
            const anime = anim[0];
            const embed = new ME();
            embed.setTitle(anime.title);
            embed.setUrl(anime.url);
            embed.setColor('#ffcbdb');
            embed.setDescription(anime.shortDescription);
            embed.setThumbnail(anime.thumbnail);
            message.channel.send({
                content: message.author.mention,
                embeds: [embed]
            })
        })
    }
}