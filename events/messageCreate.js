const client = require("../shiko-main");
const config = require("../config/shiko.json");
// const shikodb = require('../config/shiko.json').shikodb
const { Discord, MessageEmbed, Collection } = require("discord.js");
const prefix = config.prefix

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try{
        await command.run(client, message, args);
    } catch (err) {
        console.error(err);

        message.reply('An error occurred!');
    }
})

client.on("messageCreate", (message) => {
    if(message.content.startsWith("uwu")) {
        client.subevents.get("olok").run(client, message)
    }
    else if (message.content.startsWith("cute")) {
        client.subevents.get("kitty").run(client, message)
    } 
    else if (message.content.startsWith("Hi") && message.content.endsWith("Shiko")) {
        client.subevents.get("res").run(client, message)
    }
    else if (message.content.startsWith("Lesson") && message.content.endsWith("Learned")) {
        client.subevents.get("learned").run(client, message)
    }
    else if (message.content.startsWith("Lab u") && message.content.endsWith("Shiko")) {
        client.subevents.get("labyo").run(client, message)
    }
})