const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config/shiko.json").prefix;

module.exports = {
  name: "help",
  aliases: ['h'],
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {




    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "*Awww~~ This Command is on Progress.*";

          let name = file.name.replace(".js", " ");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "`In progress`." : cmds.join(" "),
        };

        categories.push(data);
      });

      //DEPRECATED LINE

      // const embed = new MessageEmbed()
      //   .setAuthor("Haro you need help?? Here are all of my commands:", 'https://i.imgur.com/uxcvoiI.gif')
      //   .addFields(categories)
      //   .setDescription(
      //     `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`
      //   )
      //   .setFooter(
      //     `Requested by ${message.author.tag}`,
      //     message.author.displayAvatarURL({ dynamic: true })
      //   )
      //   .setTimestamp()
      //   .setColor(roleColor);


      const embed1 = new EmbedBuilder()
        .setAuthor({ name: "Haro you need help?? These are my commands", iconURL: "https://i.imgur.com/uxcvoiI.gif" })
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`
        )
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()

      await message.reply({ embeds: [embed1] })

      setTimeout(() => {
        message.delete(5000)
      }, 5000);

    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed2 = new EmbedBuilder()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.reply({ embeds: [embed2] })
      }

      const embed3 = new EmbedBuilder()
        .setAuthor({ name: "Command Details:", iconURL: "https://i.imgur.com/uxcvoiI.gif" })
        .addFields({ name: "PREFIX:", value: `\`${prefix}\`` })
        .addFields(
          {
            name: "COMMAND",
            value: command.name
              ? `\`${command.name}\``
              : "No name for this command"
          }
        )
        .addFields(
          {
            name: "ALIASES",
            value: command.aliases
              ? `\`${command.aliases.join("` `")}\``
              : "No Aliases for this command"
          }
        )
        .addFields(
          {
            name: "USAGE",
            value: command.usage
              ? `\`${prefix}${command.name} ${command.usage}\``
              : `\`${prefix}${command.name}\``

          }
        )
        .addFields(
          {
            name: "DESCRIPTION",
            value: command.description
              ? command.description
              : "No description for this command"
          }
        )
        // .addField(
        //   "COMMAND:",
        //   command.name ? `\`${command.name}\`` : "No name for this command."
        // )
        // .addField(
        //   "ALIASES:",
        //   command.aliases
        //     ? `\`${command.aliases.join("` `")}\``
        //     : "No aliases for this command."
        // )
        // .addField(
        //   "USAGE:",
        //   command.usage
        //     ? `\`${prefix}${command.name} ${command.usage}\``
        //     : `\`${prefix}${command.name}\``
        // )
        // .addField(
        //   "DESCRIPTION:",
        //   command.description
        //     ? command.description
        //     : "No description for this command."
        // )
        .setFooter({
          text: `Requested by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true })
        })
        .setTimestamp()
        
      await message.reply({ embeds: [embed3] })

    }
  },
};