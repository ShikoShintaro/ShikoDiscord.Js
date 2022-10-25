const client = require("../shiko-main");

// const shikodb = require('../config/shiko.json').shikodb
const { Discord, MessageEmbed, Collection } = require("discord.js");
const prefix = process.env.PREFIX


client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find
            (cmd => cmd.aliases &&
                cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        await command.run(client, message, args);
    } catch (err) {
        console.error(err);

        message.reply('An error occurred!');
    }

    const msgArray = message.content.split(/\s+/g);
    const args1 = msgArray.slice(1);





    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
        if (message.content.startsWith("uwu")) {
            client.subevents.get("olok").run(client, message, msgArray, args1)
        }
        else if (message.content.startsWith("cute")) {
            client.subevents.get("kitty").run(client, message)
        }
        else if (message.content.startsWith("Shiko, ") && message.content.endsWith("?")) {
            client.subevents.get("res").run(client, message, msgArray, args)
        }
        else if (message.content.startsWith("Lesson") && message.content.endsWith("Learned")) {
            client.subevents.get("learned").run(client, message)
        }
        else if (message.content.startsWith("Lab u") && message.content.endsWith("Shiko")) {
            client.subevents.get("labyo").run(client, message)
        }

    })
})
