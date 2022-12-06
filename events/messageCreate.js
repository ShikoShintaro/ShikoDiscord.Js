const client = require("../shiko-main");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
// const shikodb = require('../config/shiko.json').shikodb
const { Discord, MessageEmbed, Collection } = require("discord.js");
const { config } = require("../config/shiko.json");
const prefix = process.env.PREFIX
const p = PermissionsBitField
const ME = EmbedBuilder;

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    if (!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find
            (cmd => cmd.aliases &&
                cmd.aliases.includes(commandName));

    if (!command) return;


    const perms = [
        p.Flags.AddReactions,
        p.Flags.Administrator,
        p.Flags.AttachFiles,
        p.Flags.BanMembers,
        p.Flags.ChangeNickname,
        p.Flags.Connect,
        p.Flags.CreateInstantInvite,
        p.Flags.CreatePrivateThreads,
        p.Flags.CreatePublicThreads,
        p.Flags.DeafenMembers,
        p.Flags.EmbedLinks,
        p.Flags.KickMembers,
        p.Flags.ManageChannels,
        p.Flags.ManageEmojisAndStickers,
        p.Flags.ManageEvents,
        p.Flags.ManageGuild,
        p.Flags.ManageMessages,
        p.Flags.ManageNicknames,
        p.Flags.ManageRoles,
        p.Flags.ManageThreads,
        p.Flags.ManageWebhooks,
        p.Flags.MentionEveryone,
        p.Flags.ModerateMembers,
        p.Flags.MoveMembers,
        p.Flags.MuteMembers,
        p.Flags.PrioritySpeaker,
        p.Flags.ReadMessageHistory,
        p.Flags.RequestToSpeak,
        p.Flags.SendMessages,
        p.Flags.SendMessagesInThreads,
        p.Flags.SendTTSMessages,
        p.Flags.Speak,
        p.Flags.Stream,
        p.Flags.UseApplicationCommands,
        p.Flags.UseEmbeddedActivities,
        p.Flags.UseExternalEmojis,
        p.Flags.UseExternalStickers,
        p.Flags.UseVAD,
        p.Flags.ViewAuditLog,
        p.Flags.ViewChannel,
        p.Flags.ViewGuildInsights,
    ]

    const ValidPerms = new PermissionsBitField(perms)

    if (command.permissions) {
        let invalidPerms = []
        for (const permission1 of command.permissions) {
            if (!ValidPerms.has(permission1)) {
                console.log(`Invalid Perms`)
            }

            const member = message.member

            if (!member.permissions.has(permission1)) {
                invalidPerms.push(permission1)
            }
        }

        if (invalidPerms.length) {
            const noPermsEmbed = new ME()
                .setColor('Random')
                .setTitle("Aww~~~ You dont have have permss~")
                .addFields(
                    {
                        name: 'Aweee~~~ you don\'t have permissions to run command:',
                        value: `\`${command.name}\``
                    }
                )
                .addFields(
                    {
                        name: 'Permission Required',
                        value: `\`${invalidPerms}\``
                    }
                )
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()

            return message.channel.send({ embeds: [noPermsEmbed] });
        }
    }


    try {
        await command.run(client, message, args);
    } catch (err) {
        console.error(err);
        const err3 = new ME()
            .setColor("Red")
            .setTitle("Aweeee~ ")
            .addFields(
                {
                    name: "Sorry There was and error using this command : ",
                    value: `\`${command.name}\``
                },
                {
                    name: "Please try it again later : ",
                    value: "`Might be an error in the code srry about that`"
                }
            )
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
        message.reply({ embeds : [err3] });
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
        else if (message.content.startsWith("Lab u") && message.content.endsWith("Shiko")) {
            client.subevents.get("labyo").run(client, message)
        }

    })
})
