const { Command } = require('discord.js-commando');

module.exports = class changebotprefixCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'changebotprefix',
			aliases: ['cbp'],
			group: 'moderation',
			memberName: 'changebotprefix',
			description: 'Change actual bot prefix.',
            args: [
                {
                    key: `newPrefix`,
                    prompt: `What will be a new prefix?`,
                    type: `string`
                }
            ]
		});
	}

    run(message, { newPrefix }){
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.reply("To execute this command you need administrator access!")
        }

        if(newPrefix.length < 1 || newPrefix.length > 3){
            return message.reply("Prefix must have length betwen 1 to 3 characters!")
        }

        var serverSettings = message.client.settings.get(message.guild.id);
        const oldPrefix = serverSettings.BotPrefix
        serverSettings.BotPrefix = newPrefix

        message.client.settings.set(message.guild.id, serverSettings)
        message.client.saveConfig(message.guild.id)

        return message.channel.send(`Changed prefix: ${oldPrefix} -> ${newPrefix}`)
    }
};