const { EmbedBuilder } = require("discord.js");
const me = EmbedBuilder
const osu1 = require("nodesu");
const osu = new osu1.Client(process.env.osuapi, { parseData: true })

module.exports = {
    name: 'osu',
    aliases: ['std'],
    description: 'check user info of osu!std.',

    run: async (client, message) => {
        
    }
}