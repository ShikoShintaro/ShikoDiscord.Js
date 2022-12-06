const { EmbedBuilder } = require("discord.js")

const shi = require("../../config/mongo")

const fs = require("fs")

const nodesu = require("nodesu")

const us = require("../../schemas/user-schema")

const ME = EmbedBuilder

const dotenv = require('dotenv');
dotenv.config();

const api1 = process.env.osuapi

const config = require("../../config/shiko.json")

const api = new nodesu.Client(api1,
    {
        parseData: true,
    }
)




module.exports = {
    name: "user",
    description: "Checks user profile of course",
    usage: "s!user [user]",
    permissions: "NONE",

    run: async (client, message, shikodb, msgArray) => {
        const { member, channel, content, guild } = message

        const cache = {}

        let text = content

        let data = cache[member.id]

        if (!data) {
            const e1 = new ME()
                .setTitle(`Fetching Data Please Wait`)
                .setColor("Random")
                .setTimestamp()
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            console.log("Fecting From DataBase")
            const msg = await channel.send({ embeds: [e1] })

            await shi().then(async mongodb => {
                try {
                    const result = await us.findOne({ _id: member.id })

                    if (!result) {
                        const e2 = new ME()
                            .setTitle("Aweeee~")
                            .setColor("Red")
                            .setDescription("No user found set user using 's!setuser <username or userid>' ")
                            .setTimestamp()
                            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                        setTimeout(() => {
                            msg.edit({ embeds: [e2] })
                        }, 5000);
                        return

                    }

                    cache[member.id] = data = [result.text]

                } catch (err) {
                    console.log(err)
                    message.channel.send("Something bad happened sorry")
                }
            })

            api.user
                .get(data)
                .then(data => {
                    const file = require('./../../datas/user.json')


                    const dataJSON = JSON.stringify(data);
                    fs.writeFileSync(file, (dataJSON).toString());
                    const dataBuffer = fs.readFileSync('user.json');
                    const stringJSON = dataBuffer.toString();
                    const parseDATA = JSON.parse(stringJSON);


                    console.log(message.author.username + " has called user command for account " + parseDATA.username);
                    channel.send("testing")


                    const beatmapEmbed = new ME()
                        .setColor('RANDOM')
                        .setTitle(`User profile for ` + `${parseDATA.username}`)
                        .setURL('https://osu.ppy.sh/u/' + `${parseDATA.id}`)
                        .setThumbnail('http://s.ppy.sh/a/' + `${parseDATA.id}`)
                        .addFields(
                            { name: 'PP: ', value: `${parseDATA.ppRaw.toFixed(0)}`, inline: true },
                            { name: 'Accuracy : ', value: `${parseDATA.accuracy.toFixed(2)} % `, inline: true },
                            { name: 'Level ', value: `${parseDATA.level.toFixed(0)}`, inline: true },
                            { name: 'Rank', value: `${parseDATA.ppRank}`, inline: true },
                            { name: 'Country ', value: `${parseDATA.country}`, inline: true },
                            { name: 'Country Rank ', value: `${parseDATA.ppCountryRank}`, inline: true })
                        .setTimestamp()
                        .setFooter('Made by Xhera & Whiffy', footerImage)

                    message.channel.send({ embeds: [beatmapEmbed] });

                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}