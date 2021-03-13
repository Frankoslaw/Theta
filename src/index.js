//https://discord.com/api/oauth2/authorize?client_id=790290978342305812&permissions=8&scope=bot
const { token } = require('./config/config.js');

const Discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const eventHandler = require("./handlers/Event.handler.js")


const client = new CommandoClient({
	commandPrefix: '~',
	owner: '622801236340768775',
	invite: 'https://discord.com/api/oauth2/authorize?client_id=790290978342305812&permissions=8&scope=bot'
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['moderation', 'Tahat group include commands to manage server'],
		['technical', 'That grop is only for BOT owner!'],
		['usage', 'Coammands for everyone!'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
        help: true,
    })
	.registerCommandsIn(path.join(__dirname, 'commands'));


eventHandler(client)


client.once('ready', () => {
	eventHandler(this)
    settingsHandler(this);

	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('with Commando');
});

client.login(token);