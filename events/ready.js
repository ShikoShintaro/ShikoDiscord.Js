const { ActivityType } = require("discord.js")
const client = require('../shiko-main')
client.on("ready", async () => {
    const options = [
        {
            type: ActivityType.Watching,
            text: "Movies with Aira",
            status: "online",
        },
        {
            type: ActivityType.Playing,
            text: "With Aira~",
            status: "online",
        },
        {
            type: ActivityType.Listening,
            text: "Aira",
            status: "online",
        },
        {
            type: ActivityType.Competing,
            text: "on Aira's Heart",
            status: "online",
        },
    ];

    setInterval(() => {
        const option = Math.floor(Math.random() * options.length)
        client.user.setPresence({
            activities: [
                {
                    name: options[option].text,
                    type: options[option].type,
                },
            ],
            status: options[option].status,
        })
    }, 10 * 1000);

    console.log(`"Ready Mastah", Logged in as ${client.user.tag}`);
})