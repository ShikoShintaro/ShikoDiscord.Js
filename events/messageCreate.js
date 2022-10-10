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

// const client = require("../shiko-main");
// const config = require('../config/shiko.json')

// client.on("messageCreate", async (message) => {
//     try {
        
//         if (message.author.bot) return;

//         let prefix = config.prefix;

//         if (!message.content.startsWith(prefix)) return;

//         const args = message.content.slice(prefix.length).trim().split(/ +/g);
//         const command = args.shift().toLowerCase();

//         const cmd = client.commands.find(
//             (c) =>
//                 c.data.name === command ||
//                 (c.data.alias && c.data.alias.includes(command))
//         );

//         if (!cmd)
//             return await message.reply({
//                 content: `Command \`${command}\` does not exist`,
//             });

//         await message.channel.sendTyping();
//         await cmd.run(client, message, args);
//     } catch (err) {
//         console.log(err);
//         await message.reply({ content: err.message });
//     }
// },
// )