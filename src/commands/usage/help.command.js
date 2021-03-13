const { prefix } = require('../../config/config.js');
const { MessageEmbed } = require("discord.js")

const { Command } = require('discord.js-commando');

module.exports = class changebotprefixCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'usage',
			memberName: 'changebotprefix',
			description: 'Change actual bot prefix.',
            args: [
                {
                    key: `commandname`,
                    prompt: `What command you like to check?`,
                    type: `string`,
					default: ''
                }
            ]
		});
	}

    run(message, { commandname }){
	}
}
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		var prefixForServer = message.client.settings.get(message.guild.id).BotPrefix

		var data = new MessageEmbed();
		const { commands } = message.client;

		if (!args.length) {
			data.addFields({
				name: 'All commands: ',
				value: commands.map((command) => command.name),
			})
			data.setFooter(`\nYou can send \`${prefixForServer || prefix}help [command name]\` to get info on a specific command!`);

			return message.channel.send(data)
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.setTitle(`**Name:** ${command.name}`)

		if (command.aliases) data.addField(`**Aliases:**`, command.aliases.join(', '));
		if (command.description) data.addField(`**Description:**`, command.description);
		if (command.usage) data.addField(`**Usage:**`, `${prefixForServer || prefix}${command.name} ${command.usage}`);

		data.addField(`**Cooldown:**`, `${command.cooldown || 3} second(s)`);

		message.channel.send(data);
	},
};